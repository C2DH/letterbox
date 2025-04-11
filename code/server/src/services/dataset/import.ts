import path, { basename } from 'path';
import { getLogger } from '@ouestware/node-logger';
import { toNumber, toString } from '@ouestware/type-utils';
import { parse } from 'csv-parse';
import { fromPairs, isNil } from 'lodash';
import hash from 'object-hash';
import { inject, singleton } from 'tsyringe';

import config from '../../config';
import { DataMessage, ImportReport, itemTypes, MessageCsvRecord, Neo4jLabels } from '../../types';
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
        const fileResult = await this.importFile(file, 'utf8');
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
        columns: true, //config.server.import.headers as unknown as string[],
        encoding,
        //quote: '"',
        //skip_records_with_error: true,
      }),
    );
    let wrongFileHeaders = false;
    for await (const _record of stream) {
      count++;
      if (wrongFileHeaders === false)
        try {
          // check columns
          if (!config.server.import.headers.every((h) => _record[h] !== undefined)) {
            wrongFileHeaders = true;
            throw new Error(
              `file ${file} does not have those required columns: ${config.server.import.headers.filter((h) => _record[h] === undefined)}`,
            );
          }
          const record = _record as MessageCsvRecord;
          if (Object.keys(record).length !== config.server.import.headers.length) {
            errors.push(
              `Invalid number of columns in record n°${count} in file ${file} : ${Object.keys(record).join(',')}`,
            );
          } else {
            if (/.*wrong.*/i.test(record.Year) || /.*wrong.*/i.test(record.Company_Name_Main))
              wrong += 1;
            else records.push(this.parseRecord(record));
          }
        } catch (e) {
          errors.push(`Error parsing record n°${count} in file ${file}: ${(e as Error).message}`);
        }
      if (records.length >= config.server.import.batchSize) {
        await this.importRecords(records);
        records = [];
      }
    }
    if (records.length > 0) {
      await this.importRecords(records);
    }
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
          verified: record.verified,
          tags: record.tags,
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
          verified: false,
          tags: [],
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
                  a.verified = false,
                  a.tags = [],
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
                  p.verified = false,
                  p.tags = [],
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
                  c.verified = false,
                  c.tags = [],
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
    const group = message.match(/^.*File Name: ?.*?([^\\]+\.pdf) Page Number ?: ?(\d+) ?\+*(.*)$/i);
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
  private parseRecord(record: MessageCsvRecord): DataMessage {
    const fingerprint = hash(JSON.stringify(record, null, 2));
    const { message } = this.parseRecordMessage(record.Description_Business);

    if (isNil(record.Description_Business))
      throw new Error(`Can't parse 'message' column, reading "${record.Description_Business}"`);
    if (checkNilOREmptyString(record.Year) || toNumber(record.Year) === undefined)
      throw new Error(`Can't parse 'Year' column, reading "${record.Year}"`);
    if (checkNilOREmptyString(record.Company_Name_Main))
      throw new Error(`Missing required 'company' column, reading "${record.Company_Name_Main}`);

    if (
      checkNilOREmptyString(record.FileName) ||
      (this.pdfFilenames && !this.pdfFilenames.has(record.FileName))
    ) {
      throw new Error(`Unknown PDF file "${record.FileName}`);
    }
    if (checkNilOREmptyString(record.PageNumber) || toNumber(record.PageNumber) === undefined)
      throw new Error(`Can't parse 'PageNumber' column, reading "${record.PageNumber}"`);

    const data: DataMessage = {
      id: fingerprint,
      year: toNumber(record.Year) as number,
      filename: record.FileName,
      pageNumber: toNumber(record.PageNumber) as number,
      message,
      verified: false,
      tags: [],
      raw_company: this.cleanRecordValue(record.Company_Name_Main) as string,
      raw_company_spare: this.cleanRecordValue(record.Company_Name_Alternative),
      raw_address: this.cleanRecordValue(record.Address_Main, false),
      raw_address_spare: this.cleanRecordValue(record.Alternate_Address, false),
      raw_people: this.cleanRecordValue(record.People, true),
      raw_people_abbr: this.cleanRecordValue(record.People_Abbr, true),
      raw_countries: this.cleanRecordValue(record.Countries, true).filter(
        (c) => c !== 'Luxembourg',
      ),
      raw_message: this.cleanRecordValue(record.Description_Business) as string,
    };

    return data;
  }

  private cleanRecordValue(value: unknown): string | undefined;
  private cleanRecordValue(value: unknown, multiple: false): string | undefined;
  private cleanRecordValue(value: unknown, multiple: true): string[] | [];
  private cleanRecordValue(value: unknown, multiple: boolean = false) {
    if (checkNilOREmptyString(value)) return multiple ? [] : undefined;
    if (multiple)
      return `${value}`.split(config.server.import.value_separator).map((v) => v.trim());
    return toString(value)?.trim();
  }
}
