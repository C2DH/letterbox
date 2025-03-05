import { getLogger } from '@ouestware/node-logger';
import { toNumber, toString } from '@ouestware/type-utils';
import { parse } from 'csv-parse';
import { isNil } from 'lodash';
import hash from 'object-hash';
import { basename } from 'path';
import { inject, singleton } from 'tsyringe';

import config from '../../config';
import { ImportReport } from '../../types';
import { checkNilOREmptyString } from '../../utils/string';
import { FileSystem } from '../filesystem';
import { Neo4j } from '../neo4j';

// This interface MUST be compatible with the "Message" defined in code/server/src/graphql/schema.ts
interface DataMessage {
  fingerprint: string;
  year: number;
  filename: string;
  pageNumber: number;
  message: string;

  raw_company: string;
  raw_company_spare: string;
  raw_address?: string;
  raw_address_spare?: string;
  raw_people?: string[];
  raw_people_abbr?: string[];
  raw_countries?: string[];
  raw_message: string;
}

@singleton()
export class DatasetImport {
  /**
   * Logger.
   */
  log = getLogger('DataSetImport');
  pdfFilenames: Set<string> | null = null;
  /**
   * Default constructor.
   */
  constructor(
    @inject(Neo4j) public neo4j: Neo4j,
    @inject(FileSystem) public fs: FileSystem,
  ) {
    if (fs.fileExists(config.server.import.pdfFilenameList)) {
      this.pdfFilenames = new Set(fs.readFile(config.server.import.pdfFilenameList).split('\n'));
    }
  }

  /**
   * Execute the import job.
   */
  async doImport(fileNamePattern?: RegExp): Promise<ImportReport> {
    let files = await this.fs.listFiles(
      config.server.import.pathToMessages,
      config.server.import.messages_file_glob_pattern,
    );
    this.log.info(`Found ${files.length} files to import in data folder`);
    if (fileNamePattern) {
      files = files.filter((f) => fileNamePattern.test(basename(f)));
      this.log.info(`Found ${files.length} files matching fileNamePattern: ${fileNamePattern}`);
    }

    const result: ImportReport = { count: 0, errors: [] };
    for (const file of files) {
      try {
        this.log.info(`Importing file ${file}`);
        const encoding: BufferEncoding = config.server.import.iso1FileNameRegexp.test(
          basename(file),
        )
          ? 'latin1'
          : 'utf-8';
        const fileResult = await this.importFile(file, encoding);
        this.log.info(
          `Imported ${fileResult.count} records from file ${file} ignored ${fileResult.wrong} wrong messages and ${fileResult.errors.length} errors`,
        );
        result.count += fileResult.count;
        result.errors.push(...fileResult.errors);
      } catch (e) {
        throw new Error(`Error importing file ${file}: ${(e as Error).message}`);
      }
    }
    this.log.info(`Import done for ${result.count} with ${result.errors.length}`);
    return result;
  }

  /**
   * Do the import for one file.
   */
  private async importFile(file: string, encoding: BufferEncoding) {
    let records: DataMessage[] = [];
    let count = 0;
    let wrong = 0;
    const errors: string[] = [];

    const stream = this.fs.streamFile(file).pipe(
      parse({
        delimiter: config.server.import.column_seperator,
        columns: config.server.import.headers,
        encoding,
        quote: null,
        skip_records_with_error: true,
      }),
    );

    for await (const record of stream) {
      count++;
      try {
        if (Object.keys(record).length !== 9) {
          errors.push(
            `Invalid number of columns in record n°${count} in file ${file} : ${Object.keys(record).join(',')}`,
          );
        } else {
          if (/.*wrong.*/i.test(record.year) || /.*wrong.*/i.test(record.company)) wrong += 1;
          else records.push(this.parseRecord(record));
        }
      } catch (e) {
        errors.push(`Error parsing record n°${count} in file ${file}: ${(e as Error).message}`);
      }
      if (records.length > config.server.import.batchSize) {
        await this.importRecords(records);
        records = [];
      }
    }
    if (records.length > 0) await this.importRecords(records);
    return { count, errors, wrong };
  }

