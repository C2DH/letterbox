/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Address = {
  __typename?: 'Address';
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
};

export type AddressCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String']['output'];
  node: Address;
};

export enum AddressMetadata {
  Company = 'company',
  Country = 'country',
  People = 'people',
}

export type AddressOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more AddressSort objects to sort Addresses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AddressSort>>;
};

/** Fields to sort Addresses by. The order in which sorts are applied is not guaranteed when specifying many fields in one AddressSort object. */
export type AddressSort = {
  companiesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
};

export type AddressWhere = {
  AND?: InputMaybe<Array<AddressWhere>>;
  NOT?: InputMaybe<AddressWhere>;
  OR?: InputMaybe<Array<AddressWhere>>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CompaniesConnection = {
  __typename?: 'CompaniesConnection';
  edges: Array<CompanyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Company = {
  __typename?: 'Company';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
};

export type CompanyAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyEdge = {
  __typename?: 'CompanyEdge';
  cursor: Scalars['String']['output'];
  node: Company;
};

export enum CompanyMetadata {
  Address = 'address',
  Country = 'country',
  People = 'people',
}

export type CompanyOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CompanySort objects to sort Companies by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CompanySort>>;
};

/** Fields to sort Companies by. The order in which sorts are applied is not guaranteed when specifying many fields in one CompanySort object. */
export type CompanySort = {
  addressesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
};

export type CompanyWhere = {
  AND?: InputMaybe<Array<CompanyWhere>>;
  NOT?: InputMaybe<CompanyWhere>;
  OR?: InputMaybe<Array<CompanyWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ContentFilter = {
  query: Scalars['String']['input'];
  type: FilterTypes;
};

export type CountResult = {
  __typename?: 'CountResult';
  byYear?: Maybe<Array<Maybe<YearCountResult>>>;
  total: Scalars['Int']['output'];
};

export type CountriesConnection = {
  __typename?: 'CountriesConnection';
  edges: Array<CountryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Country = {
  __typename?: 'Country';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
};

export type CountryAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryEdge = {
  __typename?: 'CountryEdge';
  cursor: Scalars['String']['output'];
  node: Country;
};

export enum CountryMetadata {
  Address = 'address',
  Company = 'company',
  People = 'people',
}

export type CountryOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CountrySort objects to sort Countries by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CountrySort>>;
};

/** Fields to sort Countries by. The order in which sorts are applied is not guaranteed when specifying many fields in one CountrySort object. */
export type CountrySort = {
  addressesCount?: InputMaybe<SortDirection>;
  companiesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
};

export type CountryWhere = {
  AND?: InputMaybe<Array<CountryWhere>>;
  NOT?: InputMaybe<CountryWhere>;
  OR?: InputMaybe<Array<CountryWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export enum DataItemType {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  Message = 'message',
  Person = 'person',
}

export type DateFilter = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  type: FilterTypes;
};

export enum EsSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum FilterTypes {
  Boolean = 'boolean',
  BoundingBox = 'boundingBox',
  Content = 'content',
  Date = 'date',
  Keywords = 'keywords',
  Number = 'number',
}

export type ImportReport = {
  __typename?: 'ImportReport';
  count: Scalars['Int']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
};

export type KeywordsFilter = {
  type: FilterTypes;
  values: Array<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  pageNumber: Scalars['Int']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
  raw_address: Scalars['String']['output'];
  raw_company: Scalars['String']['output'];
  raw_countries?: Maybe<Array<Scalars['String']['output']>>;
  raw_message: Scalars['String']['output'];
  raw_people?: Maybe<Array<Scalars['String']['output']>>;
  year: Scalars['Int']['output'];
};

export type MessageAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessagePeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String']['output'];
  node: Message;
};

export enum MessageMetadata {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  People = 'people',
}

export type MessageOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more MessageSort objects to sort Messages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<MessageSort>>;
};

