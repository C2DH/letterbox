import * as path from 'path';
import { delegateToSchema } from '@graphql-tools/delegate';
import Boom, { notImplemented } from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { GraphQLResolveInfo, OperationTypeNode } from 'graphql';
import { head } from 'lodash';
import { readFileSync } from 'node:fs';

import { Services } from '../services';
import { DatasetEdition } from '../services/dataset/edition';
import { DatasetImport } from '../services/dataset/import';
import { DatasetIndexation } from '../services/dataset/indexation';
import { type ItemType, Neo4jLabels } from '../types';
import { type NodeItem, Resolvers } from './generated/types';

export const typeDefs = readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf8');

const log = getLogger('GraphQl');
const datasetImport = Services.get(DatasetImport);
const datasetIndexation = Services.get(DatasetIndexation);
const datasetEdition = Services.get(DatasetEdition);

/**
 * Deletegate part of the graphql query to dynamically return NodeItems
 */
async function getGraphQlItems<T>(
  nodes: Array<{ type: ItemType; id: string }>,
  ctx: T,
  info: GraphQLResolveInfo,
) {
  const data = await delegateToSchema({
    schema: info.schema,
    operation: 'query' as OperationTypeNode,
    fieldName: '_getNodesItem',
    context: {
      ...ctx,
      cypherParams: { nodes: nodes.map((n) => ({ ...n, type: Neo4jLabels[n.type] })) },
    },
    info: info,
  });

  return data as unknown as NodeItem[];
}

/**
 * Deletegate part of the graphql query to dynamically a unique NodeItem
 */
async function getGraphQlItem<T>(
  type: ItemType,
  id: string,
  ctx: T,
  info: GraphQLResolveInfo,
): Promise<NodeItem | undefined> {
  const data = await delegateToSchema({
    schema: info.schema,
    operation: 'query' as OperationTypeNode,
    fieldName: '_getNodesItem',
    context: { ...ctx, cypherParams: { nodes: [{ id, type: Neo4jLabels[type] }] } },
    info: info,
  });
  return head(data);
}

/**
 * GraphQL schema resolvers
 */
export const resolvers: Resolvers<unknown> = {
  NodeItem: {
    __resolveType(obj, _contextValue, _info) {
      // on union, neo4j add a `__resolveType` field
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (obj as any)['__resolveType'] || obj['__typename'];
    },
  },
  Query: {
    // SEARCH
    searchMessage: async (_root, { filters, sortBy, limit, from }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      throw notImplemented();
    },
    searchCompany: async (_root, { filters, sortBy, limit, from }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      throw notImplemented();
    },
    searchPeople: async (_root, { filters, sortBy, limit, from }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      throw notImplemented();
    },
    searchAddress: async (_root, { filters, sortBy, limit, from }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      throw notImplemented();
    },
    searchCountry: async (_root, { filters, sortBy, limit, from }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      throw notImplemented();
    },
    // COUNT
    countMessage: async (_root, { filters, byYear }, _context, _info) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      throw notImplemented();
    },
    countCompany: async (_root, { filters, byYear }, _context, _info) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      throw notImplemented();
    },
    countPeople: async (_root, { filters, byYear }, _context, _info) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      throw notImplemented();
    },
    countAddress: async (_root, { filters, byYear }, _context, _info) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      throw notImplemented();
    },
    countCountry: async (_root, { filters, byYear }, _context, _info) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      throw notImplemented();
    },
    // TOP
    topMessageMetadata: async (_root, { metadataModel, filters, limit }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      throw notImplemented();
    },
    topCompanyMetadata: async (_root, { metadataModel, filters, limit }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      throw notImplemented();
    },
    topPeopleMetadata: async (_root, { metadataModel, filters, limit }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      throw notImplemented();
    },
    topAddressMetadata: async (_root, { metadataModel, filters, limit }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      throw notImplemented();
    },
    topCountryMetadata: async (_root, { metadataModel, filters, limit }, _context, _info) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      throw notImplemented();
    },
  },
  Mutation: {
    import: async (_root, { fileNamePattern }, _context, _info) => {
      const reFileNamePattern: RegExp | undefined = fileNamePattern
        ? new RegExp(fileNamePattern, 'i')
        : undefined;
      return await datasetImport.doImport(reFileNamePattern);
    },
    index: async () => {
      return await datasetIndexation.doIndexation();
    },

    /**
     * Create a new node on the specified messageparams.
     */
    createNode: async (_root, { messageId, type, name }, context, info) => {
      const node = await datasetEdition.createNode(messageId, type, name);
      const data = await getGraphQlItem(node.type, node.id, context, info);
      if (!data) throw Boom.internal(`Node ${type} ${node.id} not found`);
      return data;
    },

    /**
     * Rename a node value
     */
    renameNode: async (_root, { type, id, name }, context, info) => {
      const node = await datasetEdition.renameNode(type, id, name);
      const data = await getGraphQlItem(node.type, node.id, context, info);
      if (!data) throw Boom.internal(`Node ${type} ${id} not found`);
      return data;
    },

    /**
     * Delete a node
     */
    deleteNode: async (_root, { type, id }) => {
      await datasetEdition.deleteNode(type, id);
      return true;
    },

    /**
     * Change node's type
     */
    changeType: async (_root, { type, id, newType }, context, info) => {
      const node = await datasetEdition.changeNodeType(type, id, newType);
      const data = await getGraphQlItem(newType, node.id, context, info);
      if (!data) throw Boom.internal(`Node ${type} ${id} not found`);
      return data;
    },

    /**
     * Split a node
     */
    splitNode: async (_root, { type, id, values }, context, info) => {
      const result = await datasetEdition.splitNode(type, id, values);
      const data = await getGraphQlItems(result.nodes, context, info);
      if (data.length !== values.length)
        throw Boom.internal(`Split in ${values.length} nodes but got ${data.length}`);
      return data;
    },

    /**
     * Merge nodes
     */
    mergeNodes: async (__DirectiveLocation, { nodes, type, name }, context, info) => {
      const node = await datasetEdition.mergeNodes(nodes, type, name);
      const data = await getGraphQlItem(node.type, node.id, context, info);
      if (!data) throw Boom.internal(`Node ${type} ${name} not found`);
      return data;
    },
  },
};
