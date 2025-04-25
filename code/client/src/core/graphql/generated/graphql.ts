/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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
  otherNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verified?: Maybe<Scalars['Boolean']['output']>;
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
  verified?: InputMaybe<SortDirection>;
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
  otherNames_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  otherNames_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  tags_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  verified_EQ?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AggregateResults = {
  __typename?: 'AggregateResults';
  total: Scalars['Int']['output'];
  values: Array<AggregateValue>;
};

export type AggregateValue = {
  __typename?: 'AggregateValue';
  count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export enum AggregationFields {
  Addresses = 'addresses',
  Companies = 'companies',
  Countries = 'countries',
  Fingerprint = 'fingerprint',
  People = 'people',
  Tags = 'tags',
  Verified = 'verified',
  Year = 'year',
  Years = 'years'
}

export type BooleanFilter = {
  type: FilterTypes;
  value: Scalars['Boolean']['input'];
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
  otherNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verified?: Maybe<Scalars['Boolean']['output']>;
  years?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
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
  verified?: InputMaybe<SortDirection>;
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
  otherNames_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  otherNames_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  tags_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  verified_EQ?: InputMaybe<Scalars['Boolean']['input']>;
  years_EQ?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  years_INCLUDES?: InputMaybe<Scalars['Int']['input']>;
};

export type ContentFilter = {
  query: Scalars['String']['input'];
  type: FilterTypes;
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
  otherNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  people: Array<Person>;
  peopleCount: Scalars['Int']['output'];
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verified?: Maybe<Scalars['Boolean']['output']>;
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
  verified?: InputMaybe<SortDirection>;
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
  otherNames_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  otherNames_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  peopleCount_EQ?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_GTE?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  peopleCount_LT?: InputMaybe<Scalars['Int']['input']>;
  peopleCount_LTE?: InputMaybe<Scalars['Int']['input']>;
  tags_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  verified_EQ?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum DataItemType {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  Message = 'message',
  Person = 'person'
}

export type DateFilter = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  type: FilterTypes;
};

export enum EsSortDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum FilterTypes {
  Boolean = 'boolean',
  BoundingBox = 'boundingBox',
  Content = 'content',
  Date = 'date',
  Keywords = 'keywords',
  Number = 'number'
}

export type ImportReport = {
  __typename?: 'ImportReport';
  count: Scalars['Int']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
};

export type IndexingPendingModification = {
  __typename?: 'IndexingPendingModification';
  nbItems: Scalars['Int']['output'];
  startTime: Scalars['String']['output'];
};

export type IndexingPendingModificationEdge = {
  __typename?: 'IndexingPendingModificationEdge';
  cursor: Scalars['String']['output'];
  node: IndexingPendingModification;
};

export type IndexingPendingModificationOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more IndexingPendingModificationSort objects to sort IndexingPendingModifications by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<IndexingPendingModificationSort>>;
};

/** Fields to sort IndexingPendingModifications by. The order in which sorts are applied is not guaranteed when specifying many fields in one IndexingPendingModificationSort object. */
export type IndexingPendingModificationSort = {
  nbItems?: InputMaybe<SortDirection>;
  startTime?: InputMaybe<SortDirection>;
};

