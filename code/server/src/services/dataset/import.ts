import path, { basename } from 'path';
import { getLogger } from '@ouestware/node-logger';
import { toNumber, toString } from '@ouestware/type-utils';
import { parse } from 'csv-parse';
import { fromPairs, isNil } from 'lodash';
import hash from 'object-hash';
import { inject, singleton } from 'tsyringe';

import config from '../../config';
import { DataMessage, ImportReport, itemTypes, Neo4jLabels } from '../../types';
import { checkNilOREmptyString } from '../../utils/string';
import { FileSystem } from '../filesystem';
import { Neo4j } from '../neo4j';

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
    // import tags lists
    await this.importTags();

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
  public async importRecords(
    data: DataMessage[],
  ): Promise<Array<DataMessage<{ id: string; name: string }>>> {
    const records: DataMessage<{ id: string; name: string }>[] = data.map((record) => ({
      ...record,
      raw_company: { id: hash(record.raw_company), name: record.raw_company },
      raw_address: record.raw_address
        ? { id: hash(record.raw_address), name: record.raw_address }
        : undefined,
      raw_people: (record.raw_people || []).map((p) => ({ id: hash(p), name: p })),
      raw_countries: (record.raw_countries || []).map((c) => ({ id: hash(c), name: c })),
    }));

    // Import into Neo4j
    const result = await this.neo4j.getFirstResultQuery<number>(
      `UNWIND $records as record
        // Message creation
        MERGE (m:Message { id: record.id })
        SET m = {
          id: record.id,
          filename: record.filename,
          pageNumber: toInteger(record.pageNumber),
          message: record.message,
          year: toInteger(record.year),
          raw_company: record.raw_company.name,
          raw_address: [a IN coalesce(record.raw_address, []) | a.name],
          raw_people: [a IN coalesce(record.raw_people, []) | a.name],
          raw_countries: [a IN coalesce(record.raw_countries, []) | a.name],
          raw_message: record.raw_message,
          // times
          created: datetime(),
          updated: datetime()
        }

        // Company creation
        MERGE (c:Company { id: record.raw_company.id })
        SET c = {
          id: record.raw_company.id,
          name: record.raw_company.name,
          // times
          created: datetime(),
          updated: datetime()
        }
        
        // Create link between message and company
        MERGE (m)-[:CONTAINS]->(c)

        WITH m, record
          CALL (m, record) {
            UNWIND coalesce(record.raw_address, []) as address WITH address WHERE address IS NOT NULL
              MERGE (a:Address { id: address.id }) 
                ON CREATE SET 
                  a.name = address.name,
                  // times
                  a.created = datetime(),
                  a.updated = datetime()
              MERGE (m)-[:CONTAINS]->(a) 
          }

          CALL (m, record) {
            UNWIND coalesce(record.raw_people, []) as person WITH person WHERE person IS NOT NULL
              MERGE (p:Person { id: person.id }) 
                ON CREATE SET 
                  p.name = person.name,
                  // times
                  p.created = datetime(),
                  p.updated = datetime()
              MERGE (m)-[:CONTAINS]->(p) 
          }

          CALL (m, record) {
            UNWIND coalesce(record.raw_countries, []) as country WITH country WHERE country IS NOT NULL
              MERGE (c:Country { id: country.id }) 
                ON CREATE SET 
                  c.name = country.name,
                  // times
                  c.created = datetime(),
                  c.updated = datetime()
              MERGE (m)-[:CONTAINS]->(c) 
          }

          RETURN count(*) as result
      `,

      { records },
    );

    if (result !== records.length) {
      throw new Error(
        `Error importing records: ${result} records imported instead of ${records.length}`,
      );
    }

    return records;
  }
  /**
   * Import tags from CSV files
   */
  async importTags() {
    const results = await Promise.all(
      itemTypes
        .filter((it) => it !== 'message')
        .map(async (itemType) => {
          let nbItems = 0;
          const tagsPath = path.join(config.server.import.pathToTags, `${itemType}.csv`);
          if (this.fs.fileExists(tagsPath)) {
            this.log.info(`Importing tags for ${itemType} from ${tagsPath}`);
            const session = this.neo4j.getWriteSession();
            const tx = await session.beginTransaction();

            const stream = this.fs.streamFile(tagsPath).pipe(
              parse({
                delimiter: ',',
                encoding: 'utf8',
                columns: ['name', 'tags'],
                cast: (value, ctx) => (ctx.column === 'tags' ? value.split('|') : value),
              }),
            );
            try {
              for await (const record of stream) {
                const result = await this.neo4j.getTxFirstResultQuery<number>(
                  tx,
                  /* cypher */ `
                MERGE (p:${Neo4jLabels[itemType]} { id: $record.id }) 
                  ON CREATE SET 
                    p = $record,
                    // times
                    p.created = datetime(),
                    p.updated = datetime()
                  ON MATCH SET
                    p.tags = $record.tags,
                    p.updated = datetime()
                RETURN 1 as result`,
                  { record: { ...record, id: hash(record.name) } },
                );
                if (result) nbItems += result;
                else throw new Error(`Could not import tags ${record}`);
              }
              await tx.commit();
              this.log.info(`Imported ${nbItems} items with tags`);
            } catch (error) {
              this.log.error(error + '');
              await tx.rollback();
            } finally {
              await tx.close();
              await session.close();
            }
          }
          return [itemType, nbItems];
        }),
    );
    return fromPairs(results);
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
      id: fingerprint,
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
