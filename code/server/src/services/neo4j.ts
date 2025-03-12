import { getLogger } from '@ouestware/node-logger';
import * as neo4j from 'neo4j-driver';
import Stream from 'ts-stream';
import { singleton } from 'tsyringe';

import config from '../config';

@singleton()
export class Neo4j {
  /**
   * logger
   */
  private log = getLogger('Neo4j');

  /**
   * Database name
   */
  public database?: string;

  /**
   * Neo4j driver
   */
  public driver: neo4j.Driver;

  /**
   * Default constructor
   */
  constructor() {
    const neoConfig = config.neo4j;
    this.log.info('Creating the neo4j driver with configuration', neoConfig);
    this.database = neoConfig.database;
    this.driver = neo4j.driver(
      neoConfig.url,
      neo4j.auth.basic(neoConfig.login, neoConfig.password),
      neoConfig.options,
    );
  }

  /**
   * Run a cypher query inside the given transaction.
   * You have to call commit /rollback and to close the underlying session by yourself.
   * If your query as $skip & $limit parameters but they are not defined in the query's parameter,
   * this function will do the batch for you.
   * Per default the max fetch size is 1000, so if your query returns more than that, you have to batch !
   *
   * @param query Cypher query to run
   * @param params Cypher query parameters
   * @param field The cypher query variable to return (default is 'result')
   */
  async getTxResultQuery<T>(
    tx: neo4j.Transaction,
    query: string,
    params: Record<string, unknown>,
    field = 'result',
  ): Promise<Array<T>> {
    // this.log.debug(
    //   `Running query ${query} with params ${JSON.stringify(omit(params, ['password']), null, 2)}`,
    // );
    let result: Array<T> = [];

    const shouldBatch =
      query.includes('$skip') && !params.skip && query.includes('$limit') && !params.limit;
    const fetchSize = config.neo4j.options?.fetchSize || 1000;

    let completed = false;
    while (!completed) {
      const batchResult = await tx.run(
        query,
        !shouldBatch
          ? params
          : { ...params, skip: neo4j.int(result.length), limit: neo4j.int(fetchSize) },
      );
      result = [...result, ...batchResult.records.map((n) => n.get(field) as unknown as T)];
      if (!shouldBatch || batchResult.records.length < fetchSize) completed = true;
    }
    return result;
  }

  /**
   * Run a cypher query and return the first record
   * You have to call commit /rollback and to close the underlying session by yourself.
   *
   * @param  query Cypher query to execute
   * @param  params Query's parameters
   * @param  field of field to get
   * @returns The query's result with the given projection
   */
  async getTxFirstResultQuery<T>(
    tx: neo4j.Transaction,
    query: string,
    params: Record<string, unknown>,
    field = 'result',
  ): Promise<T | null> {
    // this.log.debug(
    //   `Running query ${query} with params ${JSON.stringify(omit(params, ['password']), null, 2)}`,
    // );
    const result = await tx.run(query, params);
    const record = result.records.shift();
    return !record ? null : (record.get(field) as T);
  }

  /**
   * Run a cypher query.
   * If your query as $skip & $limit parameters but they are not defined in the query's parameter,
   * this function will do the batch for you.
   * Per default the max fetch size is 1000, so if your query returns more than that, you have to batch !
   *
   * @param query Cypher query to run
   * @param params Cypher query parameters
   * @param field The cypher query variable to return (default is 'result')
   */
  async getResultQuery<T>(
    query: string,
    params: Record<string, unknown>,
    field = 'result',
  ): Promise<Array<T>> {
    const session = this.driver.session({ database: this.database });
    const tx = session.beginTransaction();
    try {
      const result = await this.getTxResultQuery<T>(tx, query, params, field);
      await tx.commit();
      return result;
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await session.close();
    }
  }

  /**
   * Run a cypher query and return the first record
   *
   * @param  query Cypher query to execute
   * @param  params Query's parameters
   * @param  field Field to get from the first row
   * @returns The query's result with the given projection
   */
  async getFirstResultQuery<T>(
    query: string,
    params: Record<string, unknown>,
    field = 'result',
  ): Promise<T | null> {
    const session = this.driver.session({ database: this.database });
    const tx = session.beginTransaction();
    try {
      const result = this.getTxFirstResultQuery<T>(tx, query, params, field);
      await tx.commit();
      return result;
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await session.close();
    }
  }

  getReadSession(): neo4j.Session {
    return this.driver.session({ defaultAccessMode: neo4j.session.READ, database: this.database });
  }

  getWriteSession(): neo4j.Session {
    return this.driver.session({ defaultAccessMode: neo4j.session.WRITE, database: this.database });
  }

  /**
   * Create a stream of result from a cypher query
   */
  streamReadQuery<T>(query: string, params: Record<string, unknown>): Stream<T> {
    const stream = new Stream<T>();
    const session = this.driver.session({ database: this.database });
    session
      .executeRead(async (tx) => {
        try {
          const result = tx.run(query, params);
          for await (const record of result) {
            await stream.write(record.get('result') as T);
          }
          stream.end();
        } catch (error) {
          stream.end(error as Error);
          this.log.error('Error while streaming query', { query, error });
        }
      })
      .finally(() => session.close());
    return stream;
  }

  /**
   * Reset the database by deleting all nodes and relationships in a batch of size 'batchSize' (default 100).
   * This function is usefull for testing purpose and to clear the DB.
   */
  async resetDatabase(batchSize = 100): Promise<void> {
    const session = this.getWriteSession();
    try {
      await session.run(
        ` CALL apoc.periodic.commit(
            "MATCH (n) WITH n LIMIT $limit DETACH DELETE n RETURN count(*)",
            {limit: ${batchSize}}
          )`,
      );
    } finally {
      await session.close();
    }
  }
}