/** Fields to sort Messages by. The order in which sorts are applied is not guaranteed when specifying many fields in one MessageSort object. */
export type MessageSort = {
  addressesCount?: InputMaybe<SortDirection>;
  companiesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  filename?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  message?: InputMaybe<SortDirection>;
  pageNumber?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
  raw_address?: InputMaybe<SortDirection>;
  raw_company?: InputMaybe<SortDirection>;
  raw_message?: InputMaybe<SortDirection>;
  year?: InputMaybe<SortDirection>;
};

export type MessageWhere = {
  AND?: InputMaybe<Array<MessageWhere>>;
  NOT?: InputMaybe<MessageWhere>;
  OR?: InputMaybe<Array<MessageWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  filename_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  filename_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  filename_EQ?: InputMaybe<Scalars['String']['input']>;
  filename_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  filename_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  message_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  message_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  message_EQ?: InputMaybe<Scalars['String']['input']>;
  message_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  message_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  pageNumber_EQ?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  pageNumber_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_LTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  raw_address_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_address_EQ?: InputMaybe<Scalars['String']['input']>;
  raw_address_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_address_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_company_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  raw_company_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_company_EQ?: InputMaybe<Scalars['String']['input']>;
  raw_company_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_company_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_countries_EQ?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_countries_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  raw_message_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  raw_message_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_message_EQ?: InputMaybe<Scalars['String']['input']>;
  raw_message_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_message_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_people_EQ?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_people_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  year_EQ?: InputMaybe<Scalars['Int']['input']>;
  year_GT?: InputMaybe<Scalars['Int']['input']>;
  year_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  year_LT?: InputMaybe<Scalars['Int']['input']>;
  year_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change node's type */
  changeType: NodeItem;
  /** Create a new node on the specified message */
  createNode: NodeItem;
  /** Delete a node */
  deleteNode: Scalars['Boolean']['output'];
  /** Create a graph in the database */
  import?: Maybe<ImportReport>;
  /** Index the graph in the search engine */
  index?: Maybe<ImportReport>;
  /** Merge nodes */
  mergeNodes: NodeItem;
  /** Rename a node value */
  renameNode: NodeItem;
  /** Split a node */
  splitNode: Array<NodeItem>;
};

export type MutationChangeTypeArgs = {
  id: Scalars['ID']['input'];
  newType: DataItemType;
  type: DataItemType;
};

export type MutationCreateNodeArgs = {
  messageId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DataItemType;
};

export type MutationDeleteNodeArgs = {
  id: Scalars['ID']['input'];
  type: DataItemType;
};

export type MutationImportArgs = {
  fileNamePattern?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMergeNodesArgs = {
  name: Scalars['String']['input'];
  nodes: Array<NodeIdentification>;
  type: DataItemType;
};

export type MutationRenameNodeArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DataItemType;
};

export type MutationSplitNodeArgs = {
  id: Scalars['ID']['input'];
  type: DataItemType;
  values: Array<Scalars['String']['input']>;
};

export type NodeIdentification = {
  id: Scalars['ID']['input'];
  type: DataItemType;
};

