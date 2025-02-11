import { getLogger } from '@ouestware/node-logger';
import { toNumber, toString } from '@ouestware/type-utils';
import { parse } from 'csv-parse';
import { isNil } from 'lodash';
import hash from 'object-hash';
import { inject, singleton } from 'tsyringe';

import config from '../config';
import { checkNilOREmptyString } from '../utils/string';
import { FileSystem } from './filesystem';
import { Neo4j } from './neo4j';

// This interface MUST be compatible with the "Message" defined in code/server/src/graphql/schema.ts
interface DataMessage {
  fingerprint: string;
  date: Date;
  filePath: String;
  pageNumber: number;
  raw_year: number;
  raw_company: String;
  raw_company_spare: String;
  raw_address?: String;
  raw_address_spare?: String;
  raw_people?: String[];
  raw_people_abbr?: String[];
  raw_countries?: String[];
  raw_message: String;
}

@singleton()
export class Dataprep {
  /**
   * Logger.
   */
  log = getLogger('DataSetImport');

  /**
   * Default constructor.
   */
  constructor(
    @inject(Neo4j) public neo4j: Neo4j,
    @inject(FileSystem) public fs: FileSystem,
  ) {}

  /**
   *
   */
  async doImport() {
    const files = await this.fs.listFiles(
      config.server.import.path,
      config.server.import.file_glob_pattern,
    );
    this.log.info(`Found ${files.length} files to import`);

    const result = { count: 0, errors: [] as string[] };
    for (const file of files) {
      try {
        this.log.info(`Importing file ${file}`);
        const fileResult = await this.importFile(file);
        this.log.info(`Imported ${fileResult} records from file: ${file}`);
        result.count += fileResult.count;
        result.errors.push(...fileResult.errors);
      } catch (e) {
        throw new Error(`Error importing file ${file}: ${(e as Error).message}`);
      }
    }
    return result;
  }

  /**
   * Do the import for one file.
   */
  private async importFile(file: string) {
    let records: DataMessage[] = [];
    let count = 0;
    let errors: string[] = [];

    const stream = this.fs.streamFile(file).pipe(
      parse({
        delimiter: config.server.import.column_seperator,
        columns: config.server.import.headers,
        encoding: 'latin1',
        quote: null,
        relax_column_count: true,
      }),
    );

    for await (const record of stream) {
      count++;
      try {
        records.push(this.parseRecord(record));
      } catch (e) {
        errors.push(`Error parsing record n°${count} in file ${file}: ${(e as Error).message}`);
      }
      if (records.length > config.server.import.batchSize) {
        await this.importRecords(records);
        records = [];
      }
    }
    if (records.length > 0) await this.importRecords(records);
    return { count, errors };
  }

  /**
   * Import a list in records in databases.
   */
  private async importRecords(records: DataMessage[]) {
    // Import into Neo4j
    await this.neo4j.getFirstResultQuery(
      `UNWIND $records as record
        MERGE (c:Company { name: record.raw_company_spare })
        MERGE (m:Message { fingerprint: record.fingerprint })
        SET
          m.date = date(record.date),
          m.filePath = record.filePath,
          m.pageNumber = toInteger(record.pageNumber),
          m.raw_year = toInteger(record.raw_year),
          m.raw_company = record.raw_company,
          m.raw_company_spare = record.raw_company_spare,
          m.raw_address = record.raw_address,
          m.raw_address_spare = record.raw_address_spare,
          m.raw_people = record.raw_people,
          m.raw_people_abbr = record.raw_people_abbr,
          m.raw_countries = record.raw_countries,
          m.raw_message = record.raw_message

        MERGE (m)-[:CONTAINS]->(c)
        
        FOREACH (p IN [x IN [record.raw_address_spare] WHERE x <> null] | MERGE (a:Address { name: record.raw_address_spare }) MERGE (m)-[:CONTAINS]->(a))
        FOREACH (p IN coalesce(record.raw_people, []) | MERGE (person:Person { name: p }) MERGE (m)-[:CONTAINS]->(person))
        FOREACH (country IN coalesce(record.raw_countries, []) | MERGE (c:Country { name: country }) MERGE (m)-[:CONTAINS]->(c))
      `,

      { records: records.map((r) => ({ ...r, date: r.date.toISOString().substring(0, 10) })) },
    );
  }

  /**
   * Parse the message content of a record, and  extract some additionnal data.
   */
  private parseRecordMessage(message: string): {
    filePath: string;
    pageNumber: number;
    date: Date;
  } {
    const group = message.match(
      /.*File name: \\\\atlas\.uni\.lux\\C2DH_L\s?E\s?T\s?T\s?E\s?R\s?B\s?O\s?X\\memorialc\\_memorialc-last\\(.*)\\([0-9]{4})-([0-9]{2})-([0-9]{2})(.*)\.pdf Page Number :([0-9]*).*$/,
    );
    if (!group) throw new Error(`Could not parse message to find additional data`);

    const filePath = `/${group[1].replaceAll('\\', '/')}/${group[2]}-${group[3]}-${group[4]}${group[5]}.pdf`;
    return {
      filePath,
      pageNumber: toNumber(group[6]) || 1,
      date: new Date(`${group[2]}-${group[3]}-${group[4]}`),
    };
  }

  /**
   * From a CSV record (as an object), parse it and transform it into a DataMessage.
   */
  private parseRecord(record: { [key: string]: unknown }): DataMessage {
    const fingerprint = hash(JSON.stringify(record, null, 2));

    const data = {
      fingerprint,
      raw_year: checkNilOREmptyString(record.year) ? undefined : toNumber(record.year),
      raw_company: this.cleanRecordValue(record.company),
      raw_company_spare: this.cleanRecordValue(record.company_spare),
      raw_address: this.cleanRecordValue(record.address, false),
      raw_address_spare: this.cleanRecordValue(record.address_spare),
      raw_people: this.cleanRecordValue(record.people, true),
      raw_people_abbr: this.cleanRecordValue(record.people_abbr, true),
      raw_countries: this.cleanRecordValue(record.countries, true),
      raw_message: this.cleanRecordValue(record.message),
    };

    if (isNil(data.raw_message))
      throw new Error(`Can't parse 'message' column, reading "${record.message}"`);
    if (isNil(data.raw_year))
      throw new Error(`Can't parse 'year' column, reading "${record.year}"`);
    if (isNil(data.raw_company))
      throw new Error(`Can't parse 'company' column, reading "${record.company}`);
    if (isNil(data.raw_company_spare)) data.raw_company_spare = data.raw_company;

    const addtionalData = this.parseRecordMessage(data.raw_message as string);

    return {
      ...data,
      ...addtionalData,
    } as DataMessage;
  }

  private cleanRecordValue(value: unknown): string | undefined;
  private cleanRecordValue(value: unknown, multiple: false): string | undefined;
  private cleanRecordValue(value: unknown, multiple: true): string[] | undefined;
  private cleanRecordValue(
    value: unknown,
    multiple: boolean = false,
  ): string | string[] | undefined {
    if (checkNilOREmptyString(value)) return undefined;
    if (multiple) return `${value}`.split(config.server.import.value_separator);
    return toString(value);
  }
}
