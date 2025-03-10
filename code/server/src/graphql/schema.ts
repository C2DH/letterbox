import { delegateToSchema } from '@graphql-tools/delegate';
import { IResolvers } from '@graphql-tools/utils';
import { notImplemented } from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { GraphQLObjectType, GraphQLResolveInfo, OperationTypeNode } from 'graphql';
import gql from 'graphql-tag';
import { head } from 'lodash';

import { Services } from '../services';
import { DatasetEdition } from '../services/dataset/edition';
import { DatasetImport } from '../services/dataset/import';
import { DatasetIndexation } from '../services/dataset/indexation';
import { type ItemType, Neo4jLabels } from '../types';

export const typeDefs = gql`
  #
  # Define custom Graphql types
  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  scalar JSONObject
  scalar JSON

  enum DataItemType {
    company
    address
    country
    person
  }

  union NodeItem = Company | Address | Country | Person

  input NodeIdentification {
    type: DataItemType!
    id: ID!
  }

  #
  # Graph DB schema
  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  type RelaionshipProperties @relationshipProperties {
    deleted: Boolean
  }

  type Company @node {
    id: ID! @unique
    name: String!
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    countries(skip: Int = 0, limit: Int = 50): [Country!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Country)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    people(skip: Int = 0, limit: Int = 50): [Person!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Person)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    addresses(skip: Int = 0, limit: Int = 50): [Address!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Address)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
  }

  type Country @node {
    id: ID! @unique
    name: String!
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    companies(skip: Int = 0, limit: Int = 50): [Company!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Company)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    people(skip: Int = 0, limit: Int = 50): [Person!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Person)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    addresses(skip: Int = 0, limit: Int = 50): [Address!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Address)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
  }

  type Address @node {
    id: ID! @unique
    name: String!
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    companies(skip: Int = 0, limit: Int = 50): [Company!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Company)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    people(skip: Int = 0, limit: Int = 50): [Person!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Person)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    countries(skip: Int = 0, limit: Int = 50): [Country!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Country)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
  }

  type Person @node {
    id: ID! @unique
    name: String!
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    companies(skip: Int = 0, limit: Int = 50): [Company!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Company)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    addresses(skip: Int = 0, limit: Int = 50): [Address!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Address)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
    countries(skip: Int = 0, limit: Int = 50): [Country!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<-[r1]-(:Message)-[r2]->(n:Country)
        WHERE NOT coalesce(r1.deleted, false) AND NOT coalesce(r2.deleted, false)
        RETURN DISTINCT n AS result
        SKIP $skip
        LIMIT $limit
        """
      )
  }

  type Message @node {
    id: ID! @unique
    year: Int!
    filename: String!
    pageNumber: Int!
    message: String!

    # saving raw data of the CSV
    raw_company: String!
    raw_address: String!
    raw_people: [String!]
    raw_countries: [String!]
    raw_message: String!

    company: [Company!]!
      @relationship(type: "CONTAINS", direction: OUT, properties: "RelaionshipProperties")
    address: Address!
      @relationship(type: "CONTAINS", direction: OUT, properties: "RelaionshipProperties")
    persons: [Person!]!
      @relationship(type: "CONTAINS", direction: OUT, properties: "RelaionshipProperties")
    countries: [Country!]!
      @relationship(type: "CONTAINS", direction: OUT, properties: "RelaionshipProperties")
  }

  #
  # Inputs
  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  type ImportReport {
    count: Int!
    errors: [String!]
  }
  # Filters

  enum FilterTypes {
    # Not respecting uppercase convention here as those values are required by client types
    number
    date
    keywords
    content
    boundingBox
    boolean
  }

  input NumberFilter {
    type: FilterTypes! # number
    min: Float # could be int or float client side...
    max: Float
  }

  input DateFilter {
    type: FilterTypes! # date
    min: Int # weird to see a number for a date... Date Filter looks like a Year Filter.
    max: Int
  }

  input KeywordsFilter {
    type: FilterTypes! # keywords
    values: [String!]!
  }

  input ContentFilter {
    type: FilterTypes! # content
    query: String!
  }

  input BoundingBoxFilter {
    type: FilterTypes! # boundingBox
    topLeft: [Float]
    bottomRight: [Float]
  }

  input BooleanFilter {
    type: FilterTypes! # boolean
    value: Boolean!
  }

  input MessageFilters {
    date: DateFilter
    messageContent: ContentFilter
    companies: KeywordsFilter
    companyName: ContentFilter
    people: KeywordsFilter
    peopleName: ContentFilter
    addresses: KeywordsFilter
    addressName: ContentFilter
    countries: KeywordsFilter
  }
  input CompanyFilters {
    date: DateFilter
    messageContent: ContentFilter
    companyName: ContentFilter
    people: KeywordsFilter
    peopleName: ContentFilter
    addresses: KeywordsFilter
    addressName: ContentFilter
    countries: KeywordsFilter
  }
  input PeopleFilters {
    date: DateFilter
    messageContent: ContentFilter
    companies: KeywordsFilter
    companyName: ContentFilter
    peopleName: ContentFilter
    addresses: KeywordsFilter
    addressName: ContentFilter
    countries: KeywordsFilter
  }
  input CountryFilters {
    date: DateFilter
    messageContent: ContentFilter
    companies: KeywordsFilter
    companyName: ContentFilter
    people: KeywordsFilter
    peopleName: ContentFilter
    addresses: KeywordsFilter
    addressName: ContentFilter
  }
  input AddressFilters {
    date: DateFilter
    messageContent: ContentFilter
    companies: KeywordsFilter
    companyName: ContentFilter
    people: KeywordsFilter
    peopleName: ContentFilter
    addressName: ContentFilter
    countries: KeywordsFilter
  }

  # SORT

  enum SortByMethods {
    NB_MESSAGES
    NB_COMPANIES
    ALPHABETIC
    SCORE
    DATE
  }
  enum MessageSortByMethods {
    SCORE
    DATE
  }
  enum CompanySortByMethods {
    NB_MESSAGES
    ALPHABETIC
    SCORE
    DATE
  }

  # TOP INPUTS

  enum MessageMetadata {
    company
    people
    country
    address
  }
  enum AddressMetadata {
    company
    people
    country
  }
  enum CountryMetadata {
    company
    people
    address
  }
  enum CompanyMetadata {
    people
    address
    country
  }
  enum PeopleMetadata {
    company
    address
    country
  }

  # RETURN TYPE

  type TopValue {
    id: String!
    label: String!
    count: Int!
  }

  type YearCountResult {
    year: Int
    count: Int
  }

  type CountResult {
    total: Int!
    byYear: [YearCountResult]
  }

  # QUERIES

  type Query {
    "Search for Items using a set of filters"
    searchMessage(
      filters: MessageFilters!
      sortBy: MessageSortByMethods
      limit: Int!
      from: Int
    ): [Message]

    searchCompany(
      filters: CompanyFilters!
      sortBy: CompanySortByMethods
      limit: Int!
      from: Int
    ): [Company]

    searchPeople(filters: PeopleFilters!, sortBy: SortByMethods, limit: Int!, from: Int): [Person]

    searchCountry(
      filters: CountryFilters!
      sortBy: SortByMethods
      limit: Int!
      from: Int
    ): [Country]

    searchAddress(
      filters: AddressFilters!
      sortBy: SortByMethods
      limit: Int!
      from: Int
    ): [Address]

    "Count Items respecting a set of filters, option to add count by year"
    countMessage(filters: MessageFilters!, byYear: Boolean): CountResult
    countCompany(filters: CompanyFilters!, byYear: Boolean): CountResult
    countPeople(filters: PeopleFilters!, byYear: Boolean): CountResult
    countCountry(filters: CountryFilters!, byYear: Boolean): CountResult
    countAddress(filters: AddressFilters!, byYear: Boolean): CountResult

    "Retrieve Top metadata values in Items which respect a set of filters"
    topMessageMetadata(
      metadataModel: MessageMetadata!
      filters: MessageFilters!
      limit: Int!
    ): [TopValue]
    topCompanyMetadata(
      metadataModel: CompanyMetadata!
      filters: CompanyFilters!
      limit: Int!
    ): [TopValue]
    topPeopleMetadata(
      metadataModel: PeopleMetadata!
      filters: PeopleFilters!
      limit: Int!
    ): [TopValue]
    topCountryMetadata(
      metadataModel: CountryMetadata!
      filters: CountryFilters!
      limit: Int!
    ): [TopValue]
    topAddressMetadata(
      metadataModel: AddressMetadata!
      filters: AddressFilters!
      limit: Int!
    ): [TopValue]

    #
    # Internal methods
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    _getNodesItem: [NodeItem!]!
      @cypher(
        statement: "UNWIND $nodes as node MATCH (n:$(node.type) { id: node.id }) RETURN n AS result"
        columnName: "result"
      )
  }

  type Mutation {
    """
    Create a graph in the database
    """
    import(fileNamePattern: String): ImportReport

    """
    Index the graph in the search engine
    """
    index: ImportReport

    """
    Create a new node on the specified message
    """
    createNode(messageId: ID!, type: DataItemType!, name: String!): NodeItem!

    """
    Rename a node value
    """
    renameNode(type: DataItemType!, id: ID!, name: String!): NodeItem!

    """
    Delete a node
    """
    deleteNode(type: DataItemType!, id: ID!): Boolean!

    """
    Change node's type
    """
    changeType(type: DataItemType!, id: ID!, newType: DataItemType!): NodeItem!

    """
    Split a node
    """
    splitNode(type: DataItemType!, id: ID!, values: [String!]!): [NodeItem!]!

    """
    Merge nodes
    """
    mergeNodes(nodes: [NodeIdentification!]!, type: DataItemType!, name: String!): NodeItem!
  }
`;