export type NodeItem = Address | Company | Country | Message | Person;

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PeopleConnection = {
  __typename?: 'PeopleConnection';
  edges: Array<PersonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum PeopleMetadata {
  Address = 'address',
  Company = 'company',
  Country = 'country',
}

export type Person = {
  __typename?: 'Person';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PersonAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonEdge = {
  __typename?: 'PersonEdge';
  cursor: Scalars['String']['output'];
  node: Person;
};

export type PersonOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more PersonSort objects to sort People by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PersonSort>>;
};

/** Fields to sort People by. The order in which sorts are applied is not guaranteed when specifying many fields in one PersonSort object. */
export type PersonSort = {
  addressesCount?: InputMaybe<SortDirection>;
  companiesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type PersonWhere = {
  AND?: InputMaybe<Array<PersonWhere>>;
  NOT?: InputMaybe<PersonWhere>;
  OR?: InputMaybe<Array<PersonWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _getAddressItems: Array<Address>;
  _getCompanyItems: Array<Company>;
  _getCountryItems: Array<Country>;
  _getMessageItems: Array<Message>;
  _getPersonItems: Array<Person>;
  addresses: Array<Address>;
  addressesConnection: AddressesConnection;
  companies: Array<Company>;
  companiesConnection: CompaniesConnection;
  countAddress?: Maybe<CountResult>;
  countCompany?: Maybe<CountResult>;
  countCountry?: Maybe<CountResult>;
  /** Count Items respecting a set of filters, option to add count by year */
  countMessage?: Maybe<CountResult>;
  countPeople?: Maybe<CountResult>;
  countries: Array<Country>;
  countriesConnection: CountriesConnection;
  messages: Array<Message>;
  messagesConnection: MessagesConnection;
  people: Array<Person>;
  peopleConnection: PeopleConnection;
  scroll?: Maybe<SearchResults>;
  /** Search for Items using a set of filters */
  search?: Maybe<SearchResults>;
  topAddressMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topCompanyMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topCountryMetadata?: Maybe<Array<Maybe<TopValue>>>;
  /** Retrieve Top metadata values in Items which respect a set of filters */
  topMessageMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topPeopleMetadata?: Maybe<Array<Maybe<TopValue>>>;
};

export type QueryAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressSort>>;
  where?: InputMaybe<AddressWhere>;
};

export type QueryAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressSort>>;
  where?: InputMaybe<AddressWhere>;
};

export type QueryCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CompanySort>>;
  where?: InputMaybe<CompanyWhere>;
};

export type QueryCompaniesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CompanySort>>;
  where?: InputMaybe<CompanyWhere>;
};

export type QueryCountAddressArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountCompanyArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountCountryArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountMessageArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountPeopleArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type QueryCountriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type QueryMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type QueryMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type QueryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type QueryPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type QueryScrollArgs = {
  itemType: DataItemType;
  scrollId: Scalars['String']['input'];
  scrollTimeout?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySearchArgs = {
  filters: SearchFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  itemType: DataItemType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  scrollTimeout?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<InputMaybe<SortBy>>>;
};

export type QueryTopAddressMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: AddressMetadata;
};

export type QueryTopCompanyMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: CompanyMetadata;
};

export type QueryTopCountryMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: CountryMetadata;
};

export type QueryTopMessageMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: MessageMetadata;
};

export type QueryTopPeopleMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: PeopleMetadata;
};

export type SearchFilters = {
  addressName?: InputMaybe<ContentFilter>;
  addresses?: InputMaybe<KeywordsFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  people?: InputMaybe<KeywordsFilter>;
  peopleName?: InputMaybe<ContentFilter>;
  year?: InputMaybe<DateFilter>;
  years?: InputMaybe<DateFilter>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  results: Array<Maybe<NodeItem>>;
  scrollId?: Maybe<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
};