export type IndexingPendingModificationWhere = {
  AND?: InputMaybe<Array<IndexingPendingModificationWhere>>;
  NOT?: InputMaybe<IndexingPendingModificationWhere>;
  OR?: InputMaybe<Array<IndexingPendingModificationWhere>>;
  nbItems_EQ?: InputMaybe<Scalars['Int']['input']>;
  nbItems_GT?: InputMaybe<Scalars['Int']['input']>;
  nbItems_GTE?: InputMaybe<Scalars['Int']['input']>;
  nbItems_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  nbItems_LT?: InputMaybe<Scalars['Int']['input']>;
  nbItems_LTE?: InputMaybe<Scalars['Int']['input']>;
  startTime_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  startTime_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  startTime_EQ?: InputMaybe<Scalars['String']['input']>;
  startTime_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  startTime_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type IndexingPendingModificationsConnection = {
  __typename?: 'IndexingPendingModificationsConnection';
  edges: Array<IndexingPendingModificationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
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
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verified?: Maybe<Scalars['Boolean']['output']>;
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
  verified?: InputMaybe<SortDirection>;
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
  tags_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  verified_EQ?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Index Pending modifications */
  indexPendingModifications?: Maybe<PendingModificationsIndexationReport>;
  /** Merge nodes */
  mergeNodes: NodeItem;
  /** Rename a node value */
  renameNode: NodeItem;
  /** set Tags */
  setNodeTags: NodeItem;
  /** set Verified */
  setNodeVerified: NodeItem;
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


export type MutationSetNodeTagsArgs = {
  id: Scalars['ID']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>>;
  type: DataItemType;
};


export type MutationSetNodeVerifiedArgs = {
  id: Scalars['ID']['input'];
  type: DataItemType;
  verified: Scalars['Boolean']['input'];
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

export type PendingModificationsIndexationReport = {
  __typename?: 'PendingModificationsIndexationReport';
  address?: Maybe<ImportReport>;
  company?: Maybe<ImportReport>;
  country?: Maybe<ImportReport>;
  message?: Maybe<ImportReport>;
  person?: Maybe<ImportReport>;
};

export type PeopleConnection = {
  __typename?: 'PeopleConnection';
  edges: Array<PersonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

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
  otherNames?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  verified?: Maybe<Scalars['Boolean']['output']>;
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
  verified?: InputMaybe<SortDirection>;
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
  otherNames_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  otherNames_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  tags_EQ?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_INCLUDES?: InputMaybe<Scalars['String']['input']>;
  verified_EQ?: InputMaybe<Scalars['Boolean']['input']>;
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
  /** Aggregate results into top values aggregations */
  aggregate: AggregateResults;
  companies: Array<Company>;
  companiesConnection: CompaniesConnection;
  countItemsWithPendingModifications: Scalars['Int']['output'];
  countries: Array<Country>;
  countriesConnection: CountriesConnection;
  indexingPendingModifications: Array<IndexingPendingModification>;
  indexingPendingModificationsConnection: IndexingPendingModificationsConnection;
  messages: Array<Message>;
  messagesConnection: MessagesConnection;
  people: Array<Person>;
  peopleConnection: PeopleConnection;
  /** Scroll results */
  scroll?: Maybe<SearchResults>;
  /** Search for Items using a set of filters */
  search?: Maybe<SearchResults>;
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


export type QueryAggregateArgs = {
  field: AggregationFields;
  filters?: InputMaybe<SearchFilters>;
  includes?: InputMaybe<Scalars['String']['input']>;
  itemType: DataItemType;
  query?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
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


export type QueryIndexingPendingModificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<IndexingPendingModificationSort>>;
  where?: InputMaybe<IndexingPendingModificationWhere>;
};


export type QueryIndexingPendingModificationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<IndexingPendingModificationSort>>;
  where?: InputMaybe<IndexingPendingModificationWhere>;
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
  includes?: InputMaybe<Scalars['String']['input']>;
  itemType: DataItemType;
  limit?: InputMaybe<Scalars['Int']['input']>;
  scrollTimeout?: InputMaybe<Scalars['String']['input']>;
  sortBy?: InputMaybe<Array<InputMaybe<SortBy>>>;
};

export type SearchFilters = {
  addresses?: InputMaybe<KeywordsFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  content?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  people?: InputMaybe<KeywordsFilter>;
  tags?: InputMaybe<KeywordsFilter>;
  verified?: InputMaybe<BooleanFilter>;
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
  Desc = 'DESC'
}

export type AddressInlineFragment = { __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null };

export type CompanyInlineFragment = { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null };

export type CountryInlineFragment = { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null };

export type MessageInlineFragment = { __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> };

export type PersonInlineFragment = { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null };

export type DeleteNodeByTypeIdMutationVariables = Exact<{
  type: DataItemType;
  id: Scalars['ID']['input'];
}>;


export type DeleteNodeByTypeIdMutation = { __typename?: 'Mutation', result: boolean };

export type ChangeTypeByTypeIdMutationVariables = Exact<{
  type: DataItemType;
  id: Scalars['ID']['input'];
  newType: DataItemType;
}>;


export type ChangeTypeByTypeIdMutation = { __typename?: 'Mutation', result: { __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message' } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null } };

export type RenameNodeMutationVariables = Exact<{
  type: DataItemType;
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;


export type RenameNodeMutation = { __typename?: 'Mutation', result: { __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message' } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null } };

export type SplitByTypeIdMutationVariables = Exact<{
  type: DataItemType;
  id: Scalars['ID']['input'];
  values: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type SplitByTypeIdMutation = { __typename?: 'Mutation', result: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message' } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> };

export type MergeMutationVariables = Exact<{
  type: DataItemType;
  name: Scalars['String']['input'];
  items: Array<NodeIdentification> | NodeIdentification;
}>;


export type MergeMutation = { __typename?: 'Mutation', result: { __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message' } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null } };

export type SetNodeTagsMutationVariables = Exact<{
  type: DataItemType;
  id: Scalars['ID']['input'];
  tags: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type SetNodeTagsMutation = { __typename?: 'Mutation', result: { __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message' } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null } };

export type SetNodeVerifiedMutationVariables = Exact<{
  type: DataItemType;
  id: Scalars['ID']['input'];
  verified: Scalars['Boolean']['input'];
}>;


export type SetNodeVerifiedMutation = { __typename?: 'Mutation', result: { __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message' } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null } };

export type GetAddressByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetAddressByIdQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Address', id: string, name: string, otherNames?: Array<string | null> | null, tags?: Array<string | null> | null, verified?: boolean | null, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }>, countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }>, people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type GetAddressCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAddressCompaniesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Address', companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }> }> };

export type GetAddressCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAddressCountriesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Address', countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetAddressMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAddressMessagesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Address', messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }> }> };

export type GetAddressPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetAddressPeopleQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Address', people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCompanyByIdQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Company', id: string, name: string, otherNames?: Array<string | null> | null, tags?: Array<string | null> | null, verified?: boolean | null, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }>, people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type GetCompanyAddressesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCompanyAddressesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Company', addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetCompanyCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCompanyCountriesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Company', countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetCompanyMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCompanyMessagesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Company', messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }> }> };

export type GetCompanyPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCompanyPeopleQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Company', people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type AggregateCompaniesQueryVariables = Exact<{
  filters?: InputMaybe<SearchFilters>;
}>;


export type AggregateCompaniesQuery = { __typename?: 'Query', people: { __typename?: 'AggregateResults', total: number, values: Array<{ __typename?: 'AggregateValue', label: string, id: string, count: number }> }, addresses: { __typename?: 'AggregateResults', total: number, values: Array<{ __typename?: 'AggregateValue', label: string, id: string, count: number }> }, countries: { __typename?: 'AggregateResults', total: number, values: Array<{ __typename?: 'AggregateValue', label: string, id: string, count: number }> } };

export type GetCountryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCountryByIdQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Country', id: string, name: string, otherNames?: Array<string | null> | null, tags?: Array<string | null> | null, verified?: boolean | null, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }>, messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }>, people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type GetCountryCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCountryCompaniesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Country', companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }> }> };

export type GetCountryCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCountryCountriesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Country', addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetCountryMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCountryMessagesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Country', messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }> }> };

export type GetCountryPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCountryPeopleQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Country', people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type CountItemsWithPendingModificationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CountItemsWithPendingModificationsQuery = { __typename?: 'Query', nbItems: number, onGoingIndexation: Array<{ __typename?: 'IndexingPendingModification', startTime: string, nbItems: number }> };

export type MutationMutationVariables = Exact<{ [key: string]: never; }>;


export type MutationMutation = { __typename?: 'Mutation', result?: { __typename?: 'PendingModificationsIndexationReport', message?: { __typename?: 'ImportReport', count: number, errors?: Array<string> | null } | null, company?: { __typename?: 'ImportReport', count: number, errors?: Array<string> | null } | null, person?: { __typename?: 'ImportReport', count: number, errors?: Array<string> | null } | null, address?: { __typename?: 'ImportReport', count: number, errors?: Array<string> | null } | null, country?: { __typename?: 'ImportReport', count: number, errors?: Array<string> | null } | null } | null };

export type GetMessageByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetMessageByIdQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Message', id: string, year: number, message: string, filename: string, pageNumber: number, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }>, countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type GetMessageCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessageCompaniesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Message', companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }> }> };

