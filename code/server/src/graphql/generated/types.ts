import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  People = 'people',
  Year = 'year',
  Years = 'years'
}

export type BooleanFilter = {
  type: FilterTypes;
  value: Scalars['Boolean']['input'];
};

export type BoundingBoxFilter = {
  bottomRight?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  topLeft?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  type: FilterTypes;
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

export type ContentFilter = {
  query: Scalars['String']['input'];
  type: FilterTypes;
};

export type CountResult = {
  __typename?: 'CountResult';
  byYear?: Maybe<Array<Maybe<YearCountResult>>>;
  total: Scalars['Int']['output'];
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

export type NumberFilter = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  type: FilterTypes;
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

export type Query = {
  __typename?: 'Query';
  _getAddressItems: Array<Address>;
  _getCompanyItems: Array<Company>;
  _getCountryItems: Array<Country>;
  _getMessageItems: Array<Message>;
  _getPersonItems: Array<Person>;
  aggregate: AggregateResults;
  scroll?: Maybe<SearchResults>;
  /** Search for Items using a set of filters */
  search?: Maybe<SearchResults>;
};


export type QueryAggregateArgs = {
  field: AggregationFields;
  filters?: InputMaybe<SearchFilters>;
  includes?: InputMaybe<Scalars['String']['input']>;
  itemType: DataItemType;
  query?: InputMaybe<Scalars['String']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
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

export type YearCountResult = {
  __typename?: 'YearCountResult';
  count?: Maybe<Scalars['Int']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  NodeItem: ( Address ) | ( Company ) | ( Country ) | ( Message ) | ( Person );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AggregateResults: ResolverTypeWrapper<AggregateResults>;
  AggregateValue: ResolverTypeWrapper<AggregateValue>;
  AggregationFields: AggregationFields;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilter: BooleanFilter;
  BoundingBoxFilter: BoundingBoxFilter;
  Company: ResolverTypeWrapper<Company>;
  ContentFilter: ContentFilter;
  CountResult: ResolverTypeWrapper<CountResult>;
  Country: ResolverTypeWrapper<Country>;
  DataItemType: DataItemType;
  DateFilter: DateFilter;
  EsSortDirection: EsSortDirection;
  FilterTypes: FilterTypes;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImportReport: ResolverTypeWrapper<ImportReport>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  KeywordsFilter: KeywordsFilter;
  Message: ResolverTypeWrapper<Message>;
  Mutation: ResolverTypeWrapper<{}>;
  NodeIdentification: NodeIdentification;
  NodeItem: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['NodeItem']>;
  NumberFilter: NumberFilter;
  Person: ResolverTypeWrapper<Person>;
  Query: ResolverTypeWrapper<{}>;
  SearchFilters: SearchFilters;
  SearchResults: ResolverTypeWrapper<Omit<SearchResults, 'results'> & { results: Array<Maybe<ResolversTypes['NodeItem']>> }>;
  SortBy: SortBy;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  YearCountResult: ResolverTypeWrapper<YearCountResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AggregateResults: AggregateResults;
  AggregateValue: AggregateValue;
  Boolean: Scalars['Boolean']['output'];
  BooleanFilter: BooleanFilter;
  BoundingBoxFilter: BoundingBoxFilter;
  Company: Company;
  ContentFilter: ContentFilter;
  CountResult: CountResult;
  Country: Country;
  DateFilter: DateFilter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  ImportReport: ImportReport;
  Int: Scalars['Int']['output'];
  KeywordsFilter: KeywordsFilter;
  Message: Message;
  Mutation: {};
  NodeIdentification: NodeIdentification;
  NodeItem: ResolversUnionTypes<ResolversParentTypes>['NodeItem'];
  NumberFilter: NumberFilter;
  Person: Person;
  Query: {};
  SearchFilters: SearchFilters;
  SearchResults: Omit<SearchResults, 'results'> & { results: Array<Maybe<ResolversParentTypes['NodeItem']>> };
  SortBy: SortBy;
  String: Scalars['String']['output'];
  YearCountResult: YearCountResult;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<AddressCompaniesArgs, 'limit' | 'skip'>>;
  companiesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<AddressCountriesArgs, 'limit' | 'skip'>>;
  countriesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<AddressMessagesArgs, 'limit' | 'skip'>>;
  messagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<AddressPeopleArgs, 'limit' | 'skip'>>;
  peopleCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateResults'] = ResolversParentTypes['AggregateResults']> = {
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  values?: Resolver<Array<ResolversTypes['AggregateValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AggregateValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['AggregateValue'] = ResolversParentTypes['AggregateValue']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<CompanyAddressesArgs, 'limit' | 'skip'>>;
  addressesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<CompanyCountriesArgs, 'limit' | 'skip'>>;
  countriesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<CompanyMessagesArgs, 'limit' | 'skip'>>;
  messagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<CompanyPeopleArgs, 'limit' | 'skip'>>;
  peopleCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountResult'] = ResolversParentTypes['CountResult']> = {
  byYear?: Resolver<Maybe<Array<Maybe<ResolversTypes['YearCountResult']>>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<CountryAddressesArgs, 'limit' | 'skip'>>;
  addressesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<CountryCompaniesArgs, 'limit' | 'skip'>>;
  companiesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<CountryMessagesArgs, 'limit' | 'skip'>>;
  messagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<CountryPeopleArgs, 'limit' | 'skip'>>;
  peopleCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportReport'] = ResolversParentTypes['ImportReport']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<MessageAddressesArgs, 'limit' | 'skip'>>;
  addressesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<MessageCompaniesArgs, 'limit' | 'skip'>>;
  companiesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<MessageCountriesArgs, 'limit' | 'skip'>>;
  countriesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<MessagePeopleArgs, 'limit' | 'skip'>>;
  peopleCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  raw_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  raw_company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  raw_countries?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  raw_message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  raw_people?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  changeType?: Resolver<ResolversTypes['NodeItem'], ParentType, ContextType, RequireFields<MutationChangeTypeArgs, 'id' | 'newType' | 'type'>>;
  createNode?: Resolver<ResolversTypes['NodeItem'], ParentType, ContextType, RequireFields<MutationCreateNodeArgs, 'messageId' | 'name' | 'type'>>;
  deleteNode?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteNodeArgs, 'id' | 'type'>>;
  import?: Resolver<Maybe<ResolversTypes['ImportReport']>, ParentType, ContextType, Partial<MutationImportArgs>>;
  index?: Resolver<Maybe<ResolversTypes['ImportReport']>, ParentType, ContextType>;
  mergeNodes?: Resolver<ResolversTypes['NodeItem'], ParentType, ContextType, RequireFields<MutationMergeNodesArgs, 'name' | 'nodes' | 'type'>>;
  renameNode?: Resolver<ResolversTypes['NodeItem'], ParentType, ContextType, RequireFields<MutationRenameNodeArgs, 'id' | 'name' | 'type'>>;
  splitNode?: Resolver<Array<ResolversTypes['NodeItem']>, ParentType, ContextType, RequireFields<MutationSplitNodeArgs, 'id' | 'type' | 'values'>>;
};

export type NodeItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['NodeItem'] = ResolversParentTypes['NodeItem']> = {
  __resolveType: TypeResolveFn<'Address' | 'Company' | 'Country' | 'Message' | 'Person', ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<PersonAddressesArgs, 'limit' | 'skip'>>;
  addressesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<PersonCompaniesArgs, 'limit' | 'skip'>>;
  companiesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<PersonCountriesArgs, 'limit' | 'skip'>>;
  countriesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType, RequireFields<PersonMessagesArgs, 'limit' | 'skip'>>;
  messagesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _getAddressItems?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType>;
  _getCompanyItems?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  _getCountryItems?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  _getMessageItems?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  _getPersonItems?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  aggregate?: Resolver<ResolversTypes['AggregateResults'], ParentType, ContextType, RequireFields<QueryAggregateArgs, 'field' | 'itemType'>>;
  scroll?: Resolver<Maybe<ResolversTypes['SearchResults']>, ParentType, ContextType, RequireFields<QueryScrollArgs, 'itemType' | 'scrollId'>>;
  search?: Resolver<Maybe<ResolversTypes['SearchResults']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'filters' | 'itemType'>>;
};

export type SearchResultsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SearchResults'] = ResolversParentTypes['SearchResults']> = {
  results?: Resolver<Array<Maybe<ResolversTypes['NodeItem']>>, ParentType, ContextType>;
  scrollId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearCountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['YearCountResult'] = ResolversParentTypes['YearCountResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  AggregateResults?: AggregateResultsResolvers<ContextType>;
  AggregateValue?: AggregateValueResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CountResult?: CountResultResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  ImportReport?: ImportReportResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NodeItem?: NodeItemResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SearchResults?: SearchResultsResolvers<ContextType>;
  YearCountResult?: YearCountResultResolvers<ContextType>;
};