export type SortBy = {
  direction: EsSortDirection;
  field: Scalars['String']['input'];
};

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type TopValue = {
  __typename?: 'TopValue';
  count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type YearCountResult = {
  __typename?: 'YearCountResult';
  count?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type AddressInlineFragment = { __typename?: 'Address'; id: string; name: string };

export type CompanyInlineFragment = { __typename?: 'Company'; id: string; name: string };

export type CountryInlineFragment = { __typename?: 'Country'; id: string; name: string };

export type MessageInlineFragment = {
  __typename?: 'Message';
  id: string;
  year: number;
  message: string;
  addressesCount: number;
  companiesCount: number;
  countriesCount: number;
  peopleCount: number;
};

export type PersonInlineFragment = { __typename?: 'Person'; id: string; name: string };

export type GetAddressByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetAddressByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    id: string;
    name: string;
    companiesCount: number;
    countriesCount: number;
    messagesCount: number;
    peopleCount: number;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetAddressCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetAddressCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetAddressMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetAddressPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCompanyByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    id: string;
    name: string;
    addressesCount: number;
    countriesCount: number;
    messagesCount: number;
    peopleCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCompanyAddressesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyAddressesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetCompanyCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetCompanyMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetCompanyPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCountryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCountryByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    id: string;
    name: string;
    addressesCount: number;
    companiesCount: number;
    messagesCount: number;
    peopleCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCountryCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetCountryCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetCountryMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetCountryPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetMessageByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetMessageByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    id: string;
    year: number;
    message: string;
    addressesCount: number;
    companiesCount: number;
    countriesCount: number;
    peopleCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetMessageCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessageCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetMessageCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessageCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetMessageMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessageMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetMessagePeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessagePeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetPersonByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPersonByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    id: string;
    name: string;
    addressesCount: number;
    companiesCount: number;
    countriesCount: number;
    messagesCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetPersonCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetPersonCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetPersonMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetPersonPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export const AddressInlineFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<AddressInlineFragment, unknown>;
export const CompanyInlineFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CompanyInlineFragment, unknown>;
export const CountryInlineFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CountryInlineFragment, unknown>;
export const MessageInlineFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MessageInlineFragment, unknown>;
export const PersonInlineFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PersonInlineFragment, unknown>;
export const GetAddressByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAddressById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'addresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'messagesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAddressByIdQuery, GetAddressByIdQueryVariables>;
export const GetAddressCompaniesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAddressCompanies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'addresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAddressCompaniesQuery, GetAddressCompaniesQueryVariables>;
export const GetAddressCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAddressCountries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'addresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAddressCountriesQuery, GetAddressCountriesQueryVariables>;
export const GetAddressMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAddressMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'addresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAddressMessagesQuery, GetAddressMessagesQueryVariables>;
export const GetAddressPeopleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAddressPeople' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'addresses' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAddressPeopleQuery, GetAddressPeopleQueryVariables>;
export const GetCompanyByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCompanyById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'companies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'messagesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>;
export const GetCompanyAddressesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCompanyAddresses' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'companies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompanyAddressesQuery, GetCompanyAddressesQueryVariables>;
export const GetCompanyCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCompanyCountries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'companies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompanyCountriesQuery, GetCompanyCountriesQueryVariables>;
export const GetCompanyMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCompanyMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'companies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompanyMessagesQuery, GetCompanyMessagesQueryVariables>;
export const GetCompanyPeopleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCompanyPeople' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'companies' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompanyPeopleQuery, GetCompanyPeopleQueryVariables>;
export const GetCountryByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountryById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'countries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'messagesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryByIdQuery, GetCountryByIdQueryVariables>;
export const GetCountryCompaniesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountryCompanies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'countries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryCompaniesQuery, GetCountryCompaniesQueryVariables>;
export const GetCountryCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountryCountries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'countries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryCountriesQuery, GetCountryCountriesQueryVariables>;
export const GetCountryMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountryMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'countries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryMessagesQuery, GetCountryMessagesQueryVariables>;
export const GetCountryPeopleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCountryPeople' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'countries' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryPeopleQuery, GetCountryPeopleQueryVariables>;
export const GetMessageByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMessageById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'messages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                { kind: 'Field', name: { kind: 'Name', value: 'message' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessageByIdQuery, GetMessageByIdQueryVariables>;
export const GetMessageCompaniesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMessageCompanies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'messages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessageCompaniesQuery, GetMessageCompaniesQueryVariables>;
export const GetMessageCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMessageCountries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'messages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessageCountriesQuery, GetMessageCountriesQueryVariables>;
export const GetMessageMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMessageMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'messages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'PersonInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'PersonInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Person' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessageMessagesQuery, GetMessageMessagesQueryVariables>;
export const GetMessagePeopleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetMessagePeople' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'messages' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetMessagePeopleQuery, GetMessagePeopleQueryVariables>;
export const GetPersonByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPersonById' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'people' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'IntValue', value: '0' },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'IntValue', value: '20' },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'messagesCount' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPersonByIdQuery, GetPersonByIdQueryVariables>;
export const GetPersonCompaniesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPersonCompanies' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'people' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CompanyInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CompanyInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Company' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPersonCompaniesQuery, GetPersonCompaniesQueryVariables>;
export const GetPersonCountriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPersonCountries' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'people' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'AddressInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'AddressInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Address' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPersonCountriesQuery, GetPersonCountriesQueryVariables>;
export const GetPersonMessagesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPersonMessages' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'people' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'messages' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'MessageInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'MessageInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Message' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'year' } },
          { kind: 'Field', name: { kind: 'Name', value: 'message' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'companiesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countriesCount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'peopleCount' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPersonMessagesQuery, GetPersonMessagesQueryVariables>;
export const GetPersonPeopleDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPersonPeople' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            alias: { kind: 'Name', value: 'result' },
            name: { kind: 'Name', value: 'people' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'id_EQ' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
                  arguments: [
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'skip' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'skip' } },
                    },
                    {
                      kind: 'Argument',
                      name: { kind: 'Name', value: 'limit' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'limit' } },
                    },
                  ],
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'FragmentSpread', name: { kind: 'Name', value: 'CountryInline' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CountryInline' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'Country' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetPersonPeopleQuery, GetPersonPeopleQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Address = {
  __typename?: 'Address';
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
};

