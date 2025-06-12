import { readFileSync } from 'node:fs';
import * as path from 'path';
import { estypes } from '@elastic/elasticsearch';
import { delegateToSchema } from '@graphql-tools/delegate';
import { ExtractField } from '@graphql-tools/wrap';
import Boom from '@hapi/boom';
import { Filter } from '@ouestware/facets';
import { GraphQLResolveInfo, OperationTypeNode } from 'graphql';
import { capitalize, head } from 'lodash';

import { Services } from '../services';
import { DatasetEdition } from '../services/dataset/edition';
import { DatasetImport } from '../services/dataset/import';
import { DatasetIndexation } from '../services/dataset/indexation';
import { Elastic } from '../services/elastic';
import { EsIndices, Neo4jLabels, type ItemType } from '../types';
import { KeywordsFilter, Resolvers, SearchFilters, type NodeItem } from './generated/types';

export const typeDefs = readFileSync(path.resolve(__dirname, './schema.graphql'), 'utf8');

const datasetImport = Services.get(DatasetImport);
const datasetIndexation = Services.get(DatasetIndexation);
const datasetEdition = Services.get(DatasetEdition);
const elasticSearch = Services.get(Elastic);

/**
 * Delegate part of the graphql query to dynamically return NodeItems
 */
async function getGraphQlItems<T>(
  type: ItemType,
  ids: string[],
  ctx: T,
  info: GraphQLResolveInfo,
  fromQueryPath?: string[],
) {
  const query = `_get${capitalize(type)}Items`;

  // TODO: cast transforms correctly
  const transforms = fromQueryPath
    ? [
        // take the subfield `user` of this query and put it as root for delegate query
        new ExtractField({
          from: [query, 'results'],
          to: [query],
        }),
      ]
    : undefined;
  const data = await delegateToSchema({
    schema: info.schema,
    operation: 'query' as OperationTypeNode,
    fieldName: query,
    context: {
      ...ctx,
      cypherParams: { ids },
    },
    info: info,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    transforms,
  });
  return data
    ? data.map((d: object) => ({ __typename: Neo4jLabels[type], ...d }) as unknown as NodeItem)
    : undefined;
}

/**
 * Delegate part of the graphql query to dynamically a unique NodeItem
 */
async function getGraphQlItem<T>(
  type: ItemType,
  id: string,
  ctx: T,
  info: GraphQLResolveInfo,
): Promise<NodeItem | undefined> {
  const query = `_get${capitalize(type)}Items`;
  const data = await delegateToSchema({
    schema: info.schema,
    operation: 'query' as OperationTypeNode,
    fieldName: query,
    context: { ...ctx, cypherParams: { ids: [id] } },
    info: info,
  });
  const item = head(data);
  return item ? ({ __typename: Neo4jLabels[type], ...item } as unknown as NodeItem) : undefined;
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
    search: async (
      _root,
      { itemType, filters, sortBy, limit, from, scrollTimeout, includes },
      _context,
      _info,
    ) => {
      const sort = sortBy ? elasticSearch.formatSort(sortBy) : undefined;
      const transformedFilters = await datasetIndexation.formatFilters(filters);
      const { total, results, scrollId } = await elasticSearch.search(
        EsIndices[itemType as ItemType],
        includes || '',
        transformedFilters as Record<string, Filter>,
        {
          from,
          size: limit || 10,
          sort,
          sources: [],
          scrollTimeout,
          mapFn: (hit: estypes.SearchHit) => ({ id: hit._id }),
        },
      );
      const resultAugmented =
        results.length > 0
          ? await getGraphQlItems(
              itemType,
              results?.filter((r): r is { id: string } => r.id !== undefined).map((r) => r.id),
              _context,
              _info,
              ['results'],
            )
          : [];

      return {
        total,
        results: resultAugmented,
        scrollId,
      };
    },
    // SCROLL for paginating over more than 10k items
    scroll: async (_root, { itemType, scrollId, scrollTimeout }, _context, _info) => {
      const { total, results } = await elasticSearch.scroll(scrollId, {
        scrollTimeout,
        mapFn: (hit: estypes.SearchHit) => ({ id: hit._id }),
      });

      const resultAugmented = await getGraphQlItems(
        itemType,
        results.filter((r): r is { id: string } => r.id !== undefined).map((r) => r.id),
        _context,
        _info,
        ['results'],
      );

      return {
        total,
        results: resultAugmented,
        scrollId,
      };
    },

    // TOP
    aggregate: async (
      _root,
      { itemType, field, query, includes, filters, size },
      _context,
      _info,
    ) => {
      const formattedFilters = (await datasetIndexation.formatFilters(filters)) as Record<
        string,
        Filter
      >;
      const fieldFilter = formattedFilters[field as keyof SearchFilters] as
        | KeywordsFilter
        | undefined;
      const results = await elasticSearch.fieldAggregation({
        index: EsIndices[itemType],
        field,
        size,
        query,
        includes,
        includesValues: fieldFilter?.values,
        filters: formattedFilters,
      });
      if (fieldFilter?.values?.length) console.log(JSON.stringify(results, null, '  '));

      return datasetIndexation.formatAggregationResults(field, results);
    },

    // Pending modifications
    countItemsWithPendingModifications: async () => {
      return await datasetEdition.countItemsWithPendingModifications();
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
      await datasetEdition.renameNode(type, id, name);
      const data = await getGraphQlItem(type, id, context, info);
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
     * Delete a node
     */
    unlinkNode: async (_root, { type, id, messageId }) => {
      await datasetEdition.unlinkNode(type, id, messageId);
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
      const data = await getGraphQlItems(
        type,
        result.nodes.map((n) => n.id),
        context,
        info,
      );
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
    /**
     * Index pending mutations
     */
    indexPendingModifications: async () => {
      const report = await datasetEdition.indexPendingModifications();
      return report;
    },
    /**
     * Tags and verified
     */
    setNodeTags: async (_root, { type, id, tags }, context, info) => {
      await datasetEdition.updateNodeTagsVerified(type, id, { tags });
      const data = await getGraphQlItem(type, id, context, info);
      if (!data) throw Boom.internal(`Node ${type} ${id} not found`);
      return data;
    },
    setNodeVerified: async (_root, { type, id, verified }, context, info) => {
      await datasetEdition.updateNodeTagsVerified(type, id, { verified });
      const data = await getGraphQlItem(type, id, context, info);
      if (!data) throw Boom.internal(`Node ${type} ${id} not found`);
      return data;
    },
  },
};
