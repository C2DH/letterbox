import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T;
export type InputMaybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
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


export type AddressPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
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

export enum AddressMetadata {
  Company = 'company',
  Country = 'country',
  People = 'people'
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
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
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


export type CompanyPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
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

export enum CompanyMetadata {
  Address = 'address',
  Country = 'country',
  People = 'people'
}

export enum CompanySortByMethods {
  Alphabetic = 'ALPHABETIC',
  Date = 'DATE',
  NbMessages = 'NB_MESSAGES',
  Score = 'SCORE'
}

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
  companies: Array<Company>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
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


export type CountryPeopleArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
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

export enum CountryMetadata {
  Address = 'address',
  Company = 'company',
  People = 'people'
}

export enum DataItemType {
  Address = 'address',
  Company = 'company',
  Country = 'country',
  Person = 'person'
}

export type DateFilter = {
  max?: InputMaybe<Scalars['Int']['input']>;
  min?: InputMaybe<Scalars['Int']['input']>;
  type: FilterTypes;
};

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
  address: Address;
  company: Array<Company>;
  countries: Array<Country>;
  filename: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  message: Scalars['String']['output'];
  pageNumber: Scalars['Int']['output'];
  persons: Array<Person>;
  raw_address: Scalars['String']['output'];
  raw_company: Scalars['String']['output'];
  raw_countries?: Maybe<Array<Scalars['String']['output']>>;
  raw_message: Scalars['String']['output'];
  raw_people?: Maybe<Array<Scalars['String']['output']>>;
  year: Scalars['Int']['output'];
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
  People = 'people'
}

export enum MessageSortByMethods {
  Date = 'DATE',
  Score = 'SCORE'
}

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

export type NodeItem = Address | Company | Country | Person;

export type NumberFilter = {
  max?: InputMaybe<Scalars['Float']['input']>;
  min?: InputMaybe<Scalars['Float']['input']>;
  type: FilterTypes;
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
  Country = 'country'
}

