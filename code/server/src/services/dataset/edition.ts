import Boom from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import type { Transaction } from 'neo4j-driver';
import { inject, singleton } from 'tsyringe';
import { v4 as uuid } from 'uuid';

import { NodeItem } from '../../graphql/generated/types';
import {
  ImportReport,
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
        WITH m 
          OPTIONAL MATCH (m)-[r:CONTAINS]->(e) WHERE NOT coalesce(r.deleted, false) 
          SET e:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}        
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
        WITH m
          OPTIONAL MATCH (m)-[r:CONTAINS]->(e) WHERE NOT coalesce(r.deleted, false) 
          SET e:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
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
          MATCH (n)<-[rm:CONTAINS]-(msg:Message)-[re:CONTAINS]->(e) WHERE NOT coalesce(rm.deleted, false) AND NOT coalesce(re.deleted, false) 
          SET msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
          SET e:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
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
          MATCH (n)<-[rm:CONTAINS]-(msg:Message)-[re:CONTAINS]->(e) WHERE NOT coalesce(rm.deleted, false) AND NOT coalesce(re.deleted, false) 
          SET msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
          SET e:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
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
        MATCH (n)<-[rm:CONTAINS]-(msg:Message)-[re:CONTAINS]->(e) WHERE NOT coalesce(rm.deleted, false) AND NOT coalesce(re.deleted, false) 
        SET msg:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
        SET e:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
        SET rm.deleted = true, rm.updated = datetime()
        RETURN 1 AS result`;
    console.debug(query);
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
          // delete the node: this action will flag all impacted items
          await this.deleteNode(nodeDef.type, nodeDef.id, tx);
          return data;
        }),
      );

      // Create the target node
      const targetId = uuid();
      const targetElementId = await this.neo4j.getTxFirstResultQuery<string>(
        tx,
        /*cypher*/ `CREATE (n:${Neo4jLabels[targetType]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag} { id: $id, name: $name, created: datetime(), updated: datetime() }) RETURN elementId(n) AS result`,
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
            CREATE (n:${Neo4jLabels[type]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag} { id: newNode.id, name: newNode.name, created: datetime(), updated: datetime() })
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
  async indexPendingModifications() {
    // Check lock node existence
    const lockNode = await this.getIndexingPendingModificationLockNode();
    if (lockNode !== null) {
      throw new Error(
        `Can't index pending modification, an existing process is already running since ${lockNode}`,
      );
    }
    const nbItems = await this.countItemsWithPendingModifications();
    console.debug(`start indexation task for ${nbItems}`);
    // create a indexation status node
    const idLock = await this.neo4j.getFirstResultQuery(
      /* cypher */ `CREATE (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) SET n= {startTime: $startTime, nbItems: $nbItems} RETURN id(n) as result`,
      { startTime: new Date().toISOString(), nbItems },
    );
    const removeToBeIndexFlag = (itemType: ItemType) => async (ids: string[]) => {
      await this.neo4j.getFirstResultQuery<void>(
        /* cypher */ `
        MATCH (item:${Neo4jLabels[itemType]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag})
        WHERE  item.id IN $ids
        WITH item
        REMOVE item:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
        RETURN 1 as result
        `,
        { ids },
      );
      this.log.debug(`indexation ${idLock}: marked ${ids.length} items as indexed`);
    };
    let nbItemsModifiedDuringProcess: number | undefined = undefined;
    const reports: Partial<Record<ItemType, ImportReport>> = {};
    try {
      // in case items were modified during the process we check at the end if there are new cases to treat
      // is yes we loop
      while (nbItemsModifiedDuringProcess !== 0) {
        const messagesReport = await this.indexation.indexMessages(
          undefined,
          true,
          removeToBeIndexFlag('message'),
          5000,
        );
        reports.message = {
          count: reports.message?.count || 0 + messagesReport.count,
          errors: [...(reports.message?.errors || []), ...messagesReport.errors],
        };

        const companiesReport = await this.indexation.indexCompanies(
          undefined,
          true,
          removeToBeIndexFlag('company'),
          1000,
        );
        reports.company = {
          count: reports.company?.count || 0 + companiesReport.count,
          errors: [...(reports.company?.errors || []), ...companiesReport.errors],
        };

        const peopleReport = await this.indexation.indexPeople(
          undefined,
          true,
          removeToBeIndexFlag('person'),
          100,
        );
        reports.person = {
          count: reports.person?.count || 0 + peopleReport.count,
          errors: [...(reports.person?.errors || []), ...peopleReport.errors],
        };

        const addressesReport = await this.indexation.indexAddresses(
          undefined,
          true,
          removeToBeIndexFlag('address'),
          1000,
        );
        reports.address = {
          count: reports.address?.count || 0 + addressesReport.count,
          errors: [...(reports.address?.errors || []), ...addressesReport.errors],
        };

        const countriesReports = await this.indexation.indexCountries(
          undefined,
          true,
          removeToBeIndexFlag('country'),
          5,
        );
        reports.country = {
          count: reports.country?.count || 0 + countriesReports.count,
          errors: [...(reports.country?.errors || []), ...countriesReports.errors],
        };

        // how many items were modified during the process
        nbItemsModifiedDuringProcess = await this.countItemsWithPendingModifications();
        if (nbItemsModifiedDuringProcess > 0) {
          this.log.info(
            `Indexation process restarting for ${nbItemsModifiedDuringProcess} new modified items`,
          );
          //update total cases in lock node
          await this.neo4j.getFirstResultQuery(
            /* cypher */ `MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification})
            WHERE id(n) = $idLock 
            // total is to the new total number of items to process. Progress bar will be reset to 0...
            // to do better it would require ro update the lock nbItems total after each edit action if a lock exist
            // but so far we just tag items we don't count them
            // anyway having a precise count is going to be tedious as items can be affected multiple times by edits
            // therefore we will leave that not-ideal solution as is for now
            SET n.nbItems =  $nbItemsModifiedDuringProcess
            RETURN 1 as result`,
            { idLock, nbItemsModifiedDuringProcess },
          );
        }
      }
    } catch (error) {
      this.log.error(error + '');
    } finally {
      // make sure to delete lock node
      // TODO: should we keep this node for log?
      console.debug(`indexation ${idLock} task done`);
      await this.neo4j.getFirstResultQuery(
        `MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) DELETE n RETURN 1 AS result`,
        {},
      );
    }
    // return number of impacted items by itemType
    return reports;
  }

  async countItemsWithPendingModifications(): Promise<number> {
    const nbItems = await this.neo4j.getFirstResultQuery<number>(
      /* cypher */ `
        MATCH (i:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag})
        RETURN count(i) as result
      `,
      {},
    );
    return nbItems || 0;
  }

  getIndexingPendingModificationLockNode() {
    return this.neo4j.getFirstResultQuery<{ startTime: string }>(
      `MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) return n as result`,
      {},
    );
  }

  /**
   * Set Node tags
   */
  async updateNodeTagsVerified(
    type: ItemType,
    id: string,
    props: Partial<Pick<NodeItem, 'tags' | 'verified'>>,
  ) {
    await this.neo4j.getFirstResultQuery(
      `MATCH (n:${Neo4jLabels[type]} {id:$id})
      SET n += $props
      RETURN 1 as result
      `,
      { id, props },
    );
    // update ES index
    await this.indexation.updateNode(type, id, props);
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
