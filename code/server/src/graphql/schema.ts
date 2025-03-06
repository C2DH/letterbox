import { IResolvers } from '@graphql-tools/utils';
import { notImplemented } from '@hapi/boom';
import { getLogger } from '@ouestware/node-logger';
import { GraphQLObjectType } from 'graphql';
import gql from 'graphql-tag';

import { Services } from '../services';
import { DatasetImport } from '../services/dataset/import';

export const typeDefs = gql`
  #
  # Define custom Graphql types
  #
  scalar JSONObject
  scalar JSON

  type Company @node {
    name: ID! @unique
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    countries(skip: Int = 0, limit: Int = 50): [Country!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Country) RETURN DISTINCT n AS result
        """
      )
    people(skip: Int = 0, limit: Int = 50): [Person!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Person) RETURN DISTINCT n AS result
        """
      )
    addresses(skip: Int = 0, limit: Int = 50): [Address!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Address) RETURN DISTINCT n AS result SKIP $skip LIMIT $limit
        """
      )
  }

  type Country @node {
    name: ID! @unique
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    companies(skip: Int = 0, limit: Int = 50): [Company!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Company) RETURN DISTINCT n AS result
        """
      )
    people(skip: Int = 0, limit: Int = 50): [Person!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Person) RETURN DISTINCT n AS result
        """
      )
    addresses(skip: Int = 0, limit: Int = 50): [Address!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Address) RETURN DISTINCT n AS result SKIP $skip LIMIT $limit
        """
      )
  }

  type Address @node {
    name: ID! @unique
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    companies(skip: Int = 0, limit: Int = 50): [Company!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Company) RETURN DISTINCT n AS result
        """
      )
    people(skip: Int = 0, limit: Int = 50): [Person!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Person) RETURN DISTINCT n AS result
        """
      )
    countries(skip: Int = 0, limit: Int = 50): [Country!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Country) RETURN DISTINCT n AS result SKIP $skip LIMIT $limit
        """
      )
  }

  type Person @node {
    name: ID! @unique
    messages: [Message!]! @relationship(type: "CONTAINS", direction: IN)
    companies(skip: Int = 0, limit: Int = 50): [Company!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Company) RETURN DISTINCT n AS result
        """
      )
    addresses(skip: Int = 0, limit: Int = 50): [Address!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Address) RETURN DISTINCT n AS result
        """
      )
    countries(skip: Int = 0, limit: Int = 50): [Country!]!
      @cypher(
        columnName: "result"
        statement: """
        MATCH (this)<--(:Message)-->(n:Country) RETURN DISTINCT n AS result SKIP $skip LIMIT $limit
        """
      )
  }

  type Message @node {
    fingerprint: ID! @unique

    year: Int!
    filename: String!
    pageNumber: Int!
    message: String!

    # saving raw data of the CSV

    raw_company: String!
    raw_company_spare: String!
    raw_address: String!
    raw_address_spare: String!
    raw_people: [String]
    raw_countries: [String]
    raw_message: String!

    company: [Company!]! @relationship(type: "CONTAINS", direction: OUT)
    address: Address! @relationship(type: "CONTAINS", direction: OUT)
    persons: [Person!]! @relationship(type: "CONTAINS", direction: OUT)
    countries: [Country!]! @relationship(type: "CONTAINS", direction: OUT)
  }

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
  }

  type Mutation {
    """
    Create a graph in the database
    """
    import(fileNamePattern: String): ImportReport
  }
`;

const log = getLogger('GraphQl');
const datasetImport = Services.get(DatasetImport);

export const resolvers: IResolvers = {
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
    import: async (
      _parent: GraphQLObjectType,
      params: {
        fileNamePattern?: string;
      },
    ) => {
      let reFileNamePattern: RegExp | undefined = undefined;
      reFileNamePattern = params.fileNamePattern
        ? new RegExp(params.fileNamePattern, 'i')
        : undefined;
      return await datasetImport.doImport(reFileNamePattern);
    },
  },
};
