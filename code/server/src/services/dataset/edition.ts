import Boom from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { chunk } from 'lodash';
import type { Transaction } from 'neo4j-driver';
import { inject, singleton } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import config from '../../config';
import {
  Neo4jLabels,
  Neo4jLabelsPendingModificationsLabels,
  type ItemType,
  type NodeItemDefinition,
} from '../../types';
import { Neo4j } from '../neo4j';
import { DatasetIndexation } from './indexation';

@singleton()
export class DatasetEdition {
  /**
   * Logger.
   */
  log = getLogger('DataSetEdition');

  /**
   * Default constructor.
   */
  constructor(
    @inject(Neo4j) public neo4j: Neo4j,
    @inject(DatasetIndexation) public indexation: DatasetIndexation,
  ) {}

  /**
   * Create a new node of type `type` with name `name`,
   * linked to the message with id `messageId`.
   *
   * @returns the created node definition
   */
  async createNode(messageId: string, type: ItemType, name: string): Promise<NodeItemDefinition> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot create node of type message`);
    await this.checkItemExists('message', messageId);

    // Create the node
    const nodeId = uuid();
    await this.neo4j.getFirstResultQuery<string[]>(
      /* cypher*/ ` MATCH (m:Message {id: $messageId}) 
        CREATE (n:${Neo4jLabels[type]} { id: $id, name: $name, created: datetime(), updated: datetime() }) 
        CREATE (m)-[:CONTAINS { created: datetime(), updated: datetime() }]->(n)
        SET m:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
        RETURN 1 as result`,
      { messageId, id: nodeId, name },
    );
    return { type, id: nodeId };
  }

  /**
   * Attached a node of type `type` with name `name`,
   * linked to the message with id `messageId`.
   */
  async linkNode(messageId: string, type: ItemType, id: string): Promise<void> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot link a node of type message`);
    await this.checkItemExists('message', messageId);
    await this.checkItemExists(type, id);

    // Link nodes
    await this.neo4j.getFirstResultQuery<string[]>(
      /* cypher*/ ` MATCH (m:Message {id: $messageId}) 
        MATCH (n:${Neo4jLabels[type]} {id: $id}) 
        MERGE (m)-[r:CONTAINS]->(n)
          ON CREATE SET 
            r.created = datetime(), 
            r.updated = datetime()
        SET m:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
        RETURN 1 as result`,
      { messageId, id },
    );
  }

  /**
   * Rename a node of type `type` with id `id`.
   */
  async renameNode(type: ItemType, id: string, name: string): Promise<void> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message`);
    await this.checkItemExists(type, id);

    // Rename the node
    await this.neo4j.getFirstResultQuery<string[]>(
      /* cypher*/ `MATCH (n:${Neo4jLabels[type]} { id: $id })
        SET n.name = $name,
            n.updated = datetime()
        WITH n
          MATCH (n)<-[r:CONTAINS]-(msg:Message) WHERE NOT coalesce(r.deleted, false) 
          SET msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
          RETURN 1 as result`,
      { id, name },
    );
  }

  /**
   * Change the type of a node
   */
  async changeNodeType(type: ItemType, id: string, newType: ItemType): Promise<NodeItemDefinition> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);
    if (newType === 'message') throw Boom.badRequest(`Cannot change type to message`);
    await this.checkItemExists(type, id);

    // Change the type
    await this.neo4j.getFirstResultQuery<string[]>(
      /*cypher */ ` MATCH (n:${Neo4jLabels[type]} { id: $id })
        REMOVE n:${Neo4jLabels[type]}
        SET n:${Neo4jLabels[newType]}
        SET n.updated = datetime()
        WITH n
          MATCH (n)<-[r:CONTAINS]-(msg:Message) WHERE NOT coalesce(r.deleted, false)
          SET msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
          RETURN 1 as result`,
      { id },
    );

    return { type, id };
  }

  /**
   * Delete a node.
   */
  async deleteNode(type: ItemType, id: string, tx?: Transaction): Promise<void> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);
    await this.checkItemExists(type, id);

    // Delete the node
    const query = /* cypher */ `
      MATCH (n:${Neo4jLabels[type]} { id: $id }) 
      SET n.deleted = true,
          n.updated = datetime()
      WITH n
        OPTIONAL MATCH (n)<-[r:CONTAINS]-(msg:Message) WHERE NOT coalesce(r.deleted, false) 
        SET msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
      WITH n
        OPTIONAL MATCH (n)-[r]-() SET r.deleted = true, r.updated = datetime()
        RETURN 1 AS result`;
    await (tx
      ? this.neo4j.getTxFirstResultQuery<string[]>(tx, query, { id })
      : this.neo4j.getFirstResultQuery<string[]>(query, { id }));
  }

  /**
   * Merge nodes into one.
   */
  async mergeNodes(
    nodes: Array<{ type: ItemType; id: string }>,
    targetType: ItemType,
    targetName: string,
  ): Promise<NodeItemDefinition> {
    // Some checks
    if (nodes.some((n) => n.type === 'message'))
      throw Boom.badRequest(`Cannot do merge on message nodes`);

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Get nodes graph fingerprint
      const mergeData = await Promise.all(
        nodes.map(async (nodeDef) => {
          // Check that the node exists and get its graph fingerprint
          const data = await this.getItemGraphFingerprint(tx, nodeDef.type, nodeDef.id);
          // delete the node: this action will flag all impacted message
          await this.deleteNode(nodeDef.type, nodeDef.id, tx);
          return data;
        }),
      );

      // Create the target node
      const targetId = uuid();
      const targetElementId = await this.neo4j.getTxFirstResultQuery<string>(
        tx,
        /*cypher*/ `CREATE (n:${Neo4jLabels[targetType]} { id: $id, name: $name, created: datetime(), updated: datetime() }) RETURN elementId(n) AS result`,
        { id: targetId, name: targetName },
      );

      // Merge the nodes into the target one
      await this.neo4j.getTxFirstResultQuery<string[]>(
        tx,
        /*cypher*/ ` MATCH (n) WHERE elementId(n) = $targetElementId
          UNWIND $mergeData AS data
            WITH n, data
              CALL(n, data) {
                UNWIND data.inEdges as edge
                  MATCH (m) WHERE elementId(m) = edge.elementId
                  CREATE (m)-[:$(edge.type) { created: datetime(), updated: datetime() }]->(n)
              }
              CALL(n, data) {
                UNWIND data.outEdges as edge
                  MATCH (m) WHERE elementId(m) = edge.elementId
                  CREATE (n)-[:$(edge.type) { created: datetime(), updated: datetime() }]->(m)
              }
              RETURN count(*) AS result`,
        { targetElementId, mergeData },
      );

      await tx.commit();

      // Returned the created merged node
      return { type: targetType, id: targetId };
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await session.close();
    }
  }

  /**
   * Split a node in multiples
   */
  async splitNode(
    type: ItemType,
    id: string,
    newNames: string[],
  ): Promise<{ nodes: NodeItemDefinition[] }> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);
    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Check that the node exists and get its graph fingerprint
      const data = await this.getItemGraphFingerprint(tx, type, id);

      // Create the list of new nodes
      const newNodes = newNames.map((name) => ({ id: uuid(), name }));
      await this.neo4j.getTxFirstResultQuery(
        tx,
        /* cypher */ ` UNWIND $newNodes AS newNode
            CREATE (n:${Neo4jLabels[type]} { id: newNode.id, name: newNode.name, created: datetime(), updated: datetime() })
            WITH n 
              CALL(n) {
                UNWIND $inEdges as edge
                  MATCH (m) WHERE elementId(m) = edge.elementId
                  CREATE (m)-[:$(edge.type) { created: datetime(), updated: datetime() }]->(n)
              }
              CALL(n) {
                UNWIND $outEdges as edge
                  MATCH (m) WHERE elementId(m) = edge.elementId
                  CREATE (n)-[:$(edge.type) { created: datetime(), updated: datetime() }]->(m)
              }
            RETURN count(*) AS result`,
        { ...data, newNodes },
      );

      // Delete the current node: this action will flag all impacted messages
      await this.deleteNode(type, id, tx);

      // Commit
      await tx.commit();

      // return the list of node created
      return { nodes: newNodes.map((n) => ({ type, id: n.id })) };
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await session.close();
    }
  }

  /**
   * Reset a list of nodes to their import state
   */
  async resetNodes(_nodes: Array<{ type: ItemType; id: string }>): Promise<void> {
    throw Boom.notImplemented('Not implemented');
  }

  /**
   * Apply pending changes to ElasticSearch
   * returns number of indexed messages
   * */
  async indexPendingModifications(): Promise<number> {
    // Check lock node existence
    const lockNode = await this.getIndexingPendingModificationLockNode();
    if (lockNode !== null) {
      console.log(lockNode);
      throw new Error(
        `Can't index pending modification, an existing process is already running since ${lockNode}`,
      );
    }

    // create a indexation status node
    await this.neo4j.getFirstResultQuery(
      /* cypher */ `CREATE (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) SET n.startTime = $startTime RETURN 1 as result`,
      { startTime: new Date().toISOString() },
    );
    const messagesIds = await this.getMessageIdsWithPendingModifications();
    try {
      if (messagesIds && messagesIds.length > 0) {
        for (const messagesIdsBatch of chunk(messagesIds, config.elastic.updateBatchSize)) {
          await this.indexation.indexMessagesInCascade(messagesIdsBatch);
          // remove ToReIndex labels
          await this.neo4j.getFirstResultQuery<string[]>(
            /* cypher */ `UNWIND $messagesIds AS msgId
          MATCH (msg {id:msgId}) 
          REMOVE msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
          RETURN collect(msg.id) as result
        `,
            { messagesIds: messagesIdsBatch },
          );
        }
      }
    } finally {
      // make sure to delete lock node
      await this.neo4j.getFirstResultQuery(
        `MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) DELETE n RETURN count(n) AS result`,
        {},
      );
    }

    // return number of impacted messages
    return messagesIds?.length || 0;
  }

  async getMessageIdsWithPendingModifications(): Promise<string[]> {
    const messagesIds = await this.neo4j.getFirstResultQuery<string[]>(
      /* cypher */ `
        MATCH (msg:Message:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}) RETURN collect(msg.id) as result
      `,
      {},
    );
    return messagesIds || [];
  }

  getIndexingPendingModificationLockNode() {
    return this.neo4j.getFirstResultQuery<{ startTime: string }>(
      `MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) return n as result`,
      {},
    );
  }

  /**
   * Check if the item exists in the database, otherwise throw a not found error.
   */
  private async checkItemExists(type: ItemType, id: string): Promise<void> {
    const found = await this.neo4j.getFirstResultQuery<number>(
      `MATCH (n:${Neo4jLabels[type]} {id: $id}) RETURN count(*) AS result`,
      { id },
    );
    if (!found) throw Boom.notFound(`Node ${Neo4jLabels[type]} with id ${id} not found`);
  }

  /**
   * Compute the graph fingerprint of a node, ie. it's neo4j ID,  the list of in/out edges and its corresponding messages.
   */
  private async getItemGraphFingerprint(tx: Transaction, type: ItemType, id: string) {
    // Check that the node exists
    const data = await this.neo4j.getTxFirstResultQuery<{
      elementId: string;
      inEdges: Array<{ elementId: string; type: string }>;
      outEdges: Array<{ elementId: string; type: string }>;
      impactedMessages: string[];
    }>(
      tx,
      /* cypher */ ` MATCH (n:${Neo4jLabels[type]} { id: $id }) 
        RETURN {
          elementId: elementId(n),
          inEdges: [(n)<-[r]-(m) WHERE NOT coalesce(r.deleted, false) | { elementId: elementId(m), type: type(r) }],
          outEdges: [(n)-[r]->(m) WHERE NOT coalesce(r.deleted, false) | { elementId: elementId(m), type: type(r) }],
          impactedMessages: collect { MATCH (n)<-[r:CONTAINS]-(msg:Message) WHERE NOT coalesce(r.deleted, false) RETURN msg.id }
        } AS result`,
      { id },
    );
    if (!data) throw Boom.notFound(`Node ${Neo4jLabels[type]} with id ${id} not found`);
    return data;
  }
}
