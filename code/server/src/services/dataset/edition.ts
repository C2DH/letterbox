import Boom from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import type { Transaction } from 'neo4j-driver';
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
  async createNode(
    messageId: string,
    type: ItemType,
    name: string,
  ): Promise<{ type: ItemType; id: string; impactedMessages: string[] }> {
    if (type === 'message') throw Boom.badRequest(`Cannot create node of type message`);

    const nodeId = uuid();
    const impactedMessages = await this.neo4j.getFirstResultQuery<string[]>(
      ` MATCH (m:Message {id: $messageId}) 
          CREATE (m)-[:CONTAINS]->(n:${Neo4jLabels[type]} { id: $id, name: $name })
          RETURN  collect { MATCH (n)<-[:CONTAINS { deleted:false }]-(msg:Message) RETURN msg.id } AS result`,
      { messageId, id: nodeId, name },
    );
    if (!impactedMessages)
      throw Boom.notFound(`Node ${Neo4jLabels['message']} with id ${messageId} not found`);

    return { type, id: nodeId, impactedMessages };
  }

  /**
   * Attached a node of type `type` with name `name`,
   * linked to the message with id `messageId`.
   */
  async linkNode(
    messageId: string,
    type: ItemType,
    id: string,
  ): Promise<{ type: ItemType; id: string; impactedMessages: string[] }> {
    if (type === 'message') throw Boom.badRequest(`Cannot link a node of type message`);

    const impactedMessages = await this.neo4j.getFirstResultQuery<string[]>(
      ` MATCH (m:Message {id: $messageId}) 
        MATCH (n:${Neo4jLabels[type]} {id: $id}) 
        MERGE (m)-[:CONTAINS]->(n)
        RETURN  collect { MATCH (n)<-[:CONTAINS { deleted:false }]-(msg:Message) RETURN msg.id } AS result`,
      { messageId, id },
    );
    if (!impactedMessages)
      throw Boom.notFound(`Node ${Neo4jLabels['message']} with id ${messageId} not found`);

    return { type, id, impactedMessages };
  }

  /**
   * Rename a node of type `type` with id `id`.
   */
  async renameNode(
    type: ItemType,
    id: string,
    name: string,
  ): Promise<{ type: ItemType; id: string; impactedMessages: string[] }> {
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message`);

    const impactedMessages = await this.neo4j.getFirstResultQuery<string[]>(
      ` MATCH (n:${Neo4jLabels[type]} { id: $id })
        SET n.name = $name
        RETURN  collect { MATCH (n)<-[:CONTAINS { deleted:false }]-(msg:Message) RETURN msg.id } AS result`,
      { id, name },
    );
    if (!impactedMessages)
      throw Boom.notFound(`Node ${Neo4jLabels[type]}  with id ${id} not found`);

    return { type, id, impactedMessages };
  }

  /**
   * Change the type of a node
   */
  async changeNodeType(
    type: ItemType,
    id: string,
    newType: ItemType,
  ): Promise<{ type: ItemType; id: string; impactedMessages: string[] }> {
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);
    if (newType === 'message') throw Boom.badRequest(`Cannot change type to message`);

    const impactedMessages = await this.neo4j.getFirstResultQuery<string[]>(
      ` MATCH (n:${Neo4jLabels[type]} { id: $id })
        REMOVE n:${Neo4jLabels[type]}
        SET n:${Neo4jLabels[newType]}
        RETURN  collect { MATCH (n)<-[:CONTAINS { deleted:false }]-(msg:Message) RETURN msg.id } AS result`,
      { id },
    );
    if (!impactedMessages)
      throw Boom.notFound(`Node ${Neo4jLabels[type]}  with id ${id} not found`);

    return { type, id, impactedMessages };
  }

  /**
   * Delete a node.
   */
  async deleteNode(
    type: ItemType,
    id: string,
    tx?: Transaction,
  ): Promise<{ impactedMessages: string[] }> {
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);

    const query = `
      MATCH (n:${Neo4jLabels[type]} { id: $id }) SET n.deleted = true WITH n
      OPTIONAL MATCH (n)-[r]-() SET r.deleted = true
      RETURN count(*) AS result`;

    const impactedMessages = await (tx
      ? this.neo4j.getTxFirstResultQuery<string[]>(tx, query, { id })
      : this.neo4j.getFirstResultQuery<string[]>(query, { id }));

    if (!impactedMessages)
      throw Boom.notFound(`Node ${Neo4jLabels[type]}  with id ${id} not found`);

    return { impactedMessages };
  }

  /**
   * Merge nodes into one.
   */
  async mergeNodes(
    nodes: Array<{ type: ItemType; id: string }>,
    targetType: ItemType,
    targetName: string,
  ): Promise<{ type: ItemType; id: string; impactedMessages: string[] }> {
    if (nodes.some((n) => n.type === 'message'))
      throw Boom.badRequest(`Cannot do merge on message nodes`);

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Check that all nodes exists in database and get their neo4j ids
      const nodeElementIds = await Promise.all(
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

      const targetId = uuid();
      const targetElementId = await this.neo4j.getTxFirstResultQuery<string>(
        tx,
        `CREATE (n:${Neo4jLabels[targetType]} { id: $id, name: $name }) RETURN elementId(n) AS result`,
        { id: targetId, name: targetName },
      );

      // Merge the nodes
      const impactedMessages = await this.neo4j.getTxFirstResultQuery<string[]>(
        tx,
        ` MATCH (n) WHERE elementId(n) IN $nodeIds
          WITH 
            collect(n) AS nodes,
            collect { MATCH (n)<-[:CONTAINS { deleted:false }]-(msg:Message) RETURN msg.id } AS impactedMessages
            
              CALL apoc.refactor.mergeNodes(nodes, {properties:'discard', mergeRels:true}) YIELD node 
              RETURN impactedMessages AS result`,
        { nodeIds: [targetElementId, ...nodeElementIds] },
      );

      await tx.commit();

      // Returned the created merged node
      return { type: targetType, id: targetId, impactedMessages: impactedMessages ?? [] };
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
  ): Promise<{ nodes: Array<{ type: ItemType; id: string }>; impactedMessages: string[] }> {
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Check that the node exists
      const data = await this.neo4j.getTxFirstResultQuery<{
        elementId: string;
        inEdges: Array<{ elementId: string; type: string }>;
        outEdges: Array<{ elementId: string; type: string }>;
        impactedMessages: string[];
      }>(
        tx,
        ` MATCH (n:${Neo4jLabels[type]} { id: $id }) 
          RETURN {
            elementId: elementId(n),
            inEdges: [(n)<-[r]-(m) WHERE NOT coalesce(r.deleted, false) | { elementId: elementId(m), type: type(r) }],
            outEdges: [(n)-[r]->(m) WHERE NOT coalesce(r.deleted, false) | { elementId: elementId(m), type: type(r) }],
            impactedMessages: collect { MATCH (n)<-[:CONTAINS { deleted:false }]-(msg:Message) RETURN msg.id }
          } AS result`,
        { id },
      );
      if (!data) throw Boom.notFound(`Node ${Neo4jLabels[type]} with id ${id} not found`);

      // Create the list of new nodes
      const newNodes = newNames.map((name) => ({ id: uuid(), name }));
      await this.neo4j.getTxFirstResultQuery(
        tx,
        ` UNWIND $newNodes AS newNode
            CREATE (n:${Neo4jLabels[type]} { id: newNode.id, name: newNode.name })
            WITH n 
              CALL(n) {
                UNWIND $inEdges as edge
                  MATCH (m) WHERE elementId(m) = edge.elementId
                  CREATE (m)-[:$(edge.type)]->(n)
              }
                  CALL(n) {
                UNWIND $outEdges as edge
                  MATCH (m) WHERE elementId(m) = edge.elementId
                  CREATE (n)-[:$(edge.type)]->(m)
              }
            RETURN count(*) AS result`,
        { ...data, newNodes },
      );

      // Delete the current node
      await this.deleteNode(type, id, tx);

      // Commit
      await tx.commit();

      // return the list of node created
      return {
        nodes: newNodes.map((n) => ({ type, id: n.id })),
        impactedMessages: data.impactedMessages,
      };
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
}
