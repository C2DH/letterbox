import { estypes } from '@elastic/elasticsearch';
import { getLogger } from '@ouestware/node-logger';
import { batcher } from 'ts-stream';
import { inject, singleton } from 'tsyringe';

import config from '../../config';
import { ImportReport, ItemType, itemTypes } from '../../types';
import { Elastic } from '../elastic';
import { Neo4j } from '../neo4j';

@singleton()
export class DatasetIndexation {
  /**
   * Logger.
   */
  log = getLogger('DataSet');

  /**
   * Default constructor.
   */
  constructor(
    @inject(Neo4j) public neo4j: Neo4j,
    @inject(Elastic) public es: Elastic,
  ) {}

  /**
   * Index all.
   */
  async doIndexation(): Promise<ImportReport> {
    await Promise.all(
      itemTypes.map((item) =>
        this.es.createIndex(this.getIndexName(item), this.getIndexConfig(item), true),
      ),
    );

    const results = await Promise.all([
      this.indexMessages(),
      this.indexPeople(),
      this.indexCompanies(),
      this.indexAdresses(),
    ]);

    return results.reduce(
      (acc, r) => {
        acc.count += r.count;
        acc.errors.push(...r.errors);
        return acc;
      },
      { count: 0, errors: [] },
    );
  }

  /**
   * Index messages.
   * If <code>ids</code> is provided, only the messages with the given ids will be indexed.
   */
  async indexMessages(ids?: string[]): Promise<ImportReport> {
    let batchNumber = 0;
    const result: ImportReport = { count: 0, errors: [] };

    this.neo4j
      .streamReadQuery<{ id: string }>(
        ` MATCH (n:Message)
          ${ids && ids.length ? `WHERE elementId(n) IN $ids` : ''}
          RETURN  {
            id: id(n),
            message: n.message,
            year: n.year,
            people: collect { MATCH (n)-->(m:Person) RETURN DISTINCT { id: elementId(m), name: m.name } },
            addresses: collect { MATCH (n)-->(m:Address) RETURN DISTINCT { id: elementId(m), name: m.name } },
            companies: collect { MATCH (n)-->(m:Company) RETURN DISTINCT { id: elementId(m), name: m.name } },
            countries: collect { MATCH (n)-->(m:Country) RETURN DISTINCT { id: elementId(m), name: m.name } }
          } as result`,
        { ids },
      )
      .transform(batcher(config.elastic.batchSize))
      .forEach(async (batch) => {
        batchNumber++;
        this.log.info('Exec batch', batchNumber);
        const report = await this.es.bulkImport(this.getIndexName('message'), batch);
        result.count += batch.length;
        result.errors.push(...report.map((e) => e.error));
        this.log.info('Batch finished', batchNumber);
      });
    this.log.info('Message indexation finished', result);
    return result;
  }

  /**
   * Index people.
   * If <code>ids</code> is provided, only the people with the given ids will be indexed.
   */
  async indexPeople(ids?: string[]): Promise<ImportReport> {
    let batchNumber = 0;
    const result: ImportReport = { count: 0, errors: [] };

    this.neo4j
      .streamReadQuery<{ id: string }>(
        ` MATCH (n:Person)
          ${ids && ids.length ? `WHERE elementId(n) IN $ids` : ''}
          RETURN  {
            id: elementId(n),
            name: n.name,
            addresses: collect { MATCH(n)<--(:Message)-->(m:Address) RETURN DISTINCT { id: elementId(m), name: m.name } },
            companies: collect { MATCH(n)<--(:Message)-->(m:Company) RETURN DISTINCT { id: elementId(m), name: m.name } },
            countries: collect { MATCH(n)<--(:Message)-->(m:Country) RETURN DISTINCT { id: elementId(m), name: m.name } }
          } as result`,
        { ids },
      )
      .transform(batcher(config.elastic.batchSize))
      .forEach(async (batch) => {
        batchNumber++;
        this.log.info('People exec batch', batchNumber);
        const report = await this.es.bulkImport(this.getIndexName('person'), batch);
        result.count += batch.length;
        result.errors.push(...report.map((e) => e.error));
        this.log.info('People batch finished', batchNumber);
      });
    this.log.info('People indexation finished', result);
    return result;
  }

