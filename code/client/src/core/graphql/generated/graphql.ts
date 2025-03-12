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
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  /** @deprecated Please use field "aggregate" inside "messagesConnection" instead */
  messagesAggregate?: Maybe<AddressMessageMessagesAggregationSelection>;
  messagesConnection: AddressMessagesConnection;
  name: Scalars['String']['output'];
  people: Array<Person>;
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
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type AddressMessagesAggregateArgs = {
  where?: InputMaybe<MessageWhere>;
};

export type AddressMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressMessagesConnectionSort>>;
  where?: InputMaybe<AddressMessagesConnectionWhere>;
};

export type AddressPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressAggregate = {
  __typename?: 'AddressAggregate';
  count: Count;
  node: AddressAggregateNode;
};

export type AddressAggregateNode = {
  __typename?: 'AddressAggregateNode';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type AddressAggregateSelection = {
  __typename?: 'AddressAggregateSelection';
  count: Scalars['Int']['output'];
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type AddressConnectInput = {
  messages?: InputMaybe<Array<AddressMessagesConnectFieldInput>>;
};

export type AddressConnectOrCreateWhere = {
  node: AddressUniqueWhere;
};

export type AddressConnectWhere = {
  node: AddressWhere;
};

export type AddressCreateInput = {
  id: Scalars['ID']['input'];
  messages?: InputMaybe<AddressMessagesFieldInput>;
  name: Scalars['String']['input'];
};

export type AddressDeleteInput = {
  messages?: InputMaybe<Array<AddressMessagesDeleteFieldInput>>;
};

export type AddressDisconnectInput = {
  messages?: InputMaybe<Array<AddressMessagesDisconnectFieldInput>>;
};

export type AddressEdge = {
  __typename?: 'AddressEdge';
  cursor: Scalars['String']['output'];
  node: Address;
};

export type AddressFilters = {
  addressName?: InputMaybe<ContentFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  date?: InputMaybe<DateFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  people?: InputMaybe<KeywordsFilter>;
  peopleName?: InputMaybe<ContentFilter>;
};

export type AddressMessageMessagesAggregateSelection = {
  __typename?: 'AddressMessageMessagesAggregateSelection';
  count: CountConnection;
  node?: Maybe<AddressMessageMessagesNodeAggregateSelection>;
};

export type AddressMessageMessagesAggregationSelection = {
  __typename?: 'AddressMessageMessagesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<AddressMessageMessagesNodeAggregateSelection>;
};

export type AddressMessageMessagesNodeAggregateSelection = {
  __typename?: 'AddressMessageMessagesNodeAggregateSelection';
  filename: StringAggregateSelection;
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  message: StringAggregateSelection;
  pageNumber: IntAggregateSelection;
  raw_address: StringAggregateSelection;
  raw_company: StringAggregateSelection;
  raw_message: StringAggregateSelection;
  year: IntAggregateSelection;
};

export type AddressMessagesAggregateInput = {
  AND?: InputMaybe<Array<AddressMessagesAggregateInput>>;
  NOT?: InputMaybe<AddressMessagesAggregateInput>;
  OR?: InputMaybe<Array<AddressMessagesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<AddressMessagesNodeAggregationWhereInput>;
};

export type AddressMessagesConnectFieldInput = {
  connect?: InputMaybe<Array<MessageConnectInput>>;
  where?: InputMaybe<MessageConnectWhere>;
};

export type AddressMessagesConnectOrCreateFieldInput = {
  onCreate: AddressMessagesConnectOrCreateFieldInputOnCreate;
  where: MessageConnectOrCreateWhere;
};

export type AddressMessagesConnectOrCreateFieldInputOnCreate = {
  node: MessageOnCreateInput;
};

export type AddressMessagesConnection = {
  __typename?: 'AddressMessagesConnection';
  aggregate: AddressMessageMessagesAggregateSelection;
  edges: Array<AddressMessagesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type AddressMessagesConnectionSort = {
  node?: InputMaybe<MessageSort>;
};

export type AddressMessagesConnectionWhere = {
  AND?: InputMaybe<Array<AddressMessagesConnectionWhere>>;
  NOT?: InputMaybe<AddressMessagesConnectionWhere>;
  OR?: InputMaybe<Array<AddressMessagesConnectionWhere>>;
  node?: InputMaybe<MessageWhere>;
};

export type AddressMessagesCreateFieldInput = {
  node: MessageCreateInput;
};

export type AddressMessagesDeleteFieldInput = {
  delete?: InputMaybe<MessageDeleteInput>;
  where?: InputMaybe<AddressMessagesConnectionWhere>;
};

export type AddressMessagesDisconnectFieldInput = {
  disconnect?: InputMaybe<MessageDisconnectInput>;
  where?: InputMaybe<AddressMessagesConnectionWhere>;
};

export type AddressMessagesFieldInput = {
  connect?: InputMaybe<Array<AddressMessagesConnectFieldInput>>;
  create?: InputMaybe<Array<AddressMessagesCreateFieldInput>>;
};

export type AddressMessagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<AddressMessagesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<AddressMessagesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<AddressMessagesNodeAggregationWhereInput>>;
  filename_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  filename_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  year_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressMessagesRelationship = {
  __typename?: 'AddressMessagesRelationship';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type AddressMessagesUpdateConnectionInput = {
  node?: InputMaybe<MessageUpdateInput>;
};

export type AddressMessagesUpdateFieldInput = {
  connect?: InputMaybe<Array<AddressMessagesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<AddressMessagesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<AddressMessagesCreateFieldInput>>;
  delete?: InputMaybe<Array<AddressMessagesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<AddressMessagesDisconnectFieldInput>>;
  update?: InputMaybe<AddressMessagesUpdateConnectionInput>;
  where?: InputMaybe<AddressMessagesConnectionWhere>;
};

export enum AddressMetadata {
  Company = 'company',
  Country = 'country',
  People = 'people',
}

export type AddressOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type AddressOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more AddressSort objects to sort Addresses by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<AddressSort>>;
};

/** Fields to sort Addresses by. The order in which sorts are applied is not guaranteed when specifying many fields in one AddressSort object. */
export type AddressSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type AddressUniqueWhere = {
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
};

export type AddressUpdateInput = {
  id_SET?: InputMaybe<Scalars['ID']['input']>;
  messages?: InputMaybe<Array<AddressMessagesUpdateFieldInput>>;
  name_SET?: InputMaybe<Scalars['String']['input']>;
};

export type AddressWhere = {
  AND?: InputMaybe<Array<AddressWhere>>;
  NOT?: InputMaybe<AddressWhere>;
  OR?: InputMaybe<Array<AddressWhere>>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesAggregate?: InputMaybe<AddressMessagesAggregateInput>;
  /** Return Addresses where all of the related AddressMessagesConnections match this filter */
  messagesConnection_ALL?: InputMaybe<AddressMessagesConnectionWhere>;
  /** Return Addresses where none of the related AddressMessagesConnections match this filter */
  messagesConnection_NONE?: InputMaybe<AddressMessagesConnectionWhere>;
  /** Return Addresses where one of the related AddressMessagesConnections match this filter */
  messagesConnection_SINGLE?: InputMaybe<AddressMessagesConnectionWhere>;
  /** Return Addresses where some of the related AddressMessagesConnections match this filter */
  messagesConnection_SOME?: InputMaybe<AddressMessagesConnectionWhere>;
  /** Return Addresses where all of the related Messages match this filter */
  messages_ALL?: InputMaybe<MessageWhere>;
  /** Return Addresses where none of the related Messages match this filter */
  messages_NONE?: InputMaybe<MessageWhere>;
  /** Return Addresses where one of the related Messages match this filter */
  messages_SINGLE?: InputMaybe<MessageWhere>;
  /** Return Addresses where some of the related Messages match this filter */
  messages_SOME?: InputMaybe<MessageWhere>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type AddressesConnection = {
  __typename?: 'AddressesConnection';
  aggregate: AddressAggregate;
  edges: Array<AddressEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CompaniesConnection = {
  __typename?: 'CompaniesConnection';
  aggregate: CompanyAggregate;
  edges: Array<CompanyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Company = {
  __typename?: 'Company';
  addresses: Array<Address>;
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  /** @deprecated Please use field "aggregate" inside "messagesConnection" instead */
  messagesAggregate?: Maybe<CompanyMessageMessagesAggregationSelection>;
  messagesConnection: CompanyMessagesConnection;
  name: Scalars['String']['output'];
  people: Array<Person>;
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
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type CompanyMessagesAggregateArgs = {
  where?: InputMaybe<MessageWhere>;
};

export type CompanyMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CompanyMessagesConnectionSort>>;
  where?: InputMaybe<CompanyMessagesConnectionWhere>;
};

export type CompanyPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyAggregate = {
  __typename?: 'CompanyAggregate';
  count: Count;
  node: CompanyAggregateNode;
};

export type CompanyAggregateNode = {
  __typename?: 'CompanyAggregateNode';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type CompanyAggregateSelection = {
  __typename?: 'CompanyAggregateSelection';
  count: Scalars['Int']['output'];
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type CompanyConnectInput = {
  messages?: InputMaybe<Array<CompanyMessagesConnectFieldInput>>;
};

export type CompanyConnectOrCreateWhere = {
  node: CompanyUniqueWhere;
};

export type CompanyConnectWhere = {
  node: CompanyWhere;
};

export type CompanyCreateInput = {
  id: Scalars['ID']['input'];
  messages?: InputMaybe<CompanyMessagesFieldInput>;
  name: Scalars['String']['input'];
};

export type CompanyDeleteInput = {
  messages?: InputMaybe<Array<CompanyMessagesDeleteFieldInput>>;
};

export type CompanyDisconnectInput = {
  messages?: InputMaybe<Array<CompanyMessagesDisconnectFieldInput>>;
};

export type CompanyEdge = {
  __typename?: 'CompanyEdge';
  cursor: Scalars['String']['output'];
  node: Company;
};

export type CompanyFilters = {
  addressName?: InputMaybe<ContentFilter>;
  addresses?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  date?: InputMaybe<DateFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  people?: InputMaybe<KeywordsFilter>;
  peopleName?: InputMaybe<ContentFilter>;
};

export type CompanyMessageMessagesAggregateSelection = {
  __typename?: 'CompanyMessageMessagesAggregateSelection';
  count: CountConnection;
  node?: Maybe<CompanyMessageMessagesNodeAggregateSelection>;
};

export type CompanyMessageMessagesAggregationSelection = {
  __typename?: 'CompanyMessageMessagesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CompanyMessageMessagesNodeAggregateSelection>;
};

export type CompanyMessageMessagesNodeAggregateSelection = {
  __typename?: 'CompanyMessageMessagesNodeAggregateSelection';
  filename: StringAggregateSelection;
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  message: StringAggregateSelection;
  pageNumber: IntAggregateSelection;
  raw_address: StringAggregateSelection;
  raw_company: StringAggregateSelection;
  raw_message: StringAggregateSelection;
  year: IntAggregateSelection;
};

export type CompanyMessagesAggregateInput = {
  AND?: InputMaybe<Array<CompanyMessagesAggregateInput>>;
  NOT?: InputMaybe<CompanyMessagesAggregateInput>;
  OR?: InputMaybe<Array<CompanyMessagesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CompanyMessagesNodeAggregationWhereInput>;
};

export type CompanyMessagesConnectFieldInput = {
  connect?: InputMaybe<Array<MessageConnectInput>>;
  where?: InputMaybe<MessageConnectWhere>;
};

export type CompanyMessagesConnectOrCreateFieldInput = {
  onCreate: CompanyMessagesConnectOrCreateFieldInputOnCreate;
  where: MessageConnectOrCreateWhere;
};

export type CompanyMessagesConnectOrCreateFieldInputOnCreate = {
  node: MessageOnCreateInput;
};

export type CompanyMessagesConnection = {
  __typename?: 'CompanyMessagesConnection';
  aggregate: CompanyMessageMessagesAggregateSelection;
  edges: Array<CompanyMessagesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CompanyMessagesConnectionSort = {
  node?: InputMaybe<MessageSort>;
};

export type CompanyMessagesConnectionWhere = {
  AND?: InputMaybe<Array<CompanyMessagesConnectionWhere>>;
  NOT?: InputMaybe<CompanyMessagesConnectionWhere>;
  OR?: InputMaybe<Array<CompanyMessagesConnectionWhere>>;
  node?: InputMaybe<MessageWhere>;
};

export type CompanyMessagesCreateFieldInput = {
  node: MessageCreateInput;
};

export type CompanyMessagesDeleteFieldInput = {
  delete?: InputMaybe<MessageDeleteInput>;
  where?: InputMaybe<CompanyMessagesConnectionWhere>;
};

export type CompanyMessagesDisconnectFieldInput = {
  disconnect?: InputMaybe<MessageDisconnectInput>;
  where?: InputMaybe<CompanyMessagesConnectionWhere>;
};

export type CompanyMessagesFieldInput = {
  connect?: InputMaybe<Array<CompanyMessagesConnectFieldInput>>;
  create?: InputMaybe<Array<CompanyMessagesCreateFieldInput>>;
};

export type CompanyMessagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CompanyMessagesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CompanyMessagesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CompanyMessagesNodeAggregationWhereInput>>;
  filename_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  filename_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  year_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CompanyMessagesRelationship = {
  __typename?: 'CompanyMessagesRelationship';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type CompanyMessagesUpdateConnectionInput = {
  node?: InputMaybe<MessageUpdateInput>;
};

export type CompanyMessagesUpdateFieldInput = {
  connect?: InputMaybe<Array<CompanyMessagesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<CompanyMessagesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<CompanyMessagesCreateFieldInput>>;
  delete?: InputMaybe<Array<CompanyMessagesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CompanyMessagesDisconnectFieldInput>>;
  update?: InputMaybe<CompanyMessagesUpdateConnectionInput>;
  where?: InputMaybe<CompanyMessagesConnectionWhere>;
};

export enum CompanyMetadata {
  Address = 'address',
  Country = 'country',
  People = 'people',
}

export type CompanyOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CompanyOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CompanySort objects to sort Companies by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CompanySort>>;
};

/** Fields to sort Companies by. The order in which sorts are applied is not guaranteed when specifying many fields in one CompanySort object. */
export type CompanySort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export enum CompanySortByMethods {
  Alphabetic = 'ALPHABETIC',
  Date = 'DATE',
  NbMessages = 'NB_MESSAGES',
  Score = 'SCORE',
}

export type CompanyUniqueWhere = {
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
};

export type CompanyUpdateInput = {
  id_SET?: InputMaybe<Scalars['ID']['input']>;
  messages?: InputMaybe<Array<CompanyMessagesUpdateFieldInput>>;
  name_SET?: InputMaybe<Scalars['String']['input']>;
};

export type CompanyWhere = {
  AND?: InputMaybe<Array<CompanyWhere>>;
  NOT?: InputMaybe<CompanyWhere>;
  OR?: InputMaybe<Array<CompanyWhere>>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesAggregate?: InputMaybe<CompanyMessagesAggregateInput>;
  /** Return Companies where all of the related CompanyMessagesConnections match this filter */
  messagesConnection_ALL?: InputMaybe<CompanyMessagesConnectionWhere>;
  /** Return Companies where none of the related CompanyMessagesConnections match this filter */
  messagesConnection_NONE?: InputMaybe<CompanyMessagesConnectionWhere>;
  /** Return Companies where one of the related CompanyMessagesConnections match this filter */
  messagesConnection_SINGLE?: InputMaybe<CompanyMessagesConnectionWhere>;
  /** Return Companies where some of the related CompanyMessagesConnections match this filter */
  messagesConnection_SOME?: InputMaybe<CompanyMessagesConnectionWhere>;
  /** Return Companies where all of the related Messages match this filter */
  messages_ALL?: InputMaybe<MessageWhere>;
  /** Return Companies where none of the related Messages match this filter */
  messages_NONE?: InputMaybe<MessageWhere>;
  /** Return Companies where one of the related Messages match this filter */
  messages_SINGLE?: InputMaybe<MessageWhere>;
  /** Return Companies where some of the related Messages match this filter */
  messages_SOME?: InputMaybe<MessageWhere>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type ContentFilter = {
  query: Scalars['String']['input'];
  type: FilterTypes;
};

export type Count = {
  __typename?: 'Count';
  nodes: Scalars['Int']['output'];
};

export type CountConnection = {
  __typename?: 'CountConnection';
  edges: Scalars['Int']['output'];
  nodes: Scalars['Int']['output'];
};

export type CountResult = {
  __typename?: 'CountResult';
  byYear?: Maybe<Array<Maybe<YearCountResult>>>;
  total: Scalars['Int']['output'];
};

export type CountResultAggregate = {
  __typename?: 'CountResultAggregate';
  count: Count;
  node: CountResultAggregateNode;
};

export type CountResultAggregateNode = {
  __typename?: 'CountResultAggregateNode';
  total: IntAggregateSelection;
};

export type CountResultAggregateSelection = {
  __typename?: 'CountResultAggregateSelection';
  count: Scalars['Int']['output'];
  total: IntAggregateSelection;
};

export type CountResultCreateInput = {
  total: Scalars['Int']['input'];
};

export type CountResultEdge = {
  __typename?: 'CountResultEdge';
  cursor: Scalars['String']['output'];
  node: CountResult;
};

export type CountResultOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CountResultSort objects to sort CountResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CountResultSort>>;
};

/** Fields to sort CountResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one CountResultSort object. */
export type CountResultSort = {
  total?: InputMaybe<SortDirection>;
};

export type CountResultUpdateInput = {
  total_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  total_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  total_SET?: InputMaybe<Scalars['Int']['input']>;
};

export type CountResultWhere = {
  AND?: InputMaybe<Array<CountResultWhere>>;
  NOT?: InputMaybe<CountResultWhere>;
  OR?: InputMaybe<Array<CountResultWhere>>;
  total_EQ?: InputMaybe<Scalars['Int']['input']>;
  total_GT?: InputMaybe<Scalars['Int']['input']>;
  total_GTE?: InputMaybe<Scalars['Int']['input']>;
  total_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  total_LT?: InputMaybe<Scalars['Int']['input']>;
  total_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CountResultsConnection = {
  __typename?: 'CountResultsConnection';
  aggregate: CountResultAggregate;
  edges: Array<CountResultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CountriesConnection = {
  __typename?: 'CountriesConnection';
  aggregate: CountryAggregate;
  edges: Array<CountryEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Country = {
  __typename?: 'Country';
  addresses: Array<Address>;
  companies: Array<Company>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  /** @deprecated Please use field "aggregate" inside "messagesConnection" instead */
  messagesAggregate?: Maybe<CountryMessageMessagesAggregationSelection>;
  messagesConnection: CountryMessagesConnection;
  name: Scalars['String']['output'];
  people: Array<Person>;
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
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type CountryMessagesAggregateArgs = {
  where?: InputMaybe<MessageWhere>;
};

export type CountryMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountryMessagesConnectionSort>>;
  where?: InputMaybe<CountryMessagesConnectionWhere>;
};

export type CountryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryAggregate = {
  __typename?: 'CountryAggregate';
  count: Count;
  node: CountryAggregateNode;
};

export type CountryAggregateNode = {
  __typename?: 'CountryAggregateNode';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type CountryAggregateSelection = {
  __typename?: 'CountryAggregateSelection';
  count: Scalars['Int']['output'];
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type CountryConnectInput = {
  messages?: InputMaybe<Array<CountryMessagesConnectFieldInput>>;
};

export type CountryConnectOrCreateWhere = {
  node: CountryUniqueWhere;
};

export type CountryConnectWhere = {
  node: CountryWhere;
};

export type CountryCreateInput = {
  id: Scalars['ID']['input'];
  messages?: InputMaybe<CountryMessagesFieldInput>;
  name: Scalars['String']['input'];
};

export type CountryDeleteInput = {
  messages?: InputMaybe<Array<CountryMessagesDeleteFieldInput>>;
};

export type CountryDisconnectInput = {
  messages?: InputMaybe<Array<CountryMessagesDisconnectFieldInput>>;
};

export type CountryEdge = {
  __typename?: 'CountryEdge';
  cursor: Scalars['String']['output'];
  node: Country;
};

export type CountryFilters = {
  addressName?: InputMaybe<ContentFilter>;
  addresses?: InputMaybe<KeywordsFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  date?: InputMaybe<DateFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  people?: InputMaybe<KeywordsFilter>;
  peopleName?: InputMaybe<ContentFilter>;
};

export type CountryMessageMessagesAggregateSelection = {
  __typename?: 'CountryMessageMessagesAggregateSelection';
  count: CountConnection;
  node?: Maybe<CountryMessageMessagesNodeAggregateSelection>;
};

export type CountryMessageMessagesAggregationSelection = {
  __typename?: 'CountryMessageMessagesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<CountryMessageMessagesNodeAggregateSelection>;
};

export type CountryMessageMessagesNodeAggregateSelection = {
  __typename?: 'CountryMessageMessagesNodeAggregateSelection';
  filename: StringAggregateSelection;
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  message: StringAggregateSelection;
  pageNumber: IntAggregateSelection;
  raw_address: StringAggregateSelection;
  raw_company: StringAggregateSelection;
  raw_message: StringAggregateSelection;
  year: IntAggregateSelection;
};

export type CountryMessagesAggregateInput = {
  AND?: InputMaybe<Array<CountryMessagesAggregateInput>>;
  NOT?: InputMaybe<CountryMessagesAggregateInput>;
  OR?: InputMaybe<Array<CountryMessagesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<CountryMessagesNodeAggregationWhereInput>;
};

export type CountryMessagesConnectFieldInput = {
  connect?: InputMaybe<Array<MessageConnectInput>>;
  where?: InputMaybe<MessageConnectWhere>;
};

export type CountryMessagesConnectOrCreateFieldInput = {
  onCreate: CountryMessagesConnectOrCreateFieldInputOnCreate;
  where: MessageConnectOrCreateWhere;
};

export type CountryMessagesConnectOrCreateFieldInputOnCreate = {
  node: MessageOnCreateInput;
};

export type CountryMessagesConnection = {
  __typename?: 'CountryMessagesConnection';
  aggregate: CountryMessageMessagesAggregateSelection;
  edges: Array<CountryMessagesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type CountryMessagesConnectionSort = {
  node?: InputMaybe<MessageSort>;
};

export type CountryMessagesConnectionWhere = {
  AND?: InputMaybe<Array<CountryMessagesConnectionWhere>>;
  NOT?: InputMaybe<CountryMessagesConnectionWhere>;
  OR?: InputMaybe<Array<CountryMessagesConnectionWhere>>;
  node?: InputMaybe<MessageWhere>;
};

export type CountryMessagesCreateFieldInput = {
  node: MessageCreateInput;
};

export type CountryMessagesDeleteFieldInput = {
  delete?: InputMaybe<MessageDeleteInput>;
  where?: InputMaybe<CountryMessagesConnectionWhere>;
};

export type CountryMessagesDisconnectFieldInput = {
  disconnect?: InputMaybe<MessageDisconnectInput>;
  where?: InputMaybe<CountryMessagesConnectionWhere>;
};

export type CountryMessagesFieldInput = {
  connect?: InputMaybe<Array<CountryMessagesConnectFieldInput>>;
  create?: InputMaybe<Array<CountryMessagesCreateFieldInput>>;
};

export type CountryMessagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<CountryMessagesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<CountryMessagesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<CountryMessagesNodeAggregationWhereInput>>;
  filename_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  filename_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  year_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type CountryMessagesRelationship = {
  __typename?: 'CountryMessagesRelationship';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type CountryMessagesUpdateConnectionInput = {
  node?: InputMaybe<MessageUpdateInput>;
};

export type CountryMessagesUpdateFieldInput = {
  connect?: InputMaybe<Array<CountryMessagesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<CountryMessagesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<CountryMessagesCreateFieldInput>>;
  delete?: InputMaybe<Array<CountryMessagesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<CountryMessagesDisconnectFieldInput>>;
  update?: InputMaybe<CountryMessagesUpdateConnectionInput>;
  where?: InputMaybe<CountryMessagesConnectionWhere>;
};

export enum CountryMetadata {
  Address = 'address',
  Company = 'company',
  People = 'people',
}

export type CountryOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type CountryOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more CountrySort objects to sort Countries by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<CountrySort>>;
};

/** Fields to sort Countries by. The order in which sorts are applied is not guaranteed when specifying many fields in one CountrySort object. */
export type CountrySort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type CountryUniqueWhere = {
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
};

export type CountryUpdateInput = {
  id_SET?: InputMaybe<Scalars['ID']['input']>;
  messages?: InputMaybe<Array<CountryMessagesUpdateFieldInput>>;
  name_SET?: InputMaybe<Scalars['String']['input']>;
};

export type CountryWhere = {
  AND?: InputMaybe<Array<CountryWhere>>;
  NOT?: InputMaybe<CountryWhere>;
  OR?: InputMaybe<Array<CountryWhere>>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesAggregate?: InputMaybe<CountryMessagesAggregateInput>;
  /** Return Countries where all of the related CountryMessagesConnections match this filter */
  messagesConnection_ALL?: InputMaybe<CountryMessagesConnectionWhere>;
  /** Return Countries where none of the related CountryMessagesConnections match this filter */
  messagesConnection_NONE?: InputMaybe<CountryMessagesConnectionWhere>;
  /** Return Countries where one of the related CountryMessagesConnections match this filter */
  messagesConnection_SINGLE?: InputMaybe<CountryMessagesConnectionWhere>;
  /** Return Countries where some of the related CountryMessagesConnections match this filter */
  messagesConnection_SOME?: InputMaybe<CountryMessagesConnectionWhere>;
  /** Return Countries where all of the related Messages match this filter */
  messages_ALL?: InputMaybe<MessageWhere>;
  /** Return Countries where none of the related Messages match this filter */
  messages_NONE?: InputMaybe<MessageWhere>;
  /** Return Countries where one of the related Messages match this filter */
  messages_SINGLE?: InputMaybe<MessageWhere>;
  /** Return Countries where some of the related Messages match this filter */
  messages_SOME?: InputMaybe<MessageWhere>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAddressesMutationResponse = {
  __typename?: 'CreateAddressesMutationResponse';
  addresses: Array<Address>;
  info: CreateInfo;
};

export type CreateCompaniesMutationResponse = {
  __typename?: 'CreateCompaniesMutationResponse';
  companies: Array<Company>;
  info: CreateInfo;
};

export type CreateCountResultsMutationResponse = {
  __typename?: 'CreateCountResultsMutationResponse';
  countResults: Array<CountResult>;
  info: CreateInfo;
};

export type CreateCountriesMutationResponse = {
  __typename?: 'CreateCountriesMutationResponse';
  countries: Array<Country>;
  info: CreateInfo;
};

export type CreateImportReportsMutationResponse = {
  __typename?: 'CreateImportReportsMutationResponse';
  importReports: Array<ImportReport>;
  info: CreateInfo;
};

/** Information about the number of nodes and relationships created during a create mutation */
export type CreateInfo = {
  __typename?: 'CreateInfo';
  nodesCreated: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
};

export type CreateMessagesMutationResponse = {
  __typename?: 'CreateMessagesMutationResponse';
  info: CreateInfo;
  messages: Array<Message>;
};

export type CreatePeopleMutationResponse = {
  __typename?: 'CreatePeopleMutationResponse';
  info: CreateInfo;
  people: Array<Person>;
};

export type CreateTopValuesMutationResponse = {
  __typename?: 'CreateTopValuesMutationResponse';
  info: CreateInfo;
  topValues: Array<TopValue>;
};

export type CreateYearCountResultsMutationResponse = {
  __typename?: 'CreateYearCountResultsMutationResponse';
  info: CreateInfo;
  yearCountResults: Array<YearCountResult>;
};

export enum DataItemType {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  Person = 'person',
}

export type DateFilter = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  type: FilterTypes;
};

/** Information about the number of nodes and relationships deleted during a delete mutation */
export type DeleteInfo = {
  __typename?: 'DeleteInfo';
  nodesDeleted: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export enum FilterTypes {
  Boolean = 'boolean',
  BoundingBox = 'boundingBox',
  Content = 'content',
  Date = 'date',
  Keywords = 'keywords',
  Number = 'number',
}

export type IdAggregateSelection = {
  __typename?: 'IDAggregateSelection';
  longest?: Maybe<Scalars['ID']['output']>;
  shortest?: Maybe<Scalars['ID']['output']>;
};

export type ImportReport = {
  __typename?: 'ImportReport';
  count: Scalars['Int']['output'];
  errors?: Maybe<Array<Scalars['String']['output']>>;
};

export type ImportReportAggregate = {
  __typename?: 'ImportReportAggregate';
  count: Count;
  node: ImportReportAggregateNode;
};

export type ImportReportAggregateNode = {
  __typename?: 'ImportReportAggregateNode';
  count: IntAggregateSelection;
};

export type ImportReportAggregateSelection = {
  __typename?: 'ImportReportAggregateSelection';
  count: IntAggregateSelection;
};

export type ImportReportCreateInput = {
  count: Scalars['Int']['input'];
  errors?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ImportReportEdge = {
  __typename?: 'ImportReportEdge';
  cursor: Scalars['String']['output'];
  node: ImportReport;
};

export type ImportReportOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more ImportReportSort objects to sort ImportReports by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<ImportReportSort>>;
};

/** Fields to sort ImportReports by. The order in which sorts are applied is not guaranteed when specifying many fields in one ImportReportSort object. */
export type ImportReportSort = {
  count?: InputMaybe<SortDirection>;
};

export type ImportReportUpdateInput = {
  count_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  count_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  count_SET?: InputMaybe<Scalars['Int']['input']>;
  errors_POP?: InputMaybe<Scalars['Int']['input']>;
  errors_PUSH?: InputMaybe<Array<Scalars['String']['input']>>;
  errors_SET?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ImportReportWhere = {
  AND?: InputMaybe<Array<ImportReportWhere>>;
  NOT?: InputMaybe<ImportReportWhere>;
  OR?: InputMaybe<Array<ImportReportWhere>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  errors_EQ?: InputMaybe<Array<Scalars['String']['input']>>;
  errors_INCLUDES?: InputMaybe<Scalars['String']['input']>;
};

export type ImportReportsConnection = {
  __typename?: 'ImportReportsConnection';
  aggregate: ImportReportAggregate;
  edges: Array<ImportReportEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type IntAggregateSelection = {
  __typename?: 'IntAggregateSelection';
  average?: Maybe<Scalars['Float']['output']>;
  max?: Maybe<Scalars['Int']['output']>;
  min?: Maybe<Scalars['Int']['output']>;
  sum?: Maybe<Scalars['Int']['output']>;
};

export type KeywordsFilter = {
  type: FilterTypes;
  values: Array<Scalars['String']['input']>;
};

export type Message = {
  __typename?: 'Message';
  addresses: Address;
  /** @deprecated Please use field "aggregate" inside "addressesConnection" instead */
  addressesAggregate?: Maybe<MessageAddressAddressesAggregationSelection>;
  addressesConnection: MessageAddressesConnection;
  companies: Array<Company>;
  /** @deprecated Please use field "aggregate" inside "companiesConnection" instead */
  companiesAggregate?: Maybe<MessageCompanyCompaniesAggregationSelection>;
  companiesConnection: MessageCompaniesConnection;
  countries: Array<Country>;
  /** @deprecated Please use field "aggregate" inside "countriesConnection" instead */
  countriesAggregate?: Maybe<MessageCountryCountriesAggregationSelection>;
  countriesConnection: MessageCountriesConnection;
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  pageNumber: Scalars['Int']['output'];
  people: Array<Person>;
  /** @deprecated Please use field "aggregate" inside "peopleConnection" instead */
  peopleAggregate?: Maybe<MessagePersonPeopleAggregationSelection>;
  peopleConnection: MessagePeopleConnection;
  raw_address: Scalars['String']['output'];
  raw_company: Scalars['String']['output'];
  raw_countries?: Maybe<Array<Scalars['String']['output']>>;
  raw_message: Scalars['String']['output'];
  raw_people?: Maybe<Array<Scalars['String']['output']>>;
  year: Scalars['Int']['output'];
};

export type MessageAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressSort>>;
  where?: InputMaybe<AddressWhere>;
};

export type MessageAddressesAggregateArgs = {
  where?: InputMaybe<AddressWhere>;
};

export type MessageAddressesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageAddressesConnectionSort>>;
  where?: InputMaybe<MessageAddressesConnectionWhere>;
};

export type MessageCompaniesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CompanySort>>;
  where?: InputMaybe<CompanyWhere>;
};

export type MessageCompaniesAggregateArgs = {
  where?: InputMaybe<CompanyWhere>;
};

export type MessageCompaniesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageCompaniesConnectionSort>>;
  where?: InputMaybe<MessageCompaniesConnectionWhere>;
};

export type MessageCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type MessageCountriesAggregateArgs = {
  where?: InputMaybe<CountryWhere>;
};

export type MessageCountriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageCountriesConnectionSort>>;
  where?: InputMaybe<MessageCountriesConnectionWhere>;
};

export type MessagePeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type MessagePeopleAggregateArgs = {
  where?: InputMaybe<PersonWhere>;
};

export type MessagePeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessagePeopleConnectionSort>>;
  where?: InputMaybe<MessagePeopleConnectionWhere>;
};

export type MessageAddressAddressesAggregateSelection = {
  __typename?: 'MessageAddressAddressesAggregateSelection';
  count: CountConnection;
  node?: Maybe<MessageAddressAddressesNodeAggregateSelection>;
};

export type MessageAddressAddressesAggregationSelection = {
  __typename?: 'MessageAddressAddressesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MessageAddressAddressesNodeAggregateSelection>;
};

export type MessageAddressAddressesNodeAggregateSelection = {
  __typename?: 'MessageAddressAddressesNodeAggregateSelection';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type MessageAddressesAggregateInput = {
  AND?: InputMaybe<Array<MessageAddressesAggregateInput>>;
  NOT?: InputMaybe<MessageAddressesAggregateInput>;
  OR?: InputMaybe<Array<MessageAddressesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MessageAddressesNodeAggregationWhereInput>;
};

export type MessageAddressesConnectFieldInput = {
  connect?: InputMaybe<AddressConnectInput>;
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  where?: InputMaybe<AddressConnectWhere>;
};

export type MessageAddressesConnectOrCreateFieldInput = {
  onCreate: MessageAddressesConnectOrCreateFieldInputOnCreate;
  where: AddressConnectOrCreateWhere;
};

export type MessageAddressesConnectOrCreateFieldInputOnCreate = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: AddressOnCreateInput;
};

export type MessageAddressesConnection = {
  __typename?: 'MessageAddressesConnection';
  aggregate: MessageAddressAddressesAggregateSelection;
  edges: Array<MessageAddressesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MessageAddressesConnectionSort = {
  edge?: InputMaybe<RelaionshipPropertiesSort>;
  node?: InputMaybe<AddressSort>;
};

export type MessageAddressesConnectionWhere = {
  AND?: InputMaybe<Array<MessageAddressesConnectionWhere>>;
  NOT?: InputMaybe<MessageAddressesConnectionWhere>;
  OR?: InputMaybe<Array<MessageAddressesConnectionWhere>>;
  edge?: InputMaybe<RelaionshipPropertiesWhere>;
  node?: InputMaybe<AddressWhere>;
};

export type MessageAddressesCreateFieldInput = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: AddressCreateInput;
};

export type MessageAddressesDeleteFieldInput = {
  delete?: InputMaybe<AddressDeleteInput>;
  where?: InputMaybe<MessageAddressesConnectionWhere>;
};

export type MessageAddressesDisconnectFieldInput = {
  disconnect?: InputMaybe<AddressDisconnectInput>;
  where?: InputMaybe<MessageAddressesConnectionWhere>;
};

export type MessageAddressesFieldInput = {
  connect?: InputMaybe<MessageAddressesConnectFieldInput>;
  create?: InputMaybe<MessageAddressesCreateFieldInput>;
};

export type MessageAddressesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MessageAddressesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<MessageAddressesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<MessageAddressesNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageAddressesRelationship = {
  __typename?: 'MessageAddressesRelationship';
  cursor: Scalars['String']['output'];
  node: Address;
  properties: RelaionshipProperties;
};

export type MessageAddressesUpdateConnectionInput = {
  edge?: InputMaybe<RelaionshipPropertiesUpdateInput>;
  node?: InputMaybe<AddressUpdateInput>;
};

export type MessageAddressesUpdateFieldInput = {
  connect?: InputMaybe<MessageAddressesConnectFieldInput>;
  connectOrCreate?: InputMaybe<MessageAddressesConnectOrCreateFieldInput>;
  create?: InputMaybe<MessageAddressesCreateFieldInput>;
  delete?: InputMaybe<MessageAddressesDeleteFieldInput>;
  disconnect?: InputMaybe<MessageAddressesDisconnectFieldInput>;
  update?: InputMaybe<MessageAddressesUpdateConnectionInput>;
  where?: InputMaybe<MessageAddressesConnectionWhere>;
};

export type MessageAggregate = {
  __typename?: 'MessageAggregate';
  count: Count;
  node: MessageAggregateNode;
};

export type MessageAggregateNode = {
  __typename?: 'MessageAggregateNode';
  filename: StringAggregateSelection;
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  message: StringAggregateSelection;
  pageNumber: IntAggregateSelection;
  raw_address: StringAggregateSelection;
  raw_company: StringAggregateSelection;
  raw_message: StringAggregateSelection;
  year: IntAggregateSelection;
};

export type MessageAggregateSelection = {
  __typename?: 'MessageAggregateSelection';
  count: Scalars['Int']['output'];
  filename: StringAggregateSelection;
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  message: StringAggregateSelection;
  pageNumber: IntAggregateSelection;
  raw_address: StringAggregateSelection;
  raw_company: StringAggregateSelection;
  raw_message: StringAggregateSelection;
  year: IntAggregateSelection;
};

export type MessageCompaniesAggregateInput = {
  AND?: InputMaybe<Array<MessageCompaniesAggregateInput>>;
  NOT?: InputMaybe<MessageCompaniesAggregateInput>;
  OR?: InputMaybe<Array<MessageCompaniesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MessageCompaniesNodeAggregationWhereInput>;
};

export type MessageCompaniesConnectFieldInput = {
  connect?: InputMaybe<Array<CompanyConnectInput>>;
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  where?: InputMaybe<CompanyConnectWhere>;
};

export type MessageCompaniesConnectOrCreateFieldInput = {
  onCreate: MessageCompaniesConnectOrCreateFieldInputOnCreate;
  where: CompanyConnectOrCreateWhere;
};

export type MessageCompaniesConnectOrCreateFieldInputOnCreate = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: CompanyOnCreateInput;
};

export type MessageCompaniesConnection = {
  __typename?: 'MessageCompaniesConnection';
  aggregate: MessageCompanyCompaniesAggregateSelection;
  edges: Array<MessageCompaniesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MessageCompaniesConnectionSort = {
  edge?: InputMaybe<RelaionshipPropertiesSort>;
  node?: InputMaybe<CompanySort>;
};

export type MessageCompaniesConnectionWhere = {
  AND?: InputMaybe<Array<MessageCompaniesConnectionWhere>>;
  NOT?: InputMaybe<MessageCompaniesConnectionWhere>;
  OR?: InputMaybe<Array<MessageCompaniesConnectionWhere>>;
  edge?: InputMaybe<RelaionshipPropertiesWhere>;
  node?: InputMaybe<CompanyWhere>;
};

export type MessageCompaniesCreateFieldInput = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: CompanyCreateInput;
};

export type MessageCompaniesDeleteFieldInput = {
  delete?: InputMaybe<CompanyDeleteInput>;
  where?: InputMaybe<MessageCompaniesConnectionWhere>;
};

export type MessageCompaniesDisconnectFieldInput = {
  disconnect?: InputMaybe<CompanyDisconnectInput>;
  where?: InputMaybe<MessageCompaniesConnectionWhere>;
};

export type MessageCompaniesFieldInput = {
  connect?: InputMaybe<Array<MessageCompaniesConnectFieldInput>>;
  create?: InputMaybe<Array<MessageCompaniesCreateFieldInput>>;
};

export type MessageCompaniesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MessageCompaniesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<MessageCompaniesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<MessageCompaniesNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageCompaniesRelationship = {
  __typename?: 'MessageCompaniesRelationship';
  cursor: Scalars['String']['output'];
  node: Company;
  properties: RelaionshipProperties;
};

export type MessageCompaniesUpdateConnectionInput = {
  edge?: InputMaybe<RelaionshipPropertiesUpdateInput>;
  node?: InputMaybe<CompanyUpdateInput>;
};

export type MessageCompaniesUpdateFieldInput = {
  connect?: InputMaybe<Array<MessageCompaniesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCompaniesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<MessageCompaniesCreateFieldInput>>;
  delete?: InputMaybe<Array<MessageCompaniesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<MessageCompaniesDisconnectFieldInput>>;
  update?: InputMaybe<MessageCompaniesUpdateConnectionInput>;
  where?: InputMaybe<MessageCompaniesConnectionWhere>;
};

export type MessageCompanyCompaniesAggregateSelection = {
  __typename?: 'MessageCompanyCompaniesAggregateSelection';
  count: CountConnection;
  node?: Maybe<MessageCompanyCompaniesNodeAggregateSelection>;
};

export type MessageCompanyCompaniesAggregationSelection = {
  __typename?: 'MessageCompanyCompaniesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MessageCompanyCompaniesNodeAggregateSelection>;
};

export type MessageCompanyCompaniesNodeAggregateSelection = {
  __typename?: 'MessageCompanyCompaniesNodeAggregateSelection';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type MessageConnectInput = {
  addresses?: InputMaybe<MessageAddressesConnectFieldInput>;
  companies?: InputMaybe<Array<MessageCompaniesConnectFieldInput>>;
  countries?: InputMaybe<Array<MessageCountriesConnectFieldInput>>;
  people?: InputMaybe<Array<MessagePeopleConnectFieldInput>>;
};

export type MessageConnectOrCreateWhere = {
  node: MessageUniqueWhere;
};

export type MessageConnectWhere = {
  node: MessageWhere;
};

export type MessageCountriesAggregateInput = {
  AND?: InputMaybe<Array<MessageCountriesAggregateInput>>;
  NOT?: InputMaybe<MessageCountriesAggregateInput>;
  OR?: InputMaybe<Array<MessageCountriesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MessageCountriesNodeAggregationWhereInput>;
};

export type MessageCountriesConnectFieldInput = {
  connect?: InputMaybe<Array<CountryConnectInput>>;
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  where?: InputMaybe<CountryConnectWhere>;
};

export type MessageCountriesConnectOrCreateFieldInput = {
  onCreate: MessageCountriesConnectOrCreateFieldInputOnCreate;
  where: CountryConnectOrCreateWhere;
};

export type MessageCountriesConnectOrCreateFieldInputOnCreate = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: CountryOnCreateInput;
};

export type MessageCountriesConnection = {
  __typename?: 'MessageCountriesConnection';
  aggregate: MessageCountryCountriesAggregateSelection;
  edges: Array<MessageCountriesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MessageCountriesConnectionSort = {
  edge?: InputMaybe<RelaionshipPropertiesSort>;
  node?: InputMaybe<CountrySort>;
};

export type MessageCountriesConnectionWhere = {
  AND?: InputMaybe<Array<MessageCountriesConnectionWhere>>;
  NOT?: InputMaybe<MessageCountriesConnectionWhere>;
  OR?: InputMaybe<Array<MessageCountriesConnectionWhere>>;
  edge?: InputMaybe<RelaionshipPropertiesWhere>;
  node?: InputMaybe<CountryWhere>;
};

export type MessageCountriesCreateFieldInput = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: CountryCreateInput;
};

export type MessageCountriesDeleteFieldInput = {
  delete?: InputMaybe<CountryDeleteInput>;
  where?: InputMaybe<MessageCountriesConnectionWhere>;
};

export type MessageCountriesDisconnectFieldInput = {
  disconnect?: InputMaybe<CountryDisconnectInput>;
  where?: InputMaybe<MessageCountriesConnectionWhere>;
};

export type MessageCountriesFieldInput = {
  connect?: InputMaybe<Array<MessageCountriesConnectFieldInput>>;
  create?: InputMaybe<Array<MessageCountriesCreateFieldInput>>;
};

export type MessageCountriesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MessageCountriesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<MessageCountriesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<MessageCountriesNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageCountriesRelationship = {
  __typename?: 'MessageCountriesRelationship';
  cursor: Scalars['String']['output'];
  node: Country;
  properties: RelaionshipProperties;
};

export type MessageCountriesUpdateConnectionInput = {
  edge?: InputMaybe<RelaionshipPropertiesUpdateInput>;
  node?: InputMaybe<CountryUpdateInput>;
};

export type MessageCountriesUpdateFieldInput = {
  connect?: InputMaybe<Array<MessageCountriesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCountriesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<MessageCountriesCreateFieldInput>>;
  delete?: InputMaybe<Array<MessageCountriesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<MessageCountriesDisconnectFieldInput>>;
  update?: InputMaybe<MessageCountriesUpdateConnectionInput>;
  where?: InputMaybe<MessageCountriesConnectionWhere>;
};

export type MessageCountryCountriesAggregateSelection = {
  __typename?: 'MessageCountryCountriesAggregateSelection';
  count: CountConnection;
  node?: Maybe<MessageCountryCountriesNodeAggregateSelection>;
};

export type MessageCountryCountriesAggregationSelection = {
  __typename?: 'MessageCountryCountriesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MessageCountryCountriesNodeAggregateSelection>;
};

export type MessageCountryCountriesNodeAggregateSelection = {
  __typename?: 'MessageCountryCountriesNodeAggregateSelection';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type MessageCreateInput = {
  addresses?: InputMaybe<MessageAddressesFieldInput>;
  companies?: InputMaybe<MessageCompaniesFieldInput>;
  countries?: InputMaybe<MessageCountriesFieldInput>;
  filename: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  people?: InputMaybe<MessagePeopleFieldInput>;
  raw_address: Scalars['String']['input'];
  raw_company: Scalars['String']['input'];
  raw_countries?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_message: Scalars['String']['input'];
  raw_people?: InputMaybe<Array<Scalars['String']['input']>>;
  year: Scalars['Int']['input'];
};

export type MessageDeleteInput = {
  addresses?: InputMaybe<MessageAddressesDeleteFieldInput>;
  companies?: InputMaybe<Array<MessageCompaniesDeleteFieldInput>>;
  countries?: InputMaybe<Array<MessageCountriesDeleteFieldInput>>;
  people?: InputMaybe<Array<MessagePeopleDeleteFieldInput>>;
};

export type MessageDisconnectInput = {
  addresses?: InputMaybe<MessageAddressesDisconnectFieldInput>;
  companies?: InputMaybe<Array<MessageCompaniesDisconnectFieldInput>>;
  countries?: InputMaybe<Array<MessageCountriesDisconnectFieldInput>>;
  people?: InputMaybe<Array<MessagePeopleDisconnectFieldInput>>;
};

export type MessageEdge = {
  __typename?: 'MessageEdge';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type MessageFilters = {
  addressName?: InputMaybe<ContentFilter>;
  addresses?: InputMaybe<KeywordsFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  date?: InputMaybe<DateFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  people?: InputMaybe<KeywordsFilter>;
  peopleName?: InputMaybe<ContentFilter>;
};

export enum MessageMetadata {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  People = 'people',
}

export type MessageOnCreateInput = {
  filename: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  message: Scalars['String']['input'];
  pageNumber: Scalars['Int']['input'];
  raw_address: Scalars['String']['input'];
  raw_company: Scalars['String']['input'];
  raw_countries?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_message: Scalars['String']['input'];
  raw_people?: InputMaybe<Array<Scalars['String']['input']>>;
  year: Scalars['Int']['input'];
};

export type MessageOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more MessageSort objects to sort Messages by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<MessageSort>>;
};

export type MessagePeopleAggregateInput = {
  AND?: InputMaybe<Array<MessagePeopleAggregateInput>>;
  NOT?: InputMaybe<MessagePeopleAggregateInput>;
  OR?: InputMaybe<Array<MessagePeopleAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<MessagePeopleNodeAggregationWhereInput>;
};

export type MessagePeopleConnectFieldInput = {
  connect?: InputMaybe<Array<PersonConnectInput>>;
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  where?: InputMaybe<PersonConnectWhere>;
};

export type MessagePeopleConnectOrCreateFieldInput = {
  onCreate: MessagePeopleConnectOrCreateFieldInputOnCreate;
  where: PersonConnectOrCreateWhere;
};

export type MessagePeopleConnectOrCreateFieldInputOnCreate = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: PersonOnCreateInput;
};

export type MessagePeopleConnection = {
  __typename?: 'MessagePeopleConnection';
  aggregate: MessagePersonPeopleAggregateSelection;
  edges: Array<MessagePeopleRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MessagePeopleConnectionSort = {
  edge?: InputMaybe<RelaionshipPropertiesSort>;
  node?: InputMaybe<PersonSort>;
};

export type MessagePeopleConnectionWhere = {
  AND?: InputMaybe<Array<MessagePeopleConnectionWhere>>;
  NOT?: InputMaybe<MessagePeopleConnectionWhere>;
  OR?: InputMaybe<Array<MessagePeopleConnectionWhere>>;
  edge?: InputMaybe<RelaionshipPropertiesWhere>;
  node?: InputMaybe<PersonWhere>;
};

export type MessagePeopleCreateFieldInput = {
  edge?: InputMaybe<RelaionshipPropertiesCreateInput>;
  node: PersonCreateInput;
};

export type MessagePeopleDeleteFieldInput = {
  delete?: InputMaybe<PersonDeleteInput>;
  where?: InputMaybe<MessagePeopleConnectionWhere>;
};

export type MessagePeopleDisconnectFieldInput = {
  disconnect?: InputMaybe<PersonDisconnectInput>;
  where?: InputMaybe<MessagePeopleConnectionWhere>;
};

export type MessagePeopleFieldInput = {
  connect?: InputMaybe<Array<MessagePeopleConnectFieldInput>>;
  create?: InputMaybe<Array<MessagePeopleCreateFieldInput>>;
};

export type MessagePeopleNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<MessagePeopleNodeAggregationWhereInput>>;
  NOT?: InputMaybe<MessagePeopleNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<MessagePeopleNodeAggregationWhereInput>>;
  name_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  name_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  name_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  name_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type MessagePeopleRelationship = {
  __typename?: 'MessagePeopleRelationship';
  cursor: Scalars['String']['output'];
  node: Person;
  properties: RelaionshipProperties;
};

export type MessagePeopleUpdateConnectionInput = {
  edge?: InputMaybe<RelaionshipPropertiesUpdateInput>;
  node?: InputMaybe<PersonUpdateInput>;
};

export type MessagePeopleUpdateFieldInput = {
  connect?: InputMaybe<Array<MessagePeopleConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<MessagePeopleConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<MessagePeopleCreateFieldInput>>;
  delete?: InputMaybe<Array<MessagePeopleDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<MessagePeopleDisconnectFieldInput>>;
  update?: InputMaybe<MessagePeopleUpdateConnectionInput>;
  where?: InputMaybe<MessagePeopleConnectionWhere>;
};

export type MessagePersonPeopleAggregateSelection = {
  __typename?: 'MessagePersonPeopleAggregateSelection';
  count: CountConnection;
  node?: Maybe<MessagePersonPeopleNodeAggregateSelection>;
};

export type MessagePersonPeopleAggregationSelection = {
  __typename?: 'MessagePersonPeopleAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<MessagePersonPeopleNodeAggregateSelection>;
};

export type MessagePersonPeopleNodeAggregateSelection = {
  __typename?: 'MessagePersonPeopleNodeAggregateSelection';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

/** Fields to sort Messages by. The order in which sorts are applied is not guaranteed when specifying many fields in one MessageSort object. */
export type MessageSort = {
  filename?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  message?: InputMaybe<SortDirection>;
  pageNumber?: InputMaybe<SortDirection>;
  raw_address?: InputMaybe<SortDirection>;
  raw_company?: InputMaybe<SortDirection>;
  raw_message?: InputMaybe<SortDirection>;
  year?: InputMaybe<SortDirection>;
};

export enum MessageSortByMethods {
  Date = 'DATE',
  Score = 'SCORE',
}

export type MessageUniqueWhere = {
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
};

export type MessageUpdateInput = {
  addresses?: InputMaybe<MessageAddressesUpdateFieldInput>;
  companies?: InputMaybe<Array<MessageCompaniesUpdateFieldInput>>;
  countries?: InputMaybe<Array<MessageCountriesUpdateFieldInput>>;
  filename_SET?: InputMaybe<Scalars['String']['input']>;
  id_SET?: InputMaybe<Scalars['ID']['input']>;
  message_SET?: InputMaybe<Scalars['String']['input']>;
  pageNumber_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SET?: InputMaybe<Scalars['Int']['input']>;
  people?: InputMaybe<Array<MessagePeopleUpdateFieldInput>>;
  raw_address_SET?: InputMaybe<Scalars['String']['input']>;
  raw_company_SET?: InputMaybe<Scalars['String']['input']>;
  raw_countries_POP?: InputMaybe<Scalars['Int']['input']>;
  raw_countries_PUSH?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_countries_SET?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_message_SET?: InputMaybe<Scalars['String']['input']>;
  raw_people_POP?: InputMaybe<Scalars['Int']['input']>;
  raw_people_PUSH?: InputMaybe<Array<Scalars['String']['input']>>;
  raw_people_SET?: InputMaybe<Array<Scalars['String']['input']>>;
  year_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  year_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  year_SET?: InputMaybe<Scalars['Int']['input']>;
};

export type MessageWhere = {
  AND?: InputMaybe<Array<MessageWhere>>;
  NOT?: InputMaybe<MessageWhere>;
  OR?: InputMaybe<Array<MessageWhere>>;
  addresses?: InputMaybe<AddressWhere>;
  addressesAggregate?: InputMaybe<MessageAddressesAggregateInput>;
  addressesConnection?: InputMaybe<MessageAddressesConnectionWhere>;
  companiesAggregate?: InputMaybe<MessageCompaniesAggregateInput>;
  /** Return Messages where all of the related MessageCompaniesConnections match this filter */
  companiesConnection_ALL?: InputMaybe<MessageCompaniesConnectionWhere>;
  /** Return Messages where none of the related MessageCompaniesConnections match this filter */
  companiesConnection_NONE?: InputMaybe<MessageCompaniesConnectionWhere>;
  /** Return Messages where one of the related MessageCompaniesConnections match this filter */
  companiesConnection_SINGLE?: InputMaybe<MessageCompaniesConnectionWhere>;
  /** Return Messages where some of the related MessageCompaniesConnections match this filter */
  companiesConnection_SOME?: InputMaybe<MessageCompaniesConnectionWhere>;
  /** Return Messages where all of the related Companies match this filter */
  companies_ALL?: InputMaybe<CompanyWhere>;
  /** Return Messages where none of the related Companies match this filter */
  companies_NONE?: InputMaybe<CompanyWhere>;
  /** Return Messages where one of the related Companies match this filter */
  companies_SINGLE?: InputMaybe<CompanyWhere>;
  /** Return Messages where some of the related Companies match this filter */
  companies_SOME?: InputMaybe<CompanyWhere>;
  countriesAggregate?: InputMaybe<MessageCountriesAggregateInput>;
  /** Return Messages where all of the related MessageCountriesConnections match this filter */
  countriesConnection_ALL?: InputMaybe<MessageCountriesConnectionWhere>;
  /** Return Messages where none of the related MessageCountriesConnections match this filter */
  countriesConnection_NONE?: InputMaybe<MessageCountriesConnectionWhere>;
  /** Return Messages where one of the related MessageCountriesConnections match this filter */
  countriesConnection_SINGLE?: InputMaybe<MessageCountriesConnectionWhere>;
  /** Return Messages where some of the related MessageCountriesConnections match this filter */
  countriesConnection_SOME?: InputMaybe<MessageCountriesConnectionWhere>;
  /** Return Messages where all of the related Countries match this filter */
  countries_ALL?: InputMaybe<CountryWhere>;
  /** Return Messages where none of the related Countries match this filter */
  countries_NONE?: InputMaybe<CountryWhere>;
  /** Return Messages where one of the related Countries match this filter */
  countries_SINGLE?: InputMaybe<CountryWhere>;
  /** Return Messages where some of the related Countries match this filter */
  countries_SOME?: InputMaybe<CountryWhere>;
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
  peopleAggregate?: InputMaybe<MessagePeopleAggregateInput>;
  /** Return Messages where all of the related MessagePeopleConnections match this filter */
  peopleConnection_ALL?: InputMaybe<MessagePeopleConnectionWhere>;
  /** Return Messages where none of the related MessagePeopleConnections match this filter */
  peopleConnection_NONE?: InputMaybe<MessagePeopleConnectionWhere>;
  /** Return Messages where one of the related MessagePeopleConnections match this filter */
  peopleConnection_SINGLE?: InputMaybe<MessagePeopleConnectionWhere>;
  /** Return Messages where some of the related MessagePeopleConnections match this filter */
  peopleConnection_SOME?: InputMaybe<MessagePeopleConnectionWhere>;
  /** Return Messages where all of the related People match this filter */
  people_ALL?: InputMaybe<PersonWhere>;
  /** Return Messages where none of the related People match this filter */
  people_NONE?: InputMaybe<PersonWhere>;
  /** Return Messages where one of the related People match this filter */
  people_SINGLE?: InputMaybe<PersonWhere>;
  /** Return Messages where some of the related People match this filter */
  people_SOME?: InputMaybe<PersonWhere>;
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
  aggregate: MessageAggregate;
  edges: Array<MessageEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Change node's type */
  changeType: NodeItem;
  createAddresses: CreateAddressesMutationResponse;
  createCompanies: CreateCompaniesMutationResponse;
  createCountResults: CreateCountResultsMutationResponse;
  createCountries: CreateCountriesMutationResponse;
  createImportReports: CreateImportReportsMutationResponse;
  createMessages: CreateMessagesMutationResponse;
  /** Create a new node on the specified message */
  createNode: NodeItem;
  createPeople: CreatePeopleMutationResponse;
  createTopValues: CreateTopValuesMutationResponse;
  createYearCountResults: CreateYearCountResultsMutationResponse;
  deleteAddresses: DeleteInfo;
  deleteCompanies: DeleteInfo;
  deleteCountResults: DeleteInfo;
  deleteCountries: DeleteInfo;
  deleteImportReports: DeleteInfo;
  deleteMessages: DeleteInfo;
  /** Delete a node */
  deleteNode: Scalars['Boolean']['output'];
  deletePeople: DeleteInfo;
  deleteTopValues: DeleteInfo;
  deleteYearCountResults: DeleteInfo;
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
  updateAddresses: UpdateAddressesMutationResponse;
  updateCompanies: UpdateCompaniesMutationResponse;
  updateCountResults: UpdateCountResultsMutationResponse;
  updateCountries: UpdateCountriesMutationResponse;
  updateImportReports: UpdateImportReportsMutationResponse;
  updateMessages: UpdateMessagesMutationResponse;
  updatePeople: UpdatePeopleMutationResponse;
  updateTopValues: UpdateTopValuesMutationResponse;
  updateYearCountResults: UpdateYearCountResultsMutationResponse;
};

export type MutationChangeTypeArgs = {
  id: Scalars['ID']['input'];
  newType: DataItemType;
  type: DataItemType;
};

export type MutationCreateAddressesArgs = {
  input: Array<AddressCreateInput>;
};

export type MutationCreateCompaniesArgs = {
  input: Array<CompanyCreateInput>;
};

export type MutationCreateCountResultsArgs = {
  input: Array<CountResultCreateInput>;
};

export type MutationCreateCountriesArgs = {
  input: Array<CountryCreateInput>;
};

export type MutationCreateImportReportsArgs = {
  input: Array<ImportReportCreateInput>;
};

export type MutationCreateMessagesArgs = {
  input: Array<MessageCreateInput>;
};

export type MutationCreateNodeArgs = {
  messageId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  type: DataItemType;
};

export type MutationCreatePeopleArgs = {
  input: Array<PersonCreateInput>;
};

export type MutationCreateTopValuesArgs = {
  input: Array<TopValueCreateInput>;
};

export type MutationCreateYearCountResultsArgs = {
  input: Array<YearCountResultCreateInput>;
};

export type MutationDeleteAddressesArgs = {
  delete?: InputMaybe<AddressDeleteInput>;
  where?: InputMaybe<AddressWhere>;
};

export type MutationDeleteCompaniesArgs = {
  delete?: InputMaybe<CompanyDeleteInput>;
  where?: InputMaybe<CompanyWhere>;
};

export type MutationDeleteCountResultsArgs = {
  where?: InputMaybe<CountResultWhere>;
};

export type MutationDeleteCountriesArgs = {
  delete?: InputMaybe<CountryDeleteInput>;
  where?: InputMaybe<CountryWhere>;
};

export type MutationDeleteImportReportsArgs = {
  where?: InputMaybe<ImportReportWhere>;
};

export type MutationDeleteMessagesArgs = {
  delete?: InputMaybe<MessageDeleteInput>;
  where?: InputMaybe<MessageWhere>;
};

export type MutationDeleteNodeArgs = {
  id: Scalars['ID']['input'];
  type: DataItemType;
};

export type MutationDeletePeopleArgs = {
  delete?: InputMaybe<PersonDeleteInput>;
  where?: InputMaybe<PersonWhere>;
};

export type MutationDeleteTopValuesArgs = {
  where?: InputMaybe<TopValueWhere>;
};

export type MutationDeleteYearCountResultsArgs = {
  where?: InputMaybe<YearCountResultWhere>;
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

export type MutationUpdateAddressesArgs = {
  update?: InputMaybe<AddressUpdateInput>;
  where?: InputMaybe<AddressWhere>;
};

export type MutationUpdateCompaniesArgs = {
  update?: InputMaybe<CompanyUpdateInput>;
  where?: InputMaybe<CompanyWhere>;
};

export type MutationUpdateCountResultsArgs = {
  update?: InputMaybe<CountResultUpdateInput>;
  where?: InputMaybe<CountResultWhere>;
};

export type MutationUpdateCountriesArgs = {
  update?: InputMaybe<CountryUpdateInput>;
  where?: InputMaybe<CountryWhere>;
};

export type MutationUpdateImportReportsArgs = {
  update?: InputMaybe<ImportReportUpdateInput>;
  where?: InputMaybe<ImportReportWhere>;
};

export type MutationUpdateMessagesArgs = {
  update?: InputMaybe<MessageUpdateInput>;
  where?: InputMaybe<MessageWhere>;
};

export type MutationUpdatePeopleArgs = {
  update?: InputMaybe<PersonUpdateInput>;
  where?: InputMaybe<PersonWhere>;
};

export type MutationUpdateTopValuesArgs = {
  update?: InputMaybe<TopValueUpdateInput>;
  where?: InputMaybe<TopValueWhere>;
};

export type MutationUpdateYearCountResultsArgs = {
  update?: InputMaybe<YearCountResultUpdateInput>;
  where?: InputMaybe<YearCountResultWhere>;
};

export type NodeIdentification = {
  id: Scalars['ID']['input'];
  type: DataItemType;
};

export type NodeItem = Address | Company | Country | Message | Person;

export type NodeItemWhere = {
  Address?: InputMaybe<AddressWhere>;
  Company?: InputMaybe<CompanyWhere>;
  Country?: InputMaybe<CountryWhere>;
  Message?: InputMaybe<MessageWhere>;
  Person?: InputMaybe<PersonWhere>;
};

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
  aggregate: PersonAggregate;
  edges: Array<PersonEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PeopleFilters = {
  addressName?: InputMaybe<ContentFilter>;
  addresses?: InputMaybe<KeywordsFilter>;
  companies?: InputMaybe<KeywordsFilter>;
  companyName?: InputMaybe<ContentFilter>;
  countries?: InputMaybe<KeywordsFilter>;
  date?: InputMaybe<DateFilter>;
  messageContent?: InputMaybe<ContentFilter>;
  peopleName?: InputMaybe<ContentFilter>;
};

export enum PeopleMetadata {
  Address = 'address',
  Company = 'company',
  Country = 'country',
}

export type Person = {
  __typename?: 'Person';
  addresses: Array<Address>;
  companies: Array<Company>;
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
  /** @deprecated Please use field "aggregate" inside "messagesConnection" instead */
  messagesAggregate?: Maybe<PersonMessageMessagesAggregationSelection>;
  messagesConnection: PersonMessagesConnection;
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
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type PersonMessagesAggregateArgs = {
  where?: InputMaybe<MessageWhere>;
};

export type PersonMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonMessagesConnectionSort>>;
  where?: InputMaybe<PersonMessagesConnectionWhere>;
};

export type PersonAggregate = {
  __typename?: 'PersonAggregate';
  count: Count;
  node: PersonAggregateNode;
};

export type PersonAggregateNode = {
  __typename?: 'PersonAggregateNode';
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type PersonAggregateSelection = {
  __typename?: 'PersonAggregateSelection';
  count: Scalars['Int']['output'];
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  name: StringAggregateSelection;
};

export type PersonConnectInput = {
  messages?: InputMaybe<Array<PersonMessagesConnectFieldInput>>;
};

export type PersonConnectOrCreateWhere = {
  node: PersonUniqueWhere;
};

export type PersonConnectWhere = {
  node: PersonWhere;
};

export type PersonCreateInput = {
  id: Scalars['ID']['input'];
  messages?: InputMaybe<PersonMessagesFieldInput>;
  name: Scalars['String']['input'];
};

export type PersonDeleteInput = {
  messages?: InputMaybe<Array<PersonMessagesDeleteFieldInput>>;
};

export type PersonDisconnectInput = {
  messages?: InputMaybe<Array<PersonMessagesDisconnectFieldInput>>;
};

export type PersonEdge = {
  __typename?: 'PersonEdge';
  cursor: Scalars['String']['output'];
  node: Person;
};

export type PersonMessageMessagesAggregateSelection = {
  __typename?: 'PersonMessageMessagesAggregateSelection';
  count: CountConnection;
  node?: Maybe<PersonMessageMessagesNodeAggregateSelection>;
};

export type PersonMessageMessagesAggregationSelection = {
  __typename?: 'PersonMessageMessagesAggregationSelection';
  count: Scalars['Int']['output'];
  node?: Maybe<PersonMessageMessagesNodeAggregateSelection>;
};

export type PersonMessageMessagesNodeAggregateSelection = {
  __typename?: 'PersonMessageMessagesNodeAggregateSelection';
  filename: StringAggregateSelection;
  /** @deprecated aggregation of ID fields are deprecated and will be removed */
  id: IdAggregateSelection;
  message: StringAggregateSelection;
  pageNumber: IntAggregateSelection;
  raw_address: StringAggregateSelection;
  raw_company: StringAggregateSelection;
  raw_message: StringAggregateSelection;
  year: IntAggregateSelection;
};

export type PersonMessagesAggregateInput = {
  AND?: InputMaybe<Array<PersonMessagesAggregateInput>>;
  NOT?: InputMaybe<PersonMessagesAggregateInput>;
  OR?: InputMaybe<Array<PersonMessagesAggregateInput>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  node?: InputMaybe<PersonMessagesNodeAggregationWhereInput>;
};

export type PersonMessagesConnectFieldInput = {
  connect?: InputMaybe<Array<MessageConnectInput>>;
  where?: InputMaybe<MessageConnectWhere>;
};

export type PersonMessagesConnectOrCreateFieldInput = {
  onCreate: PersonMessagesConnectOrCreateFieldInputOnCreate;
  where: MessageConnectOrCreateWhere;
};

export type PersonMessagesConnectOrCreateFieldInputOnCreate = {
  node: MessageOnCreateInput;
};

export type PersonMessagesConnection = {
  __typename?: 'PersonMessagesConnection';
  aggregate: PersonMessageMessagesAggregateSelection;
  edges: Array<PersonMessagesRelationship>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PersonMessagesConnectionSort = {
  node?: InputMaybe<MessageSort>;
};

export type PersonMessagesConnectionWhere = {
  AND?: InputMaybe<Array<PersonMessagesConnectionWhere>>;
  NOT?: InputMaybe<PersonMessagesConnectionWhere>;
  OR?: InputMaybe<Array<PersonMessagesConnectionWhere>>;
  node?: InputMaybe<MessageWhere>;
};

export type PersonMessagesCreateFieldInput = {
  node: MessageCreateInput;
};

export type PersonMessagesDeleteFieldInput = {
  delete?: InputMaybe<MessageDeleteInput>;
  where?: InputMaybe<PersonMessagesConnectionWhere>;
};

export type PersonMessagesDisconnectFieldInput = {
  disconnect?: InputMaybe<MessageDisconnectInput>;
  where?: InputMaybe<PersonMessagesConnectionWhere>;
};

export type PersonMessagesFieldInput = {
  connect?: InputMaybe<Array<PersonMessagesConnectFieldInput>>;
  create?: InputMaybe<Array<PersonMessagesCreateFieldInput>>;
};

export type PersonMessagesNodeAggregationWhereInput = {
  AND?: InputMaybe<Array<PersonMessagesNodeAggregationWhereInput>>;
  NOT?: InputMaybe<PersonMessagesNodeAggregationWhereInput>;
  OR?: InputMaybe<Array<PersonMessagesNodeAggregationWhereInput>>;
  filename_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  filename_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  filename_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  filename_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  pageNumber_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  pageNumber_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_address_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_address_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_address_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_company_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_company_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_company_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_AVERAGE_LENGTH_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_GTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LT?: InputMaybe<Scalars['Float']['input']>;
  raw_message_AVERAGE_LENGTH_LTE?: InputMaybe<Scalars['Float']['input']>;
  raw_message_LONGEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_LONGEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_GTE?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LT?: InputMaybe<Scalars['Int']['input']>;
  raw_message_SHORTEST_LENGTH_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_AVERAGE_EQUAL?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_GTE?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LT?: InputMaybe<Scalars['Float']['input']>;
  year_AVERAGE_LTE?: InputMaybe<Scalars['Float']['input']>;
  year_MAX_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MAX_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LT?: InputMaybe<Scalars['Int']['input']>;
  year_MIN_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_EQUAL?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LT?: InputMaybe<Scalars['Int']['input']>;
  year_SUM_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type PersonMessagesRelationship = {
  __typename?: 'PersonMessagesRelationship';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type PersonMessagesUpdateConnectionInput = {
  node?: InputMaybe<MessageUpdateInput>;
};

export type PersonMessagesUpdateFieldInput = {
  connect?: InputMaybe<Array<PersonMessagesConnectFieldInput>>;
  connectOrCreate?: InputMaybe<Array<PersonMessagesConnectOrCreateFieldInput>>;
  create?: InputMaybe<Array<PersonMessagesCreateFieldInput>>;
  delete?: InputMaybe<Array<PersonMessagesDeleteFieldInput>>;
  disconnect?: InputMaybe<Array<PersonMessagesDisconnectFieldInput>>;
  update?: InputMaybe<PersonMessagesUpdateConnectionInput>;
  where?: InputMaybe<PersonMessagesConnectionWhere>;
};

export type PersonOnCreateInput = {
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
};

export type PersonOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more PersonSort objects to sort People by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<PersonSort>>;
};

/** Fields to sort People by. The order in which sorts are applied is not guaranteed when specifying many fields in one PersonSort object. */
export type PersonSort = {
  id?: InputMaybe<SortDirection>;
  name?: InputMaybe<SortDirection>;
};

export type PersonUniqueWhere = {
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
};

export type PersonUpdateInput = {
  id_SET?: InputMaybe<Scalars['ID']['input']>;
  messages?: InputMaybe<Array<PersonMessagesUpdateFieldInput>>;
  name_SET?: InputMaybe<Scalars['String']['input']>;
};

export type PersonWhere = {
  AND?: InputMaybe<Array<PersonWhere>>;
  NOT?: InputMaybe<PersonWhere>;
  OR?: InputMaybe<Array<PersonWhere>>;
  id_CONTAINS?: InputMaybe<Scalars['ID']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['ID']['input']>;
  id_EQ?: InputMaybe<Scalars['ID']['input']>;
  id_IN?: InputMaybe<Array<Scalars['ID']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['ID']['input']>;
  messagesAggregate?: InputMaybe<PersonMessagesAggregateInput>;
  /** Return People where all of the related PersonMessagesConnections match this filter */
  messagesConnection_ALL?: InputMaybe<PersonMessagesConnectionWhere>;
  /** Return People where none of the related PersonMessagesConnections match this filter */
  messagesConnection_NONE?: InputMaybe<PersonMessagesConnectionWhere>;
  /** Return People where one of the related PersonMessagesConnections match this filter */
  messagesConnection_SINGLE?: InputMaybe<PersonMessagesConnectionWhere>;
  /** Return People where some of the related PersonMessagesConnections match this filter */
  messagesConnection_SOME?: InputMaybe<PersonMessagesConnectionWhere>;
  /** Return People where all of the related Messages match this filter */
  messages_ALL?: InputMaybe<MessageWhere>;
  /** Return People where none of the related Messages match this filter */
  messages_NONE?: InputMaybe<MessageWhere>;
  /** Return People where one of the related Messages match this filter */
  messages_SINGLE?: InputMaybe<MessageWhere>;
  /** Return People where some of the related Messages match this filter */
  messages_SOME?: InputMaybe<MessageWhere>;
  name_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  name_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  name_EQ?: InputMaybe<Scalars['String']['input']>;
  name_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  name_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  _getNodesItem: Array<NodeItem>;
  addresses: Array<Address>;
  /** @deprecated Please use the explicit field "aggregate" inside "addressesConnection" instead */
  addressesAggregate: AddressAggregateSelection;
  addressesConnection: AddressesConnection;
  companies: Array<Company>;
  /** @deprecated Please use the explicit field "aggregate" inside "companiesConnection" instead */
  companiesAggregate: CompanyAggregateSelection;
  companiesConnection: CompaniesConnection;
  countAddress?: Maybe<CountResult>;
  countCompany?: Maybe<CountResult>;
  countCountry?: Maybe<CountResult>;
  /** Count Items respecting a set of filters, option to add count by year */
  countMessage?: Maybe<CountResult>;
  countPeople?: Maybe<CountResult>;
  countResults: Array<CountResult>;
  /** @deprecated Please use the explicit field "aggregate" inside "countResultsConnection" instead */
  countResultsAggregate: CountResultAggregateSelection;
  countResultsConnection: CountResultsConnection;
  countries: Array<Country>;
  /** @deprecated Please use the explicit field "aggregate" inside "countriesConnection" instead */
  countriesAggregate: CountryAggregateSelection;
  countriesConnection: CountriesConnection;
  importReports: Array<ImportReport>;
  /** @deprecated Please use the explicit field "aggregate" inside "importReportsConnection" instead */
  importReportsAggregate: ImportReportAggregateSelection;
  importReportsConnection: ImportReportsConnection;
  messages: Array<Message>;
  /** @deprecated Please use the explicit field "aggregate" inside "messagesConnection" instead */
  messagesAggregate: MessageAggregateSelection;
  messagesConnection: MessagesConnection;
  nodeItems: Array<NodeItem>;
  people: Array<Person>;
  /** @deprecated Please use the explicit field "aggregate" inside "peopleConnection" instead */
  peopleAggregate: PersonAggregateSelection;
  peopleConnection: PeopleConnection;
  searchAddress?: Maybe<Array<Maybe<Address>>>;
  searchCompany?: Maybe<Array<Maybe<Company>>>;
  searchCountry?: Maybe<Array<Maybe<Country>>>;
  /** Search for Items using a set of filters */
  searchMessage?: Maybe<Array<Maybe<Message>>>;
  searchPeople?: Maybe<Array<Maybe<Person>>>;
  topAddressMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topCompanyMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topCountryMetadata?: Maybe<Array<Maybe<TopValue>>>;
  /** Retrieve Top metadata values in Items which respect a set of filters */
  topMessageMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topPeopleMetadata?: Maybe<Array<Maybe<TopValue>>>;
  topValues: Array<TopValue>;
  /** @deprecated Please use the explicit field "aggregate" inside "topValuesConnection" instead */
  topValuesAggregate: TopValueAggregateSelection;
  topValuesConnection: TopValuesConnection;
  yearCountResults: Array<YearCountResult>;
  /** @deprecated Please use the explicit field "aggregate" inside "yearCountResultsConnection" instead */
  yearCountResultsAggregate: YearCountResultAggregateSelection;
  yearCountResultsConnection: YearCountResultsConnection;
};

export type QueryAddressesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<AddressSort>>;
  where?: InputMaybe<AddressWhere>;
};

export type QueryAddressesAggregateArgs = {
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

export type QueryCompaniesAggregateArgs = {
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
  filters: AddressFilters;
};

export type QueryCountCompanyArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: CompanyFilters;
};

export type QueryCountCountryArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: CountryFilters;
};

export type QueryCountMessageArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: MessageFilters;
};

export type QueryCountPeopleArgs = {
  byYear?: InputMaybe<Scalars['Boolean']['input']>;
  filters: PeopleFilters;
};

export type QueryCountResultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountResultSort>>;
  where?: InputMaybe<CountResultWhere>;
};

export type QueryCountResultsAggregateArgs = {
  where?: InputMaybe<CountResultWhere>;
};

export type QueryCountResultsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountResultSort>>;
  where?: InputMaybe<CountResultWhere>;
};

export type QueryCountriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type QueryCountriesAggregateArgs = {
  where?: InputMaybe<CountryWhere>;
};

export type QueryCountriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<CountrySort>>;
  where?: InputMaybe<CountryWhere>;
};

export type QueryImportReportsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ImportReportSort>>;
  where?: InputMaybe<ImportReportWhere>;
};

export type QueryImportReportsAggregateArgs = {
  where?: InputMaybe<ImportReportWhere>;
};

export type QueryImportReportsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<ImportReportSort>>;
  where?: InputMaybe<ImportReportWhere>;
};

export type QueryMessagesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type QueryMessagesAggregateArgs = {
  where?: InputMaybe<MessageWhere>;
};

export type QueryMessagesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<MessageSort>>;
  where?: InputMaybe<MessageWhere>;
};

export type QueryNodeItemsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<NodeItemWhere>;
};

export type QueryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type QueryPeopleAggregateArgs = {
  where?: InputMaybe<PersonWhere>;
};

export type QueryPeopleConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<PersonSort>>;
  where?: InputMaybe<PersonWhere>;
};

export type QuerySearchAddressArgs = {
  filters: AddressFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  sortBy?: InputMaybe<SortByMethods>;
};

export type QuerySearchCompanyArgs = {
  filters: CompanyFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  sortBy?: InputMaybe<CompanySortByMethods>;
};

export type QuerySearchCountryArgs = {
  filters: CountryFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  sortBy?: InputMaybe<SortByMethods>;
};

export type QuerySearchMessageArgs = {
  filters: MessageFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  sortBy?: InputMaybe<MessageSortByMethods>;
};

export type QuerySearchPeopleArgs = {
  filters: PeopleFilters;
  from?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
  sortBy?: InputMaybe<SortByMethods>;
};

export type QueryTopAddressMetadataArgs = {
  filters: AddressFilters;
  limit: Scalars['Int']['input'];
  metadataModel: AddressMetadata;
};

export type QueryTopCompanyMetadataArgs = {
  filters: CompanyFilters;
  limit: Scalars['Int']['input'];
  metadataModel: CompanyMetadata;
};

export type QueryTopCountryMetadataArgs = {
  filters: CountryFilters;
  limit: Scalars['Int']['input'];
  metadataModel: CountryMetadata;
};

export type QueryTopMessageMetadataArgs = {
  filters: MessageFilters;
  limit: Scalars['Int']['input'];
  metadataModel: MessageMetadata;
};

export type QueryTopPeopleMetadataArgs = {
  filters: PeopleFilters;
  limit: Scalars['Int']['input'];
  metadataModel: PeopleMetadata;
};

export type QueryTopValuesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<TopValueSort>>;
  where?: InputMaybe<TopValueWhere>;
};

export type QueryTopValuesAggregateArgs = {
  where?: InputMaybe<TopValueWhere>;
};

export type QueryTopValuesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<TopValueSort>>;
  where?: InputMaybe<TopValueWhere>;
};

export type QueryYearCountResultsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<YearCountResultSort>>;
  where?: InputMaybe<YearCountResultWhere>;
};

export type QueryYearCountResultsAggregateArgs = {
  where?: InputMaybe<YearCountResultWhere>;
};

export type QueryYearCountResultsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<Array<YearCountResultSort>>;
  where?: InputMaybe<YearCountResultWhere>;
};

/** Input type for options that can be specified on a query operation. */
export type QueryOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

/**
 * The edge properties for the following fields:
 * * Message.companies
 * * Message.addresses
 * * Message.people
 * * Message.countries
 */
export type RelaionshipProperties = {
  __typename?: 'RelaionshipProperties';
  deleted?: Maybe<Scalars['Boolean']['output']>;
};

export type RelaionshipPropertiesCreateInput = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RelaionshipPropertiesSort = {
  deleted?: InputMaybe<SortDirection>;
};

export type RelaionshipPropertiesUpdateInput = {
  deleted_SET?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RelaionshipPropertiesWhere = {
  AND?: InputMaybe<Array<RelaionshipPropertiesWhere>>;
  NOT?: InputMaybe<RelaionshipPropertiesWhere>;
  OR?: InputMaybe<Array<RelaionshipPropertiesWhere>>;
  deleted_EQ?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SortByMethods {
  Alphabetic = 'ALPHABETIC',
  Date = 'DATE',
  NbCompanies = 'NB_COMPANIES',
  NbMessages = 'NB_MESSAGES',
  Score = 'SCORE',
}

/** An enum for sorting in either ascending or descending order. */
export enum SortDirection {
  /** Sort by field values in ascending order. */
  Asc = 'ASC',
  /** Sort by field values in descending order. */
  Desc = 'DESC',
}

export type StringAggregateSelection = {
  __typename?: 'StringAggregateSelection';
  longest?: Maybe<Scalars['String']['output']>;
  shortest?: Maybe<Scalars['String']['output']>;
};

export type TopValue = {
  __typename?: 'TopValue';
  count: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  label: Scalars['String']['output'];
};

export type TopValueAggregate = {
  __typename?: 'TopValueAggregate';
  count: Count;
  node: TopValueAggregateNode;
};

export type TopValueAggregateNode = {
  __typename?: 'TopValueAggregateNode';
  count: IntAggregateSelection;
  id: StringAggregateSelection;
  label: StringAggregateSelection;
};

export type TopValueAggregateSelection = {
  __typename?: 'TopValueAggregateSelection';
  count: IntAggregateSelection;
  id: StringAggregateSelection;
  label: StringAggregateSelection;
};

export type TopValueCreateInput = {
  count: Scalars['Int']['input'];
  id: Scalars['String']['input'];
  label: Scalars['String']['input'];
};

export type TopValueEdge = {
  __typename?: 'TopValueEdge';
  cursor: Scalars['String']['output'];
  node: TopValue;
};

export type TopValueOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more TopValueSort objects to sort TopValues by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<TopValueSort>>;
};

/** Fields to sort TopValues by. The order in which sorts are applied is not guaranteed when specifying many fields in one TopValueSort object. */
export type TopValueSort = {
  count?: InputMaybe<SortDirection>;
  id?: InputMaybe<SortDirection>;
  label?: InputMaybe<SortDirection>;
};

export type TopValueUpdateInput = {
  count_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  count_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  count_SET?: InputMaybe<Scalars['Int']['input']>;
  id_SET?: InputMaybe<Scalars['String']['input']>;
  label_SET?: InputMaybe<Scalars['String']['input']>;
};

export type TopValueWhere = {
  AND?: InputMaybe<Array<TopValueWhere>>;
  NOT?: InputMaybe<TopValueWhere>;
  OR?: InputMaybe<Array<TopValueWhere>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_IN?: InputMaybe<Array<Scalars['Int']['input']>>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  id_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  id_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  id_EQ?: InputMaybe<Scalars['String']['input']>;
  id_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  id_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
  label_CONTAINS?: InputMaybe<Scalars['String']['input']>;
  label_ENDS_WITH?: InputMaybe<Scalars['String']['input']>;
  label_EQ?: InputMaybe<Scalars['String']['input']>;
  label_IN?: InputMaybe<Array<Scalars['String']['input']>>;
  label_STARTS_WITH?: InputMaybe<Scalars['String']['input']>;
};

export type TopValuesConnection = {
  __typename?: 'TopValuesConnection';
  aggregate: TopValueAggregate;
  edges: Array<TopValueEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UpdateAddressesMutationResponse = {
  __typename?: 'UpdateAddressesMutationResponse';
  addresses: Array<Address>;
  info: UpdateInfo;
};

export type UpdateCompaniesMutationResponse = {
  __typename?: 'UpdateCompaniesMutationResponse';
  companies: Array<Company>;
  info: UpdateInfo;
};

export type UpdateCountResultsMutationResponse = {
  __typename?: 'UpdateCountResultsMutationResponse';
  countResults: Array<CountResult>;
  info: UpdateInfo;
};

export type UpdateCountriesMutationResponse = {
  __typename?: 'UpdateCountriesMutationResponse';
  countries: Array<Country>;
  info: UpdateInfo;
};

export type UpdateImportReportsMutationResponse = {
  __typename?: 'UpdateImportReportsMutationResponse';
  importReports: Array<ImportReport>;
  info: UpdateInfo;
};

/** Information about the number of nodes and relationships created and deleted during an update mutation */
export type UpdateInfo = {
  __typename?: 'UpdateInfo';
  nodesCreated: Scalars['Int']['output'];
  nodesDeleted: Scalars['Int']['output'];
  relationshipsCreated: Scalars['Int']['output'];
  relationshipsDeleted: Scalars['Int']['output'];
};

export type UpdateMessagesMutationResponse = {
  __typename?: 'UpdateMessagesMutationResponse';
  info: UpdateInfo;
  messages: Array<Message>;
};

export type UpdatePeopleMutationResponse = {
  __typename?: 'UpdatePeopleMutationResponse';
  info: UpdateInfo;
  people: Array<Person>;
};

export type UpdateTopValuesMutationResponse = {
  __typename?: 'UpdateTopValuesMutationResponse';
  info: UpdateInfo;
  topValues: Array<TopValue>;
};

export type UpdateYearCountResultsMutationResponse = {
  __typename?: 'UpdateYearCountResultsMutationResponse';
  info: UpdateInfo;
  yearCountResults: Array<YearCountResult>;
};

export type YearCountResult = {
  __typename?: 'YearCountResult';
  count?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type YearCountResultAggregate = {
  __typename?: 'YearCountResultAggregate';
  count: Count;
  node: YearCountResultAggregateNode;
};

export type YearCountResultAggregateNode = {
  __typename?: 'YearCountResultAggregateNode';
  count: IntAggregateSelection;
  year: IntAggregateSelection;
};

export type YearCountResultAggregateSelection = {
  __typename?: 'YearCountResultAggregateSelection';
  count: IntAggregateSelection;
  year: IntAggregateSelection;
};

export type YearCountResultCreateInput = {
  count?: InputMaybe<Scalars['Int']['input']>;
  year?: InputMaybe<Scalars['Int']['input']>;
};

export type YearCountResultEdge = {
  __typename?: 'YearCountResultEdge';
  cursor: Scalars['String']['output'];
  node: YearCountResult;
};

export type YearCountResultOptions = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** Specify one or more YearCountResultSort objects to sort YearCountResults by. The sorts will be applied in the order in which they are arranged in the array. */
  sort?: InputMaybe<Array<YearCountResultSort>>;
};

/** Fields to sort YearCountResults by. The order in which sorts are applied is not guaranteed when specifying many fields in one YearCountResultSort object. */
export type YearCountResultSort = {
  count?: InputMaybe<SortDirection>;
  year?: InputMaybe<SortDirection>;
};

export type YearCountResultUpdateInput = {
  count_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  count_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  count_SET?: InputMaybe<Scalars['Int']['input']>;
  year_DECREMENT?: InputMaybe<Scalars['Int']['input']>;
  year_INCREMENT?: InputMaybe<Scalars['Int']['input']>;
  year_SET?: InputMaybe<Scalars['Int']['input']>;
};

export type YearCountResultWhere = {
  AND?: InputMaybe<Array<YearCountResultWhere>>;
  NOT?: InputMaybe<YearCountResultWhere>;
  OR?: InputMaybe<Array<YearCountResultWhere>>;
  count_EQ?: InputMaybe<Scalars['Int']['input']>;
  count_GT?: InputMaybe<Scalars['Int']['input']>;
  count_GTE?: InputMaybe<Scalars['Int']['input']>;
  count_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  count_LT?: InputMaybe<Scalars['Int']['input']>;
  count_LTE?: InputMaybe<Scalars['Int']['input']>;
  year_EQ?: InputMaybe<Scalars['Int']['input']>;
  year_GT?: InputMaybe<Scalars['Int']['input']>;
  year_GTE?: InputMaybe<Scalars['Int']['input']>;
  year_IN?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  year_LT?: InputMaybe<Scalars['Int']['input']>;
  year_LTE?: InputMaybe<Scalars['Int']['input']>;
};

export type YearCountResultsConnection = {
  __typename?: 'YearCountResultsConnection';
  aggregate: YearCountResultAggregate;
  edges: Array<YearCountResultEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GetAddressByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetAddressByIdQuery = {
  __typename?: 'Query';
  addresses: Array<{ __typename?: 'Address'; id: string; name: string }>;
};

export type GetCompanyByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCompanyByIdQuery = {
  __typename?: 'Query';
  companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
};

export type GetCountryByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCountryByIdQuery = {
  __typename?: 'Query';
  countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
};

export type GetMessageByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetMessageByIdQuery = {
  __typename?: 'Query';
  messages: Array<{
    __typename?: 'Message';
    id: string;
    people: Array<{ __typename?: 'Person'; id: string; name: string }>;
    companies: Array<{ __typename?: 'Company'; id: string; name: string }>;
    addresses: { __typename?: 'Address'; id: string; name: string };
    countries: Array<{ __typename?: 'Country'; id: string; name: string }>;
  }>;
};

export type GetpersonByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetpersonByIdQuery = {
  __typename?: 'Query';
  people: Array<{ __typename?: 'Person'; id: string; name: string }>;
};

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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAddressByIdQuery, GetAddressByIdQueryVariables>;
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCompanyByIdQuery, GetCompanyByIdQueryVariables>;
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCountryByIdQuery, GetCountryByIdQueryVariables>;
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'people' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'companies' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'addresses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'countries' },
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
} as unknown as DocumentNode<GetMessageByIdQuery, GetMessageByIdQueryVariables>;
export const GetpersonByIdDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetpersonById' },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetpersonByIdQuery, GetpersonByIdQueryVariables>;