  /**
   * Import a list in records in databases.
   */
  private async importRecords(records: DataMessage[]) {
    // Import into Neo4j
    const result = await this.neo4j.getFirstResultQuery<number>(
      `UNWIND $records as record
        MERGE (c:Company { name: record.raw_company })
        MERGE (m:Message { fingerprint: record.fingerprint })
        SET
          m.filename = record.filename,
          m.pageNumber = toInteger(record.pageNumber),
          m.message = record.message,
          m.year = toInteger(record.year),

          m.raw_company = record.raw_company,
          m.raw_company_spare = record.raw_company_spare,
          m.raw_address = record.raw_address,
          m.raw_address_spare = record.raw_address_spare,
          m.raw_people = record.raw_people,
          m.raw_people_abbr = record.raw_people_abbr,
          m.raw_countries = record.raw_countries

        MERGE (m)-[:CONTAINS]->(c)

        FOREACH (ad IN [aa IN [record.raw_address] WHERE aa IS NOT NULL ] | MERGE (a:Address { name: ad }) MERGE (m)-[:CONTAINS]->(a) )
        FOREACH (p IN coalesce(record.raw_people, []) | MERGE (person:Person { name: p }) MERGE (m)-[:CONTAINS]->(person))
        FOREACH (country IN coalesce(record.raw_countries, []) | MERGE (c:Country { name: country }) MERGE (m)-[:CONTAINS]->(c))

        RETURN count(*) as result
      `,

      { records },
    );

    if (result !== records.length) {
      throw new Error(
        `Error importing records: ${result} records imported instead of ${records.length}`,
      );
    }
  }

  /**
   * Parse the message content of a record, and  extract some additionnal data.
   */
  private parseRecordMessage(message: string): {
    filename: string;
    pageNumber: number;
    message: string;
  } {
    const group = message.match(/^.*File Name: ?.*?([^\\]+\.pdf) Page Number ?: ?(\d+)(.*)$/i);
    if (!group) {
      const fileGroup = message.match(/.*(File name ?: .* Page Number ?: ?.*?) .*$/i);
      throw new Error(
        `Could not parse message to find filename and page number: ${fileGroup ? fileGroup[1] : message}`,
      );
    } else
      return {
        filename: group[1],
        pageNumber: toNumber(group[2]) || 1,
        message: group[3],
      };
  }

  /**
   * From a CSV record (as an object), parse it and transform it into a DataMessage.
   */
  private parseRecord(record: { [key: string]: unknown }): DataMessage {
    const fingerprint = hash(JSON.stringify(record, null, 2));

    const data = {
      fingerprint,
      year: checkNilOREmptyString(record.year) ? undefined : toNumber(record.year),
      raw_company: this.cleanRecordValue(record.company),
      raw_company_spare: this.cleanRecordValue(record.company_spare),
      raw_address: this.cleanRecordValue(record.address, false),
      raw_address_spare: this.cleanRecordValue(record.address_spare, false),
      raw_people: this.cleanRecordValue(record.people, true),
      raw_people_abbr: this.cleanRecordValue(record.people_abbr, true),
      raw_countries: this.cleanRecordValue(record.countries, true),
      raw_message: this.cleanRecordValue(record.message),
    };

    if (isNil(data.raw_message))
      throw new Error(`Can't parse 'message' column, reading "${record.message}"`);
    if (isNil(data.year)) throw new Error(`Can't parse 'year' column, reading "${record.year}"`);
    if (isNil(data.raw_company))
      throw new Error(`Can't parse 'company' column, reading "${record.company}`);
    if (isNil(data.raw_company_spare)) data.raw_company_spare = data.raw_company;

    const { filename, pageNumber, message } = this.parseRecordMessage(data.raw_message as string);

    if (this.pdfFilenames && !this.pdfFilenames.has(filename)) {
      throw new Error(`Unknown PDF file "${filename}`);
    }
    return {
      ...data,
      filename,
      pageNumber,
      message,
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