  /**
   * Index companies.
   * If <code>ids</code> is provided, only the people with the given ids will be indexed.
   */
  async indexCompanies(ids?: string[]): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string }>(
          ` MATCH (n:Company)
          ${ids && ids.length ? `WHERE elementId(n) IN $ids` : ''}
          RETURN  {
            id: elementId(n),
            name: n.name,
            people: collect { MATCH(n)<--(:Message)-->(m:Person) RETURN DISTINCT {id: elementId(m), name: m.name} },
            addresses: collect { MATCH(n)<--(:Message)-->(m:Address) RETURN DISTINCT {id: elementId(m), name: m.name} },
            countries: collect { MATCH(n)<--(:Message)-->(m:Country) RETURN DISTINCT {id: elementId(m), name: m.name} }
          } as result`,
          {},
        )
        .transform(batcher(config.elastic.batchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('Company exec batch', batchNumber);
            const report = await this.es.bulkImport(this.getIndexName('company'), batch);
            result.count += batch.length;
            result.errors.push(...report.map((e) => e.error));
            this.log.info('Company batch finished', batchNumber);
          },
          (error) => {
            if (error) reject(error);
            this.log.info('Company indexation finished', result);
            resolve(result);
          },
        );
    });
  }

  /**
   * Index Addresses.
   * If <code>ids</code> is provided, only the people with the given ids will be indexed.
   */
  async indexAdresses(ids?: string[]): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string }>(
          ` MATCH (n:Address)
          ${ids && ids.length ? `WHERE elementId(n) IN $ids` : ''}
          RETURN  {
            id: elementId(n),
            name: n.name,
            people: collect { MATCH(n)<--(:Message)-->(m:Person) RETURN DISTINCT {id: elementId(m), name: m.name} },
            companies: collect { MATCH(n)<--(:Message)-->(m:Company) RETURN DISTINCT {id: elementId(m), name: m.name} },
            countries: collect { MATCH(n)<--(:Message)-->(m:Country) RETURN DISTINCT {id: elementId(m), name: m.name} }
          } as result`,
          {},
        )
        .transform(batcher(config.elastic.batchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('Address exec batch', batchNumber);
            const report = await this.es.bulkImport(this.getIndexName('address'), batch);
            result.count += batch.length;
            result.errors.push(...report.map((e) => e.error));
            this.log.info('Address batch finished', batchNumber);
          },
          (error) => {
            if (error) reject(error);
            this.log.info('Address indexation finished', result);
            resolve(result);
          },
        );
    });
  }

  /**
   * Returns the index name for an item type.
   */
  private getIndexName(item: ItemType): string {
    switch (item) {
      case 'message':
        return `${config.elastic.index_prefix}messages`;
      case 'person':
        return `${config.elastic.index_prefix}people`;
      case 'company':
        return `${config.elastic.index_prefix}companies`;
      case 'address':
        return `${config.elastic.index_prefix}addresses`;
      case 'country':
        return `${config.elastic.index_prefix}countries`;
    }
  }

  /**
   * Returns the elastic configuration for a dataset.
   */
  private getIndexConfig(item: ItemType): Omit<estypes.IndicesCreateRequest, 'index'> {
    const nestedtValue: estypes.MappingNestedProperty = {
      type: 'nested',
      properties: {
        id: { type: 'keyword' },
        name: { type: 'keyword' },
      },
    };

    return {
      settings: {
        analysis: {
          filter: {
            filter_stop: {
              type: 'stop',
            },
            custom_word_delimiter: {
              type: 'word_delimiter',
              split_on_numerics: false,
            },
          },
          analyzer: {
            IndexAnalyzer: {
              filter: ['lowercase', 'asciifolding', 'custom_word_delimiter', 'filter_stop'],
              type: 'custom',
              tokenizer: 'whitespace',
            },
            SearchAnalyzer: {
              filter: ['lowercase', 'asciifolding', 'custom_word_delimiter', 'filter_stop'],
              type: 'custom',
              tokenizer: 'whitespace',
            },
          },
        },
      },
      mappings: {
        properties: {
          id: { type: 'keyword' },
          ...(item === 'message'
            ? {
                message: {
                  type: 'text',
                  analyzer: 'IndexAnalyzer',
                  search_analyzer: 'SearchAnalyzer',
                },
              }
            : {}),
          ...(item !== 'person' ? { people: nestedtValue } : {}),
          ...(item !== 'address' ? { addresses: nestedtValue } : {}),
          ...(item !== 'company' ? { companies: nestedtValue } : {}),
          ...(item !== 'country' ? { countries: nestedtValue } : {}),
        },
      },
    };
  }
}
