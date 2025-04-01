import { estypes } from '@elastic/elasticsearch';
import { getLogger } from '@ouestware/node-logger';
import fingerprint from 'talisman/keyers/fingerprint';
import { batcher } from 'ts-stream';
import { inject, singleton } from 'tsyringe';

import config from '../../config';
import { NodeItem } from '../../graphql/generated/types';
import {
  EsIndices,
  ImportReport,
  ItemType,
  itemTypes,
  Neo4jLabelsPendingModificationsLabels,
} from '../../types';
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

  async createIndices(resetIndices = true): Promise<void> {
    await Promise.all(
      itemTypes.map((item) =>
        this.es.createIndex(EsIndices[item], this.getIndexConfig(item), resetIndices),
      ),
    );
  }
  /**
   * Index all.
   */
  async doIndexation(resetIndices = true): Promise<ImportReport> {
    await this.createIndices(resetIndices);

    const results = await Promise.all([
      this.indexMessages(),
      this.indexPeople(),
      this.indexCompanies(),
      this.indexAddresses(),
      this.indexCountries(),
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
  async indexMessages(
    ids?: string[],
    withPendingModifications?: boolean,
    onBatchDone?: (ids: string[]) => Promise<void>,
    batchSize?: number,
  ): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string }>(
          this.getIndexMessagesQuery(ids, withPendingModifications),
          { ids },
        )
        .transform(batcher(batchSize || config.elastic.importBatchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('Exec batch', batchNumber);
            const report = await this.es.bulkImport(EsIndices['message'], batch);
            if (onBatchDone) await onBatchDone(batch.map((b) => b.id));
            result.count += batch.length;
            result.errors.push(...report.map((e) => e.error));
            this.log.info('Batch finished', batchNumber);
          },
          (error) => {
            if (error) {
              this.log.error(error + '');
              reject(error);
            }
            this.log.info('Messages indexation finished', result);
            resolve(result);
          },
        )
        .catch((error) => {
          if (error) {
            this.log.error(error + '');
            reject(error);
          }
        });
    });
  }

  /**
   * Index people.
   * If <code>ids</code> is provided, only the people with the given ids will be indexed.
   */
  async indexPeople(
    ids?: string[],
    withPendingModifications?: boolean,
    onBatchDone?: (ids: string[]) => Promise<void>,
    batchSize?: number,
  ): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string; name: string }>(
          this.getIndexPeopleQuery(ids, withPendingModifications),
          { ids },
        )
        .map((doc) => {
          return { ...doc, fingerprint: fingerprint(doc.name) };
        })
        .transform(batcher(batchSize || config.elastic.importBatchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('People exec batch', batchNumber);
            const report = await this.es.bulkImport(EsIndices['person'], batch);
            if (onBatchDone) await onBatchDone(batch.map((b) => b.id));
            result.count += batch.length;
            result.errors.push(...report.map((e) => e.error));
            this.log.info('People batch finished', batchNumber);
          },
          (error) => {
            if (error) reject(error);
            this.log.info('People indexation finished', result);
            resolve(result);
          },
        );
    });
  }

  /**
   * Index companies.
   * If <code>ids</code> is provided, only the people with the given ids will be indexed.
   */
  async indexCompanies(
    ids?: string[],
    withPendingModifications?: boolean,
    onBatchDone?: (ids: string[]) => Promise<void>,
    batchSize?: number,
  ): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string; name: string }>(
          this.getIndexCompaniesQuery(ids, withPendingModifications),
          { ids },
        )
        .map((doc) => {
          return { ...doc, fingerprint: fingerprint(doc.name) };
        })
        .transform(batcher(batchSize || config.elastic.importBatchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('Company exec batch', batchNumber);
            const report = await this.es.bulkImport(EsIndices['company'], batch);
            if (onBatchDone) await onBatchDone(batch.map((b) => b.id));
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
  async indexAddresses(
    ids?: string[],
    withPendingModifications?: boolean,
    onBatchDone?: (ids: string[]) => Promise<void>,
    batchSize?: number,
  ): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string; name: string }>(
          this.getIndexAddressesQuery(ids, withPendingModifications),
          { ids },
        )
        .map((doc) => {
          return { ...doc, fingerprint: fingerprint(doc.name) };
        })
        .transform(batcher(batchSize || config.elastic.importBatchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('Address exec batch', batchNumber);
            const report = await this.es.bulkImport(EsIndices['address'], batch);
            if (onBatchDone) await onBatchDone(batch.map((b) => b.id));
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
   * Index Countries.
   * If <code>ids</code> is provided, only the people with the given ids will be indexed.
   */
  async indexCountries(
    ids?: string[],
    withPendingModifications?: boolean,
    onBatchDone?: (ids: string[]) => Promise<void>,
    batchSize?: number,
  ): Promise<ImportReport> {
    return new Promise((resolve, reject) => {
      let batchNumber = 0;
      const result: ImportReport = { count: 0, errors: [] };

      this.neo4j
        .streamReadQuery<{ id: string }>(
          this.getIndexCountriesQuery(ids, withPendingModifications),
          { ids },
        )
        .transform(batcher(batchSize || config.elastic.importBatchSize))
        .forEach(
          async (batch) => {
            batchNumber++;
            this.log.info('Country exec batch', batchNumber);
            const report = await this.es.bulkImport(EsIndices['country'], batch);
            if (onBatchDone) await onBatchDone(batch.map((b) => b.id));
            result.count += batch.length;
            result.errors.push(...report.map((e) => e.error));
            this.log.info('Country batch finished', batchNumber);
          },
          (error) => {
            if (error) reject(error);
            this.log.info('Country indexation finished', result);
            resolve(result);
          },
        );
    });
  }

  /**
   * Return the cypher query to index people.
   */
  getIndexMessagesQuery(ids?: string[], withPendingModifications?: boolean) {
    return `
      MATCH (n:Message${withPendingModifications ? `:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}` : ''})
      ${ids && ids.length ? `WHERE n.id IN $ids` : ''}
      RETURN  {
        id: n.id,
        message: n.message,
        year: n.year,
        tags: n.tags,
        verified: n.verified,
        people:    collect { MATCH (n)-[r:CONTAINS]->(m:Person)  WHERE NOT coalesce(r.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        addresses: collect { MATCH (n)-[r:CONTAINS]->(m:Address) WHERE NOT coalesce(r.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        companies: collect { MATCH (n)-[r:CONTAINS]->(m:Company) WHERE NOT coalesce(r.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        countries: collect { MATCH (n)-[r:CONTAINS]->(m:Country) WHERE NOT coalesce(r.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  }
      } as result`;
  }

  /**
   * Return the cypher query to index people.
   */
  getIndexPeopleQuery(ids?: string[], withPendingModifications?: boolean) {
    return `
      MATCH (n:Person${withPendingModifications ? `:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}` : ''})
      ${ids && ids.length ? `WHERE n.id IN $ids` : ''}
      RETURN  {
        id: n.id,
        name: n.name,
        tags: n.tags,
        verified: n.verified,
        addresses: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Address) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT  m.id + "${config.elastic.idValueSeparator}" + m.name  },
        companies: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Company) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT  m.id + "${config.elastic.idValueSeparator}" + m.name  },
        countries: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Country) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT  m.id + "${config.elastic.idValueSeparator}" + m.name  },
        years:     collect { MATCH (n)<-[r1:CONTAINS]-(m:Message) WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.year  }
      } as result`;
  }

  /**
   * Return the cypher query to index company.
   */
  getIndexCompaniesQuery(ids?: string[], withPendingModifications?: boolean) {
    return `
      MATCH (n:Company${withPendingModifications ? `:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}` : ''})
      ${ids && ids.length ? `WHERE n.id IN $ids` : ''}
      RETURN  {
        id: n.id,
        name: n.name,
        tags: n.tags,
        verified: n.verified,
        people:    collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Person)  WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        addresses: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Address) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        countries: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Country) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        years:     collect { MATCH (n)<-[r1:CONTAINS]-(m:Message) WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.year  }
      } as result`;
  }

  /**
   * Return the cypher query to index addresses.
   */
  getIndexAddressesQuery(ids?: string[], withPendingModifications?: boolean) {
    return `
      MATCH (n:Address${withPendingModifications ? `:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}` : ''})
      ${ids && ids.length ? `WHERE n.id IN $ids` : ''}
      RETURN  {
        id: n.id,
        name: n.name,
        tags: n.tags,
        verified: n.verified,
        people:    collect { MATCH(n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Person)  WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        companies: collect { MATCH(n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Company) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        countries: collect { MATCH(n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Country) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  },
        years:     collect { MATCH(n)<-[r1:CONTAINS]-(m:Message) WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.year  }
      } as result`;
  }

  /**
   * Return the cypher query to index country.
   */
  getIndexCountriesQuery(ids?: string[], withPendingModifications?: boolean) {
    return `
      MATCH (n:Country${withPendingModifications ? `:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}` : ''}) 
      ${ids && ids.length ? `WHERE n.id IN $ids` : ''}
      RETURN  {
        id: n.id,
        name: n.name,
        tags: n.tags,
        verified: n.verified,
        people:    collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Person)  WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name  LIMIT ${config.elastic.nested_objects_limit}},
        companies: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Company) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name LIMIT ${config.elastic.nested_objects_limit} },
        addresses: collect { MATCH (n)<-[r1:CONTAINS]-(:Message)-[r2:CONTAINS]->(m:Address) WHERE NOT coalesce(r1.deleted, false) AND  NOT coalesce(r2.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.id + "${config.elastic.idValueSeparator}" + m.name LIMIT ${config.elastic.nested_objects_limit} },
        years:     collect { MATCH (n)<-[r1:CONTAINS]-(m:Message) WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(m.deleted, false) RETURN DISTINCT m.year  }
      } as result`;
  }

  /**
   * update tags
   */
  async updateNode(
    itemType: ItemType,
    id: string,
    nodeUpdate: Partial<Pick<NodeItem, 'tags' | 'verified'>>,
  ) {
    const result = await this.es.client.update({
      index: EsIndices[itemType],
      id,
      doc: nodeUpdate,
    });
    this.log.info(JSON.stringify(result, undefined, 2));
    if (result.result === 'not_found')
      throw new Error(
        `Node could not be updated in ES for ${itemType} ${id} update: ${JSON.stringify(this.updateNode, undefined, 2)}`,
      );
  }

  /**
   * Returns the elastic configuration for a dataset.
   */
  private getIndexConfig(item: ItemType): Omit<estypes.IndicesCreateRequest, 'index'> {
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
            default: {
              filter: ['lowercase', 'asciifolding', 'custom_word_delimiter', 'filter_stop'],
              type: 'custom',
              tokenizer: 'whitespace',
            },
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
          name: {
            type: 'keyword',
            fields: {
              text: {
                type: 'text', // optimization ? match_only_text ?
                analyzer: 'IndexAnalyzer',
                search_analyzer: 'SearchAnalyzer',
              },
            },
          },
          tags: { type: 'keyword' },
          verified: { type: 'boolean' },
          ...(item === 'message'
            ? {
                message: {
                  type: 'text', // match_only_text?
                  analyzer: 'IndexAnalyzer',
                  search_analyzer: 'SearchAnalyzer',
                },
                year: { type: 'integer' },
              }
            : {}),
          ...(item !== 'person' ? { people: { type: 'keyword' } } : {}),
          ...(item !== 'address' ? { addresses: { type: 'keyword' } } : {}),
          ...(item !== 'company' ? { companies: { type: 'keyword' } } : {}),
          ...(item !== 'country' ? { countries: { type: 'keyword' } } : {}),
          ...(item !== 'message'
            ? {
                years: { type: 'integer' },
                fingerprint: { type: 'keyword' },
              }
            : {}),
        },
      },
    };
  }
}