export type Person = {
  __typename?: 'Person';
  addresses: Array<Address>;
  companies: Array<Company>;
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  messages: Array<Message>;
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

export type Query = {
  __typename?: 'Query';
  _getNodesItem: Array<NodeItem>;
  countAddress?: Maybe<CountResult>;
  countCompany?: Maybe<CountResult>;
  countCountry?: Maybe<CountResult>;
  /** Count Items respecting a set of filters, option to add count by year */
  countMessage?: Maybe<CountResult>;
  countPeople?: Maybe<CountResult>;
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

export type RelaionshipProperties = {
  __typename?: 'RelaionshipProperties';
  deleted?: Maybe<Scalars['Boolean']['output']>;
};

export enum SortByMethods {
  Alphabetic = 'ALPHABETIC',
  Date = 'DATE',
  NbCompanies = 'NB_COMPANIES',
  NbMessages = 'NB_MESSAGES',
  Score = 'SCORE'
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
  NodeItem: ( Address ) | ( Company ) | ( Country ) | ( Person );
};


/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressFilters: AddressFilters;
  AddressMetadata: AddressMetadata;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BooleanFilter: BooleanFilter;
  BoundingBoxFilter: BoundingBoxFilter;
  Company: ResolverTypeWrapper<Company>;
  CompanyFilters: CompanyFilters;
  CompanyMetadata: CompanyMetadata;
  CompanySortByMethods: CompanySortByMethods;
  ContentFilter: ContentFilter;
  CountResult: ResolverTypeWrapper<CountResult>;
  Country: ResolverTypeWrapper<Country>;
  CountryFilters: CountryFilters;
  CountryMetadata: CountryMetadata;
  DataItemType: DataItemType;
  DateFilter: DateFilter;
  FilterTypes: FilterTypes;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  ImportReport: ResolverTypeWrapper<ImportReport>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  KeywordsFilter: KeywordsFilter;
  Message: ResolverTypeWrapper<Message>;
  MessageFilters: MessageFilters;
  MessageMetadata: MessageMetadata;
  MessageSortByMethods: MessageSortByMethods;
  Mutation: ResolverTypeWrapper<{}>;
  NodeIdentification: NodeIdentification;
  NodeItem: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['NodeItem']>;
  NumberFilter: NumberFilter;
  PeopleFilters: PeopleFilters;
  PeopleMetadata: PeopleMetadata;
  Person: ResolverTypeWrapper<Person>;
  Query: ResolverTypeWrapper<{}>;
  RelaionshipProperties: ResolverTypeWrapper<RelaionshipProperties>;
  SortByMethods: SortByMethods;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TopValue: ResolverTypeWrapper<TopValue>;
  YearCountResult: ResolverTypeWrapper<YearCountResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressFilters: AddressFilters;
  Boolean: Scalars['Boolean']['output'];
  BooleanFilter: BooleanFilter;
  BoundingBoxFilter: BoundingBoxFilter;
  Company: Company;
  CompanyFilters: CompanyFilters;
  ContentFilter: ContentFilter;
  CountResult: CountResult;
  Country: Country;
  CountryFilters: CountryFilters;
  DateFilter: DateFilter;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  ImportReport: ImportReport;
  Int: Scalars['Int']['output'];
  KeywordsFilter: KeywordsFilter;
  Message: Message;
  MessageFilters: MessageFilters;
  Mutation: {};
  NodeIdentification: NodeIdentification;
  NodeItem: ResolversUnionTypes<ResolversParentTypes>['NodeItem'];
  NumberFilter: NumberFilter;
  PeopleFilters: PeopleFilters;
  Person: Person;
  Query: {};
  RelaionshipProperties: RelaionshipProperties;
  String: Scalars['String']['output'];
  TopValue: TopValue;
  YearCountResult: YearCountResult;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<AddressCompaniesArgs, 'limit' | 'skip'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<AddressCountriesArgs, 'limit' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<AddressPeopleArgs, 'limit' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<CompanyAddressesArgs, 'limit' | 'skip'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<CompanyCountriesArgs, 'limit' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<CompanyPeopleArgs, 'limit' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['CountResult'] = ResolversParentTypes['CountResult']> = {
  byYear?: Resolver<Maybe<Array<Maybe<ResolversTypes['YearCountResult']>>>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CountryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Country'] = ResolversParentTypes['Country']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<CountryAddressesArgs, 'limit' | 'skip'>>;
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<CountryCompaniesArgs, 'limit' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  people?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<CountryPeopleArgs, 'limit' | 'skip'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImportReportResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImportReport'] = ResolversParentTypes['ImportReport']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  address?: Resolver<ResolversTypes['Address'], ParentType, ContextType>;
  company?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType>;
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pageNumber?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  persons?: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
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
  __resolveType: TypeResolveFn<'Address' | 'Company' | 'Country' | 'Person', ParentType, ContextType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  addresses?: Resolver<Array<ResolversTypes['Address']>, ParentType, ContextType, RequireFields<PersonAddressesArgs, 'limit' | 'skip'>>;
  companies?: Resolver<Array<ResolversTypes['Company']>, ParentType, ContextType, RequireFields<PersonCompaniesArgs, 'limit' | 'skip'>>;
  countries?: Resolver<Array<ResolversTypes['Country']>, ParentType, ContextType, RequireFields<PersonCountriesArgs, 'limit' | 'skip'>>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _getNodesItem?: Resolver<Array<ResolversTypes['NodeItem']>, ParentType, ContextType>;
  countAddress?: Resolver<Maybe<ResolversTypes['CountResult']>, ParentType, ContextType, RequireFields<QueryCountAddressArgs, 'filters'>>;
  countCompany?: Resolver<Maybe<ResolversTypes['CountResult']>, ParentType, ContextType, RequireFields<QueryCountCompanyArgs, 'filters'>>;
  countCountry?: Resolver<Maybe<ResolversTypes['CountResult']>, ParentType, ContextType, RequireFields<QueryCountCountryArgs, 'filters'>>;
  countMessage?: Resolver<Maybe<ResolversTypes['CountResult']>, ParentType, ContextType, RequireFields<QueryCountMessageArgs, 'filters'>>;
  countPeople?: Resolver<Maybe<ResolversTypes['CountResult']>, ParentType, ContextType, RequireFields<QueryCountPeopleArgs, 'filters'>>;
  searchAddress?: Resolver<Maybe<Array<Maybe<ResolversTypes['Address']>>>, ParentType, ContextType, RequireFields<QuerySearchAddressArgs, 'filters' | 'limit'>>;
  searchCompany?: Resolver<Maybe<Array<Maybe<ResolversTypes['Company']>>>, ParentType, ContextType, RequireFields<QuerySearchCompanyArgs, 'filters' | 'limit'>>;
  searchCountry?: Resolver<Maybe<Array<Maybe<ResolversTypes['Country']>>>, ParentType, ContextType, RequireFields<QuerySearchCountryArgs, 'filters' | 'limit'>>;
  searchMessage?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType, RequireFields<QuerySearchMessageArgs, 'filters' | 'limit'>>;
  searchPeople?: Resolver<Maybe<Array<Maybe<ResolversTypes['Person']>>>, ParentType, ContextType, RequireFields<QuerySearchPeopleArgs, 'filters' | 'limit'>>;
  topAddressMetadata?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopValue']>>>, ParentType, ContextType, RequireFields<QueryTopAddressMetadataArgs, 'filters' | 'limit' | 'metadataModel'>>;
  topCompanyMetadata?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopValue']>>>, ParentType, ContextType, RequireFields<QueryTopCompanyMetadataArgs, 'filters' | 'limit' | 'metadataModel'>>;
  topCountryMetadata?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopValue']>>>, ParentType, ContextType, RequireFields<QueryTopCountryMetadataArgs, 'filters' | 'limit' | 'metadataModel'>>;
  topMessageMetadata?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopValue']>>>, ParentType, ContextType, RequireFields<QueryTopMessageMetadataArgs, 'filters' | 'limit' | 'metadataModel'>>;
  topPeopleMetadata?: Resolver<Maybe<Array<Maybe<ResolversTypes['TopValue']>>>, ParentType, ContextType, RequireFields<QueryTopPeopleMetadataArgs, 'filters' | 'limit' | 'metadataModel'>>;
};

export type RelaionshipPropertiesResolvers<ContextType = any, ParentType extends ResolversParentTypes['RelaionshipProperties'] = ResolversParentTypes['RelaionshipProperties']> = {
  deleted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TopValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['TopValue'] = ResolversParentTypes['TopValue']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  label?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type YearCountResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['YearCountResult'] = ResolversParentTypes['YearCountResult']> = {
  count?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Address?: AddressResolvers<ContextType>;
  Company?: CompanyResolvers<ContextType>;
  CountResult?: CountResultResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  ImportReport?: ImportReportResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NodeItem?: NodeItemResolvers<ContextType>;
  Person?: PersonResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RelaionshipProperties?: RelaionshipPropertiesResolvers<ContextType>;
  TopValue?: TopValueResolvers<ContextType>;
  YearCountResult?: YearCountResultResolvers<ContextType>;
};