export type AddressCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String']['output'];
  node: Address;
};

export enum AddressMetadata {
  Company = 'company',
  Country = 'country',
  People = 'people',
}

export type AddressOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more AddressSort objects to sort Addresses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AddressSort>>;
};

/** Fields to sort Addresses by. The order in which sorts are applied is not guaranteed when specifying many fields in one AddressSort object. */
export type AddressSort = {
  companiesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
};

export type AddressWhere = {
  AND?: InputMaybe<Array<AddressWhere>>;
  NOT?: InputMaybe<AddressWhere>;
  OR?: InputMaybe<Array<AddressWhere>>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CompaniesConnection = {
  __typename?: 'CompaniesConnection';
  edges: Array<CompanyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Company = {
  __typename?: 'Company';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
};

export type CompanyAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyEdge = {
  __typename?: 'CompanyEdge';
  cursor: Scalars['String']['output'];
  node: Company;
};

export enum CompanyMetadata {
  Address = 'address',
  Country = 'country',
  People = 'people',
}

export type CompanyOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CompanySort objects to sort Companies by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CompanySort>>;
};

/** Fields to sort Companies by. The order in which sorts are applied is not guaranteed when specifying many fields in one CompanySort object. */
export type CompanySort = {
  addressesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
};

export type CompanyWhere = {
  AND?: InputMaybe<Array<CompanyWhere>>;
  NOT?: InputMaybe<CompanyWhere>;
  OR?: InputMaybe<Array<CompanyWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type ContentFilter = {
  query: Scalars['String']['input'];
  type: FilterTypes;
};

export type CountResult = {
  __typename?: 'CountResult';
  byYear?: Maybe<Array<Maybe<YearCountResult>>>;
  total: Scalars['Int']['output'];
};

export type CountriesConnection = {
  __typename?: 'CountriesConnection';
  edges: Array<CountryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Country = {
  __typename?: 'Country';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
};

export type CountryAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryEdge = {
  __typename?: 'CountryEdge';
  cursor: Scalars['String']['output'];
  node: Country;
};

export enum CountryMetadata {
  Address = 'address',
  Company = 'company',
  People = 'people',
}

export type CountryOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CountrySort objects to sort Countries by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CountrySort>>;
};

/** Fields to sort Countries by. The order in which sorts are applied is not guaranteed when specifying many fields in one CountrySort object. */
export type CountrySort = {
  addressesCount?: InputMaybe<SortDirection>;
  companiesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
};

export type CountryWhere = {
  AND?: InputMaybe<Array<CountryWhere>>;
  NOT?: InputMaybe<CountryWhere>;
  OR?: InputMaybe<Array<CountryWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export enum DataItemType {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  Message = 'message',
  Person = 'person',
}

export type DateFilter = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  type: FilterTypes;
};

export enum EsSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum FilterTypes {
  Boolean = 'boolean',
  BoundingBox = 'boundingBox',
  Content = 'content',
  Date = 'date',
  Keywords = 'keywords',
  Number = 'number',
}

export type ImportReport = {
  __typename?: 'ImportReport';
  count: Scalars['Int']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
};

export type KeywordsFilter = {
  type: FilterTypes;
  values: Array<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  pageNumber: Scalars['Int']['output'];
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
  raw_address: Scalars['String']['output'];
  raw_company: Scalars['String']['output'];
  raw_countries?: Maybe<Array<Scalars['String']['output']>>;
  raw_message: Scalars['String']['output'];
  raw_people?: Maybe<Array<Scalars['String']['output']>>;
  year: Scalars['Int']['output'];
};

export type MessageAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessagePeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String']['output'];
  node: Message;
};

export enum MessageMetadata {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  People = 'people',
}

export type MessageOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more MessageSort objects to sort Messages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<MessageSort>>;
};

