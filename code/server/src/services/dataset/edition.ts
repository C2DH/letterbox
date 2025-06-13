import Boom from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { flatten, isNil, uniq } from 'lodash';
import type { Transaction } from 'neo4j-driver';
import * as neo4j from 'neo4j-driver';
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

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Create the node
      const nodeId = uuid();
      const result = await this.neo4j.getTxFirstResultQuery<number>(
        tx,
        ` MATCH (m:Message {id: $messageId}) 
          CREATE (n:${Neo4jLabels[type]} { id: $id, name: $name, created: datetime(), updated: datetime() }) 
          CREATE (m)-[:CONTAINS { created: datetime(), updated: datetime() }]->(n)
          RETURN 1 as result`,
        { messageId, id: nodeId, name },
      );
      if (!result) throw Boom.notFound(`Failed to create ${type}: message ${messageId} not found`);
      await this.markMessagesForReIndexing(tx, [messageId]);
      await tx.commit();
      return { type, id: nodeId };
    } catch (e) {
      tx.rollback();
      throw Boom.internal(`Failed to create ${type} with name ${name}`, e);
    } finally {
      await tx.close();
      await session.close();
    }
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

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Link nodes
      const result = await this.neo4j.getTxFirstResultQuery<number>(
        tx,
        ` MATCH (m:Message {id: $messageId}) 
          MATCH (n:${Neo4jLabels[type]} {id: $id}) 
          MERGE (m)-[r:CONTAINS]->(n)
            ON CREATE SET 
              r.created = datetime(), 
              r.updated = datetime()
          RETURN 1 as result`,
        { messageId, id },
      );
      if (!result) throw Boom.notFound(`Failed to create ${type}: message ${messageId} not found`);
      await this.markMessagesForReIndexing(tx, [messageId]);
      await tx.commit();
    } catch (e) {
      tx.rollback();
      throw Boom.internal(`Failed to link ${type}/${id} on message ${messageId}`, e);
    } finally {
      await tx.close();
      await session.close();
    }
  }

  /**
   * Rename a node of type `type` with id `id`.
   */
  async renameNode(type: ItemType, id: string, name: string): Promise<void> {
    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message`);
    await this.checkItemExists(type, id);

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Rename the node
      const result = await this.neo4j.getTxFirstResultQuery<string[]>(
        tx,
        ` MATCH (n:${Neo4jLabels[type]} { id: $id })
          SET n.name = $name,
            n.updated = datetime()
          WITH n
            MATCH (n)<-[rm:CONTAINS]-(msg:Message) WHERE NOT coalesce(rm.deleted, false) 
            RETURN collect(distinct msg.id) AS result`,
        { id, name },
      );
      if (result) await this.markMessagesForReIndexing(tx, result);
      await tx.commit();
      await this.updateNodesInMainIndex([{ type, id }]);
    } catch (e) {
      tx.rollback();
      throw Boom.internal(`Failed to renameNode ${type}/${id} with name ${name}`, e);
    } finally {
      await tx.close();
      await session.close();
    }
  }

  /**
   * Change the type of a node
   */
  async changeNodeType(type: ItemType, id: string, newType: ItemType): Promise<NodeItemDefinition> {
    this.log.debug('Changing node type', { type, id, newType });

    // Some checks
    if (type === 'message') throw Boom.badRequest(`Cannot change type of a message node`);
    if (newType === 'message') throw Boom.badRequest(`Cannot change type to message`);

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Check that the node exists and get its graph fingerprint
      const data = await this.getItemGraphFingerprint(tx, type, id);

      // Create the new node with the new type
      const newNode = { id: uuid(), name: data.name, otherNames: data.otherNames };
      await this.neo4j.getTxFirstResultQuery(
        tx,
        ` CREATE (n:${Neo4jLabels[newType]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag} { 
              id: $newNode.id, 
              name: $newNode.name, 
              otherNames: $newNode.otherNames, 
              created: datetime(), 
              updated: datetime() 
            })
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
        { ...data, newNode },
      );

      // Delete the current node: this action will flag all impacted messages
      await this.deleteNode(type, id, tx);

      // Commit
      await tx.commit();
      await this.updateNodesInMainIndex([
        { type: newType, id: newNode.id },
        { type, id },
      ]);

      return { type: newType, id: newNode.id };
    } catch (e) {
      tx.rollback();
      throw Boom.internal(`Failed to changeNodeType ${type}/${id} with new type ${type}`, e);
    } finally {
      await tx.close();
      await session.close();
    }
  }

  /**
   * Unlink a node from a message.
   */
  async unlinkNode(type: ItemType, id: string, messageId: string): Promise<void> {
    this.log.debug('Unlik  node from message', { type, id, messageId });

    // Some checks
    if (type === 'message') throw Boom.badRequest(`Deleting a message node is not allowed`);
    await this.checkItemExists(type, id);
    await this.checkItemExists('message', messageId);

    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Unlink the node
      await this.neo4j.getTxFirstResultQuery(
        tx,
        ` MATCH (n:${Neo4jLabels[type]} { id: $id })<-[r:CONTAINS]-(m:Message { id: $messageId }) 
          SET r.deleted = true, 
              r.updated = datetime()
          RETURN 1 as result`,
        { id, messageId },
      );
      await this.markMessagesForReIndexing(tx, [messageId]);
      await tx.commit();
      await this.updateNodesInMainIndex([
        { type, id },
        { type: 'message', id: messageId },
      ]);
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await tx.close();
      await session.close();
    }
  }

  /**
   * Delete a node.
   */
  async deleteNode(type: ItemType, id: string, tx?: Transaction): Promise<void> {
    this.log.debug('Deleting node', { type, id });

    // Some checks
    if (type === 'message') throw Boom.badRequest(`Deleting a message node is not allowed`);
    await this.checkItemExists(type, id);

    // Delete the node
    const query = `
      MATCH (n:${Neo4jLabels[type]} { id: $id }) 
      SET n.deleted = true,
          n.updated = datetime()
      WITH n
        MATCH (n)<-[rm:CONTAINS]-(msg:Message) WHERE NOT coalesce(rm.deleted, false)
        SET rm.deleted = true, 
            rm.updated = datetime()
        RETURN collect(distinct msg.id) as result`;

    const session = this.neo4j.getWriteSession();
    let currentTx: Transaction | undefined = tx;
    if (!currentTx) {
      currentTx = await session.beginTransaction();
    }
    try {
      const result = await this.neo4j.getTxFirstResultQuery<string[]>(currentTx, query, { id });
      if (result) await this.markMessagesForReIndexing(currentTx, result);
      if (!tx) {
        await currentTx.commit();
        await this.updateNodesInMainIndex([{ type, id }]);
      }
    } catch (e) {
      if (!tx) currentTx.rollback();
      throw Boom.internal(`Failed to delete ${type}/${id}`, e);
    } finally {
      if (!tx) await currentTx.close();
      await session.close();
    }
  }

  /**
   * Merge nodes into one.
   */
  async mergeNodes(
    nodes: Array<{ type: ItemType; id: string }>,
    targetType: ItemType,
    targetName: string,
  ): Promise<NodeItemDefinition> {
    this.log.debug('Merge nodes', { nodes, targetType, targetName });

    // Some checks
    if (nodes.some((n) => n.type === 'message'))
      throw Boom.badRequest(`Merging message node is not allowed`);

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
      this.log.debug(
        ` CREATE (n:${Neo4jLabels[targetType]} { 
            id: $id, 
            name: $name, 
            otherNames: $otherNames, 
            created: datetime(), 
            updated: datetime() 
          }) 
          SET n:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
          RETURN elementId(n) AS result`,
        {
          id: targetId,
          name: targetName,
          otherNames: uniq(
            flatten(mergeData.map((n) => n.otherNames || [].filter((n) => !isNil(n)))),
          ),
        },
      );
      const targetElementId = await this.neo4j.getTxFirstResultQuery<string>(
        tx,
        ` CREATE (n:${Neo4jLabels[targetType]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag} { 
            id: $id, 
            name: $name, 
            otherNames: $otherNames, 
            created: datetime(), 
            updated: datetime() 
          }) 
          RETURN elementId(n) AS result`,
        {
          id: targetId,
          name: targetName,
          otherNames: uniq(flatten(mergeData.map((n) => n.otherNames))),
        },
      );
      this.log.debug(`targetElementId`, { targetElementId });

      // Merge the nodes into the target one
      await this.neo4j.getTxFirstResultQuery<string[]>(
        tx,
        ` MATCH (n) WHERE elementId(n) = $targetElementId
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
      this.log.debug(`Links created`);

      await tx.commit();
      await this.updateNodesInMainIndex([...nodes, { type: targetType, id: targetId }]);

      // Returned the created merged node
      return { type: targetType, id: targetId };
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await tx.close();
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
    this.log.debug('Split node', { type, id, newNames });

    // Some checks
    if (type === 'message') throw Boom.badRequest(`Splitting a message node is not allowed`);
    const session = this.neo4j.getWriteSession();
    const tx = session.beginTransaction();
    try {
      // Check that the node exists and get its graph fingerprint
      const data = await this.getItemGraphFingerprint(tx, type, id);

      // Create the list of new nodes
      const newNodes = newNames.map((name) => ({ id: uuid(), name }));
      await this.neo4j.getTxFirstResultQuery(
        tx,
        ` UNWIND $newNodes AS newNode
            CREATE (n:${Neo4jLabels[type]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag} { 
              id: newNode.id, 
              name: newNode.name, 
              otherNames: $otherNames, 
              created: datetime(), 
              updated: datetime() 
            })
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
      await this.updateNodesInMainIndex([
        { type, id },
        ...newNodes.map((n) => ({ type, id: n.id })),
      ]);

      // return the list of node created
      return { nodes: newNodes.map((n) => ({ type, id: n.id })) };
    } catch (e) {
      await tx.rollback();
      throw e;
    } finally {
      await tx.close();
      await session.close();
    }
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
    this.log.debug(`start indexation task for ${nbItems}`);
    // create a indexation status node
    const idLock = await this.neo4j.getFirstResultQuery(
      `
      CREATE (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) 
      SET n = {
        startTime: $startTime, 
        nbItems: $nbItems
      } 
      RETURN id(n) as result`,
      { startTime: new Date().toISOString(), nbItems },
    );
    const removeToBeIndexFlag = (itemType: ItemType) => async (ids: string[]) => {
      await this.neo4j.getFirstResultQuery<void>(
        `
        MATCH (item:${Neo4jLabels[itemType]}:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag})
        WHERE  item.id IN $ids
        WITH collect(distinct item) AS items
          CALL apoc.lock.nodes(items)
          UNWIND items AS item
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
            ` MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification})
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
      this.log.debug(`indexation ${idLock} task done`);
      await this.releaseIndexingPendingModificationLockNode();
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

  async releaseIndexingPendingModificationLockNode() {
    await this.neo4j.getFirstResultQuery(
      ` MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) 
        DELETE n 
        RETURN 1 AS result`,
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
      ` MATCH (n:${Neo4jLabels[type]} {id:$id})
        SET n += $props
        RETURN 1 as result
      `,
      { id, props },
    );

    // update ES index
    await this.indexation.updateNode(type, id, props);
  }

  private getIndexingPendingModificationLockNode() {
    return this.neo4j.getFirstResultQuery<{ startTime: string }>(
      ` MATCH (n:${Neo4jLabelsPendingModificationsLabels.IndexingPendingModification}) 
        RETURN n as result`,
      {},
    );
  }

  /**
   * Given a list of nodes (ie. type+id), query the database to retrieve the latest value and then index them.
   */
  private async updateNodesInMainIndex(nodes: Array<{ type: ItemType; id: string }>) {
    this.log.debug(`Indexing ${nodes.length} nodes`);
    const nodesByTypes = nodes.reduce(
      (acc, node) => {
        if (!acc[node.type]) {
          acc[node.type] = [];
        }
        acc[node.type].push(node.id);
        return acc;
      },
      {} as Record<ItemType, string[]>,
    );
    if (nodesByTypes['address']?.length > 0) {
      await this.indexation.indexAddresses(nodesByTypes['address']);
    }
    if (nodesByTypes['company']?.length > 0) {
      await this.indexation.indexCompanies(nodesByTypes['company']);
    }
    if (nodesByTypes['country']?.length > 0) {
      await this.indexation.indexCountries(nodesByTypes['country']);
    }
    if (nodesByTypes['person']?.length > 0) {
      await this.indexation.indexPeople(nodesByTypes['person']);
    }
  }

  /**
   * Given a list of message IDs, mark them as needing re-indexing.
   * To avoid deadlocks, we first collect all messages plus impacted elements and we lock them all,
   * then we set the flag.
   *
   * @param tx
   * @param messageIds
   * @returns
   */
  private async markMessagesForReIndexing(
    tx: neo4j.Transaction,
    messageIds: string[],
  ): Promise<void> {
    this.log.debug(`Marking ${messageIds.length} messages for re-indexing`);
    if (messageIds.length === 0) return;
    await this.neo4j.getTxResultQuery(
      tx,
      `
      MATCH (m:Message) WHERE m.id IN $messageIds
      OPTIONAL MATCH (m)-[r:CONTAINS]->(e) WHERE NOT coalesce(r.deleted, false) 
      WITH collect(m) AS messages, collect(distinct e) AS impacted 
      WITH apoc.coll.toSet(messages + impacted) AS toReIndex
          CALL apoc.lock.nodes(toReIndex)
          UNWIND toReIndex AS item
            SET item:${Neo4jLabelsPendingModificationsLabels.ToReIndexFlag}
            RETURN 1 as result
      `,
      { messageIds },
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
      name: string;
      otherNames: string[];
      inEdges: Array<{ elementId: string; type: string }>;
      outEdges: Array<{ elementId: string; type: string }>;
      impactedMessages: string[];
    }>(
      tx,
      ` MATCH (n:${Neo4jLabels[type]} { id: $id }) 
        RETURN {
          elementId: elementId(n),
          name: n.name,
          otherNames: coalesce(n.otherNames, []),
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