const log = getLogger('GraphQl');
const datasetImport = Services.get(DatasetImport);
const datasetIndexation = Services.get(DatasetIndexation);
const datasetEdition = Services.get(DatasetEdition);

export const resolvers: IResolvers = {
  NodeItem: {
    __resolveType(
      obj: { [key: string]: unknown },
      _ctx: unknown,
      _resolverInfo: GraphQLResolveInfo,
    ): string {
      return (obj['__resolveType'] as string) || (obj['__typename'] as string);
    },
  },
  Query: {
    // SEARCH
    searchMessage: async ({ filters, sortBy, limit, from }) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      return notImplemented();
    },
    searchCompany: async ({ filters, sortBy, limit, from }) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      return notImplemented();
    },
    searchPeople: async ({ filters, sortBy, limit, from }) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      return notImplemented();
    },
    searchAddress: async ({ filters, sortBy, limit, from }) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      return notImplemented();
    },
    searchCountry: async ({ filters, sortBy, limit, from }) => {
      log.debug(`TODO: search(${JSON.stringify({ filters, sortBy, limit, from })})`);
      return notImplemented();
    },
    // COUNT
    countMessage: async ({ filters, byYear }) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      return notImplemented();
    },
    countCompany: async ({ filters, byYear }) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      return notImplemented();
    },
    countPeople: async ({ filters, byYear }) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      return notImplemented();
    },
    countAddress: async ({ filters, byYear }) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      return notImplemented();
    },
    countCountry: async ({ filters, byYear }) => {
      log.debug(`TODO: count(${JSON.stringify({ filters, byYear })})`);
      return notImplemented();
    },
    // TOP
    topMessageMetadata: async ({ metadataModel, filters, limit }) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      return notImplemented();
    },
    topCompanyMetadata: async ({ metadataModel, filters, limit }) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      return notImplemented();
    },
    topPeopleMetadata: async ({ metadataModel, filters, limit }) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      return notImplemented();
    },
    topAddressMetadata: async ({ metadataModel, filters, limit }) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      return notImplemented();
    },
    topCountryMetadata: async ({ metadataModel, filters, limit }) => {
      log.debug(`TODO: search(${JSON.stringify({ metadataModel, filters, limit })})`);
      return notImplemented();
    },
  },
  Mutation: {
    import: async (_parent: GraphQLObjectType, params: { fileNamePattern?: string }) => {
      let reFileNamePattern: RegExp | undefined = undefined;
      reFileNamePattern = params.fileNamePattern
        ? new RegExp(params.fileNamePattern, 'i')
        : undefined;
      return await datasetImport.doImport(reFileNamePattern);
    },
    index: async (_parent: GraphQLObjectType) => {
      return await datasetIndexation.doIndexation();
    },

    /**
     * Create a new node on the specified message
     */
    createNode: async (
      _parent: GraphQLObjectType,
      params: { messageId: string; type: ItemType; name: string },
      ctx: unknown,
      info: GraphQLResolveInfo,
    ) => {
      const node = await datasetEdition.createNode(params.messageId, params.type, params.name);
      return getGraphQlItem(node.type, node.id, ctx, info);
    },

    /**
     * Rename a node value
     */
    renameNode: async (
      _parent: GraphQLObjectType,
      params: { type: ItemType; id: string; name: string },
      ctx: unknown,
      info: GraphQLResolveInfo,
    ) => {
      const node = await datasetEdition.renameNode(params.type, params.id, params.name);
      return getGraphQlItem(node.type, node.id, ctx, info);
    },

    /**
     * Delete a node
     */
    deleteNode: async (_parent: GraphQLObjectType, params: { type: ItemType; id: string }) => {
      await datasetEdition.deleteNode(params.type, params.id);
      return true;
    },

    /**
     * Change node's type
     */
    changeType: async (
      _parent: GraphQLObjectType,
      params: { type: ItemType; id: string; newType: ItemType },
      ctx: unknown,
      info: GraphQLResolveInfo,
    ) => {
      const node = await datasetEdition.changeNodeType(params.type, params.id, params.newType);
      return getGraphQlItem(params.newType, node.id, ctx, info);
    },

    /**
     * Split a node
     */
    splitNode: async (
      _parent: GraphQLObjectType,
      params: { type: ItemType; id: string; values: string[] },
      ctx: unknown,
      info: GraphQLResolveInfo,
    ) => {
      const nodes = await datasetEdition.splitNode(params.type, params.id, params.values);
      return getGraphQlItems(nodes, ctx, info);
    },

    /**
     * Merge nodes
     */
    mergeNodes: async (
      _parent: GraphQLObjectType,
      params: { nodes: Array<{ type: ItemType; id: string }>; type: ItemType; name: string },
      ctx: unknown,
      info: GraphQLResolveInfo,
    ) => {
      const node = await datasetEdition.mergeNodes(params.nodes, params.type, params.name);
      return getGraphQlItem(node.type, node.id, ctx, info);
    },
  },
};

async function getGraphQlItems<T>(
  nodes: Array<{ type: ItemType; id: string }>,
  ctx: T,
  info: GraphQLResolveInfo,
) {
  // Calling _getGraph query with the good cypherParams
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

  return data;
}

async function getGraphQlItem<T>(type: ItemType, id: string, ctx: T, info: GraphQLResolveInfo) {
  // Calling _getGraph query with the good cypherParams
  const data = await delegateToSchema({
    schema: info.schema,
    operation: 'query' as OperationTypeNode,
    fieldName: '_getNodesItem',
    context: { ...ctx, cypherParams: { nodes: [{ id, type: Neo4jLabels[type] }] } },
    info: info,
  });
  return head(data);
}