/** Fields to sort Messages by. The order in which sorts are applied is not guaranteed when specifying many fields in one MessageSort object. */
export type MessageSort = {
  addressesCount?: InputMaybe<SortDirection>;
  companiesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  filename?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  message?: InputMaybe<SortDirection>;
  pageNumber?: InputMaybe<SortDirection>;
  peopleCount?: InputMaybe<SortDirection>;
  raw_address?: InputMaybe<SortDirection>;
  raw_company?: InputMaybe<SortDirection>;
  raw_message?: InputMaybe<SortDirection>;
  year?: InputMaybe<SortDirection>;
};

export type MessageWhere = {
  AND?: InputMaybe<Array<MessageWhere>>;
  NOT?: InputMaybe<MessageWhere>;
  OR?: InputMaybe<Array<MessageWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  filename_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  filename_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  filename_EQ?: InputMaybe<Scalars['String']['input']>;
  filename_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  filename_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  message_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  message_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  message_EQ?: InputMaybe<Scalars['String']['input']>;
  message_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  message_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  pageNumber_EQ?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  pageNumber_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_LTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  raw_address_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_address_EQ?: InputMaybe<Scalars['String']['input']>;
  raw_address_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_address_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_company_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  raw_company_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_company_EQ?: InputMaybe<Scalars['String']['input']>;
  raw_company_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_company_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_countries_EQ?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_countries_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  raw_message_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  raw_message_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_message_EQ?: InputMaybe<Scalars['String']['input']>;
  raw_message_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_message_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  raw_people_EQ?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_people_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  year_EQ?: InputMaybe<Scalars['Int']['input']>;
  year_GT?: InputMaybe<Scalars['Int']['input']>;
  year_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  year_LT?: InputMaybe<Scalars['Int']['input']>;
  year_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change node's type */
  changeType: NodeItem;
  /** Create a new node on the specified message */
  createNode: NodeItem;
  /** Delete a node */
  deleteNode: Scalars['Boolean']['output'];
  /** Create a graph in the database */
  import?: Maybe<ImportReport>;
  /** Index the graph in the search engine */
  index?: Maybe<ImportReport>;
  /** Merge nodes */
  mergeNodes: NodeItem;
  /** Rename a node value */
  renameNode: NodeItem;
  /** Split a node */
  splitNode: Array<NodeItem>;
};

export type MutationChangeTypeArgs = {
  id: Scalars['ID']['input'];
  newType: DataItemType;
  type: DataItemType;
};

export type MutationCreateNodeArgs = {
  messageId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DataItemType;
};