export type GetMessageCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessageCountriesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Message', addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetMessageMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessageMessagesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Message', people: Array<{ __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null }> }> };

export type GetMessagePeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetMessagePeopleQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Message', countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetPersonByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetPersonByIdQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Person', id: string, name: string, otherNames?: Array<string | null> | null, tags?: Array<string | null> | null, verified?: boolean | null, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }>, countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }>, messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }> }> };

export type GetPersonCompaniesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPersonCompaniesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Person', companies: Array<{ __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null }> }> };

export type GetPersonCountriesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPersonCountriesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Person', addresses: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type GetPersonMessagesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPersonMessagesQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Person', messages: Array<{ __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> }> }> };

export type GetPersonPeopleQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  skip?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetPersonPeopleQuery = { __typename?: 'Query', result: Array<{ __typename?: 'Person', countries: Array<{ __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null }> }> };

export type SearchItemsQueryVariables = Exact<{
  itemType: DataItemType;
  filters: SearchFilters;
  includes?: InputMaybe<Scalars['String']['input']>;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SearchItemsQuery = { __typename?: 'Query', search?: { __typename?: 'SearchResults', total: number, results: Array<{ __typename?: 'Address', id: string, name: string, companiesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Company', id: string, name: string, addressesCount: number, countriesCount: number, messagesCount: number, peopleCount: number, years?: Array<number | null> | null, tags?: Array<string | null> | null } | { __typename?: 'Country', id: string, name: string, addressesCount: number, companiesCount: number, messagesCount: number, peopleCount: number, tags?: Array<string | null> | null } | { __typename?: 'Message', id: string, year: number, message: string, addressesCount: number, companiesCount: number, countriesCount: number, peopleCount: number, tags?: Array<string | null> | null, addresses: Array<{ __typename?: 'Address', id: string, name: string }>, companies: Array<{ __typename?: 'Company', id: string, name: string }>, countries: Array<{ __typename?: 'Country', id: string, name: string }>, people: Array<{ __typename?: 'Person', id: string, name: string }> } | { __typename?: 'Person', id: string, name: string, addressesCount: number, companiesCount: number, countriesCount: number, messagesCount: number, tags?: Array<string | null> | null } | null> } | null };

export type AggregateItemsQueryVariables = Exact<{
  itemType: DataItemType;
  field: AggregationFields;
  filters: SearchFilters;
  query?: InputMaybe<Scalars['String']['input']>;
  includes?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AggregateItemsQuery = { __typename?: 'Query', aggregate: { __typename?: 'AggregateResults', total: number, values: Array<{ __typename?: 'AggregateValue', label: string, id: string, count: number }> } };

export const AddressInlineFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<AddressInlineFragment, unknown>;
export const CompanyInlineFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<CompanyInlineFragment, unknown>;
export const CountryInlineFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<CountryInlineFragment, unknown>;
export const MessageInlineFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<MessageInlineFragment, unknown>;
export const PersonInlineFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<PersonInlineFragment, unknown>;
export const DeleteNodeByTypeIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteNodeByTypeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"deleteNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<DeleteNodeByTypeIdMutation, DeleteNodeByTypeIdMutationVariables>;
export const ChangeTypeByTypeIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ChangeTypeByTypeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"newType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"changeType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"newType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"newType"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<ChangeTypeByTypeIdMutation, ChangeTypeByTypeIdMutationVariables>;
export const RenameNodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RenameNode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"renameNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<RenameNodeMutation, RenameNodeMutationVariables>;
export const SplitByTypeIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SplitByTypeId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"values"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"splitNode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"values"},"value":{"kind":"Variable","name":{"kind":"Name","value":"values"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<SplitByTypeIdMutation, SplitByTypeIdMutationVariables>;
export const MergeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Merge"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"items"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NodeIdentification"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"mergeNodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"nodes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"items"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<MergeMutation, MergeMutationVariables>;
export const SetNodeTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNodeTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tags"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"setNodeTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"tags"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tags"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<SetNodeTagsMutation, SetNodeTagsMutationVariables>;
export const SetNodeVerifiedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetNodeVerified"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"verified"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"setNodeVerified"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"verified"},"value":{"kind":"Variable","name":{"kind":"Name","value":"verified"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<SetNodeVerifiedMutation, SetNodeVerifiedMutationVariables>;
export const GetAddressByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddressById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otherNames"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetAddressByIdQuery, GetAddressByIdQueryVariables>;
export const GetAddressCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddressCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetAddressCompaniesQuery, GetAddressCompaniesQueryVariables>;
export const GetAddressCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddressCountries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetAddressCountriesQuery, GetAddressCountriesQueryVariables>;
export const GetAddressMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddressMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetAddressMessagesQuery, GetAddressMessagesQueryVariables>;
export const GetAddressPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAddressPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetAddressPeopleQuery, GetAddressPeopleQueryVariables>;
export const GetCompanyByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otherNames"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>;
export const GetCompanyAddressesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyAddresses"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCompanyAddressesQuery, GetCompanyAddressesQueryVariables>;
export const GetCompanyCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyCountries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCompanyCountriesQuery, GetCompanyCountriesQueryVariables>;
export const GetCompanyMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCompanyMessagesQuery, GetCompanyMessagesQueryVariables>;
export const GetCompanyPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCompanyPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCompanyPeopleQuery, GetCompanyPeopleQueryVariables>;
export const AggregateCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"people"},"name":{"kind":"Name","value":"aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemType"},"value":{"kind":"EnumValue","value":"company"}},{"kind":"Argument","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"people"}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"addresses"},"name":{"kind":"Name","value":"aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemType"},"value":{"kind":"EnumValue","value":"company"}},{"kind":"Argument","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"addresses"}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"countries"},"name":{"kind":"Name","value":"aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemType"},"value":{"kind":"EnumValue","value":"company"}},{"kind":"Argument","name":{"kind":"Name","value":"field"},"value":{"kind":"EnumValue","value":"countries"}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"IntValue","value":"20"}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<AggregateCompaniesQuery, AggregateCompaniesQueryVariables>;
export const GetCountryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otherNames"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCountryByIdQuery, GetCountryByIdQueryVariables>;
export const GetCountryCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountryCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCountryCompaniesQuery, GetCountryCompaniesQueryVariables>;
export const GetCountryCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountryCountries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCountryCountriesQuery, GetCountryCountriesQueryVariables>;
export const GetCountryMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountryMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCountryMessagesQuery, GetCountryMessagesQueryVariables>;
export const GetCountryPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCountryPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetCountryPeopleQuery, GetCountryPeopleQueryVariables>;
export const CountItemsWithPendingModificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CountItemsWithPendingModifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"nbItems"},"name":{"kind":"Name","value":"countItemsWithPendingModifications"}},{"kind":"Field","alias":{"kind":"Name","value":"onGoingIndexation"},"name":{"kind":"Name","value":"indexingPendingModifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startTime"}},{"kind":"Field","name":{"kind":"Name","value":"nbItems"}}]}}]}}]} as unknown as DocumentNode<CountItemsWithPendingModificationsQuery, CountItemsWithPendingModificationsQueryVariables>;
export const MutationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Mutation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"indexPendingModifications"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"company"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"person"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"country"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}}]}}]}}]} as unknown as DocumentNode<MutationMutation, MutationMutationVariables>;
export const GetMessageByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessageById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"filename"}},{"kind":"Field","name":{"kind":"Name","value":"pageNumber"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetMessageByIdQuery, GetMessageByIdQueryVariables>;
export const GetMessageCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessageCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetMessageCompaniesQuery, GetMessageCompaniesQueryVariables>;
export const GetMessageCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessageCountries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetMessageCountriesQuery, GetMessageCountriesQueryVariables>;
export const GetMessageMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessageMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetMessageMessagesQuery, GetMessageMessagesQueryVariables>;
export const GetMessagePeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMessagePeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetMessagePeopleQuery, GetMessagePeopleQueryVariables>;
export const GetPersonByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"otherNames"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"verified"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"IntValue","value":"0"}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"20"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetPersonByIdQuery, GetPersonByIdQueryVariables>;
export const GetPersonCompaniesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonCompanies"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetPersonCompaniesQuery, GetPersonCompaniesQueryVariables>;
export const GetPersonCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonCountries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetPersonCountriesQuery, GetPersonCountriesQueryVariables>;
export const GetPersonMessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonMessages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetPersonMessagesQuery, GetPersonMessagesQueryVariables>;
export const GetPersonPeopleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPersonPeople"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"skip"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_EQ"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"skip"},"value":{"kind":"Variable","name":{"kind":"Name","value":"skip"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<GetPersonPeopleQuery, GetPersonPeopleQueryVariables>;
export const SearchItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchFilters"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"0"}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"search"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemType"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"includes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includes"}}},{"kind":"Argument","name":{"kind":"Name","value":"from"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CompanyInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AddressInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CountryInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageInline"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PersonInline"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CompanyInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Company"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"years"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AddressInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Address"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CountryInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Country"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"year"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"peopleCount"}},{"kind":"Field","name":{"kind":"Name","value":"people"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"5"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PersonInline"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Person"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"addressesCount"}},{"kind":"Field","name":{"kind":"Name","value":"companiesCount"}},{"kind":"Field","name":{"kind":"Name","value":"countriesCount"}},{"kind":"Field","name":{"kind":"Name","value":"messagesCount"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}}]}}]} as unknown as DocumentNode<SearchItemsQuery, SearchItemsQueryVariables>;
export const AggregateItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AggregateItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemType"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataItemType"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"field"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AggregationFields"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SearchFilters"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"includes"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"defaultValue":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"aggregate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemType"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemType"}}},{"kind":"Argument","name":{"kind":"Name","value":"field"},"value":{"kind":"Variable","name":{"kind":"Name","value":"field"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}},{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}},{"kind":"Argument","name":{"kind":"Name","value":"includes"},"value":{"kind":"Variable","name":{"kind":"Name","value":"includes"}}},{"kind":"Argument","name":{"kind":"Name","value":"size"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}}]} as unknown as DocumentNode<AggregateItemsQuery, AggregateItemsQueryVariables>;