import Boom from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { inject, singleton } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { type ItemType, Neo4jLabels } from '../../types';
import { Neo4j } from '../neo4j';

@singleton()
export class DatasetEdition {
  /**
   * Logger.
   */
  log = getLogger('DataSetEdition');

  /**
   * Default constructor.
   */
  constructor(@inject(Neo4j) public neo4j: Neo4j) {}

  /**
   * Create a new node of type `type` with name `name`,
   * linked to the message with id `messageId`.
   */
  async createNode(messageId: string, type: ItemType, name: string): Promise<void> {
    if (type === 'message') throw Boom.badRequest(`Cannot create node of type message`);

    const result = await this.neo4j.getFirstResultQuery(
      ` MATCH (n:Message {id: $messageId}) 
          CREATE (n)-[:CONTAINS]->(:${Neo4jLabels[type]} { id: $id, name: $name })
          RETURN  count(*) AS result`,
      { messageId, id: uuid(), name },
    );
    if (result !== 1)
      throw Boom.notFound(`Node ${Neo4jLabels['message']} with id ${messageId} not found`);
  }

  /**
   * Rename a node of type `type` with id `id`.
   */
  async renameNode(type: ItemType, id: string, name: string): Promise<void> {
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message`);

    const result = await this.neo4j.getFirstResultQuery<number>(
      ` MATCH (n:${Neo4jLabels[type]} { id: $id })
        SET n.name = $name
        RETURN  count(*) AS result`,
      { id, name },
    );
    if (result !== 1) throw Boom.notFound(`Node ${Neo4jLabels[type]}  with id ${id} not found`);
  }

  /**
   * Change the type of a node
   */
  async changeNodeType(type: ItemType, id: string, newType: ItemType): Promise<void> {
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);
    if (newType === 'message') throw Boom.badRequest(`Cannot change type to message`);

    const result = await this.neo4j.getFirstResultQuery<number>(
      ` MATCH (n:${Neo4jLabels[type]} { id: $id })
        REMOVE n:${Neo4jLabels[type]}
        SET n:${Neo4jLabels[newType]}
        RETURN  count(*) AS result`,
      { id },
    );
    if (result !== 1) throw Boom.notFound(`Node ${Neo4jLabels[type]}  with id ${id} not found`);
  }

  /**
   * Merge nodes into one.
   */
  async mergeNodes(
    nodes: Array<{ type: ItemType; id: string }>,
    targetType: ItemType,
    targetName: string,
  ): Promise<void> {
    if (nodes.some((n) => n.type === 'message'))
      throw Boom.badRequest(`Cannot do merge on message nodes`);
    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Check that all nodes exists in database and get their neo4j ids
      const nodeIds = await Promise.all(
        nodes.map(async (node) => {
          if (node.type === 'message') throw Boom.badRequest(`Cannot merge message node`);
          const nodeId = await this.neo4j.getTxFirstResultQuery<string>(
            tx,
            `MATCH (n:${Neo4jLabels[node.type]} { id: $id }) RETURN elementId(n) AS result`,
            { id: node.id },
          );
          if (nodeId === null)
            throw Boom.notFound(`Node ${Neo4jLabels[node.type]} with id ${node.id} not found`);
          return nodeId;
        }),
      );

      const targetNodeId = await this.neo4j.getTxFirstResultQuery<string>(
        tx,
        `CREATE (n:${Neo4jLabels[targetType]} { id: $id, name: $name }) RETURN elementId(n) AS result`,
        { id: uuid(), name: targetName },
      );

      // Merge the nodes
      await this.neo4j.getTxFirstResultQuery<number>(
        tx,
        `CALL apoc.refactor.mergeNodes($nodeIds, {properties:'discard', mergeRels:true}) YIELD node RETURN count(*) AS result`,
        { nodeIds: [targetNodeId, ...nodeIds] },
      );

      tx.commit();
    } catch (e) {
      tx.rollback();
      throw e;
    } finally {
      session.close();
    }
  }

  /**
   * Delete a node.
   */
  async deleteNode(type: ItemType, id: string): Promise<void> {
    throw Boom.notImplemented('Not implemented');
  }

  async resetNodes(nodes: Array<{ type: ItemType; id: string }>): Promise<void> {
    throw Boom.notImplemented('Not implemented');
  }
}