export type MutationDeleteNodeArgs = {
  id: Scalars['ID']['input'];
  type: DataItemType;
};

export type MutationImportArgs = {
  fileNamePattern?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMergeNodesArgs = {
  name: Scalars['String']['input'];
  nodes: Array<NodeIdentification>;
  type: DataItemType;
};

export type MutationRenameNodeArgs = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DataItemType;
};

export type MutationSplitNodeArgs = {
  id: Scalars['ID']['input'];
  type: DataItemType;
  values: Array<Scalars['String']['input']>;
};

export type NodeIdentification = {
  id: Scalars['ID']['input'];
  type: DataItemType;
};

export type NodeItem = Address | Company | Country | Message | Person;

/** Pagination information (Relay) */
export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']['output']>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type PeopleConnection = {
  __typename?: 'PeopleConnection';
  edges: Array<PersonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum PeopleMetadata {
  Address = 'address',
  Company = 'company',
  Country = 'country',
}

export type Person = {
  __typename?: 'Person';
  addresses: Array<Address>;
  addressesCount: Scalars['Int']['output'];
  companies: Array<Company>;
  companiesCount: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesCount: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  messagesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type PersonAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonEdge = {
  __typename?: 'PersonEdge';
  cursor: Scalars['String']['output'];
  node: Person;
};

export type PersonOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more PersonSort objects to sort People by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PersonSort>>;
};

/** Fields to sort People by. The order in which sorts are applied is not guaranteed when specifying many fields in one PersonSort object. */
export type PersonSort = {
  addressesCount?: InputMaybe<SortDirection>;
  companiesCount?: InputMaybe<SortDirection>;
  countriesCount?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  messagesCount?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type PersonWhere = {
  AND?: InputMaybe<Array<PersonWhere>>;
  NOT?: InputMaybe<PersonWhere>;
  OR?: InputMaybe<Array<PersonWhere>>;
  addressesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  addressesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  addressesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  companiesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  companiesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  countriesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  countriesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  messagesCount_LT?: InputMaybe<Scalars['Int']['input']>;
  messagesCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _getAddressItems: Array<Address>;
  _getCompanyItems: Array<Company>;
  _getCountryItems: Array<Country>;
  _getMessageItems: Array<Message>;
  _getPersonItems: Array<Person>;
  addresses: Array<Address>;
  addressesConnection: AddressesConnection;
  companies: Array<Company>;
  companiesConnection: CompaniesConnection;
  countAddress?: Maybe<CountResult>;
  countCompany?: Maybe<CountResult>;
  countCountry?: Maybe<CountResult>;
  /** Count Items respecting a set of filters, option to add count by year */
  countMessage?: Maybe<CountResult>;
  countPeople?: Maybe<CountResult>;
  countries: Array<Country>;
  countriesConnection: CountriesConnection;
  messages: Array<Message>;
  messagesConnection: MessagesConnection;
  people: Array<Person>;
  peopleConnection: PeopleConnection;
  scroll?: Maybe<SearchResults>;
  /** Search for Items using a set of filters */
  search?: Maybe<SearchResults>;
  topAddressMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topCompanyMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topCountryMetadata?: Maybe<Array<Maybe<TopValue>>>;
  /** Retrieve Top metadata values in Items which respect a set of filters */
  topMessageMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topPeopleMetadata?: Maybe<Array<Maybe<TopValue>>>;
};

export type QueryAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressSort>>;
  where?: InputMaybe<AddressWhere>;
};

export type QueryAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressSort>>;
  where?: InputMaybe<AddressWhere>;
};

export type QueryCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CompanySort>>;
  where?: InputMaybe<CompanyWhere>;
};

export type QueryCompaniesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CompanySort>>;
  where?: InputMaybe<CompanyWhere>;
};

export type QueryCountAddressArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountCompanyArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountCountryArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountMessageArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountPeopleArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: SearchFilters;
};

export type QueryCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type QueryCountriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type QueryMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type QueryMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type QueryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type QueryPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type QueryScrollArgs = {
  itemType: DataItemType;
  scrollId: Scalars['String']['input'];
  scrollTimeout?: InputMaybe<Scalars['String']['input']>;
};

export type QuerySearchArgs = {
  filters: SearchFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  itemType: DataItemType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  scrollTimeout?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<InputMaybe<SortBy>>>;
};

export type QueryTopAddressMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: AddressMetadata;
};

export type QueryTopCompanyMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: CompanyMetadata;
};

export type QueryTopCountryMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: CountryMetadata;
};

export type QueryTopMessageMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: MessageMetadata;
};

export type QueryTopPeopleMetadataArgs = {
  filters: SearchFilters;
  limit: Scalars['Int']['input'];
  metadataModel: PeopleMetadata;
};

export type SearchFilters = {
  addressName?: InputMaybe<ContentFilter>;
  addresses?: InputMaybe<KeywordsFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  people?: InputMaybe<KeywordsFilter>;
  peopleName?: InputMaybe<ContentFilter>;
  year?: InputMaybe<DateFilter>;
  years?: InputMaybe<DateFilter>;
};

export type SearchResults = {
  __typename?: 'SearchResults';
  results: Array<Maybe<NodeItem>>;
  scrollId?: Maybe<Scalars['String']['output']>;
  total: Scalars['Int']['output'];
};

export type SortBy = {
  direction: EsSortDirection;
  field: Scalars['String']['input'];
};

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type TopValue = {
  __typename?: 'TopValue';
  count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type YearCountResult = {
  __typename?: 'YearCountResult';
  count?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type AddressInlineFragment = { __typename?: 'Address'; id: string; name: string };

export type CompanyInlineFragment = { __typename?: 'Company'; id: string; name: string };

export type CountryInlineFragment = { __typename?: 'Country'; id: string; name: string };

export type MessageInlineFragment = {
  __typename?: 'Message';
  id: string;
  year: number;
  message: string;
  addressesCount: number;
  companiesCount: number;
  countriesCount: number;
  peopleCount: number;
};

export type PersonInlineFragment = { __typename?: 'Person'; id: string; name: string };

export type GetAddressByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetAddressByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    id: string;
    name: string;
    companiesCount: number;
    countriesCount: number;
    messagesCount: number;
    peopleCount: number;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetAddressCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetAddressCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetAddressMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetAddressPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetAddressPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Address';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCompanyByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    id: string;
    name: string;
    addressesCount: number;
    countriesCount: number;
    messagesCount: number;
    peopleCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCompanyAddressesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyAddressesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetCompanyCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetCompanyMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetCompanyPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCompanyPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Company';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCountryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCountryByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    id: string;
    name: string;
    addressesCount: number;
    companiesCount: number;
    messagesCount: number;
    peopleCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetCountryCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetCountryCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetCountryMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetCountryPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCountryPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Country';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetMessageByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetMessageByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    id: string;
    year: number;
    message: string;
    addressesCount: number;
    companiesCount: number;
    countriesCount: number;
    peopleCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetMessageCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessageCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetMessageCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessageCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetMessageMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessageMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
  }>;
};

export type GetMessagePeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetMessagePeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Message';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetPersonByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetPersonByIdQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    id: string;
    name: string;
    addressesCount: number;
    companiesCount: number;
    countriesCount: number;
    messagesCount: number;
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetPersonCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonCompaniesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
  }>;
};

export type GetPersonCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonCountriesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
  }>;
};

export type GetPersonMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonMessagesQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    messages: Array<{
      __typename?: 'Message';
      id: string;
      year: number;
      message: string;
      addressesCount: number;
      companiesCount: number;
      countriesCount: number;
      peopleCount: number;
    }>;
  }>;
};

export type GetPersonPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetPersonPeopleQuery = {
  __typename?: 'Query';
  result: Array<{
    __typename?: 'Person';
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};
