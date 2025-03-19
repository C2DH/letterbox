/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  fragment AddressInline on Address {\n    id\n    name\n    companiesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n": typeof types.AddressInlineFragmentDoc,
    "\n  fragment CompanyInline on Company {\n    id\n    name\n    addressesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n": typeof types.CompanyInlineFragmentDoc,
    "\n  fragment CountryInline on Country {\n    id\n    name\n    addressesCount\n    companiesCount\n    messagesCount\n    peopleCount\n  }\n": typeof types.CountryInlineFragmentDoc,
    "\n  fragment MessageInline on Message {\n    id\n    year\n    message\n    addressesCount\n    companiesCount\n    companies(limit: 3) {\n      name\n    }\n    countriesCount\n    peopleCount\n  }\n": typeof types.MessageInlineFragmentDoc,
    "\n  fragment PersonInline on Person {\n    id\n    name\n    addressesCount\n    companiesCount\n    countriesCount\n    messagesCount\n  }\n": typeof types.PersonInlineFragmentDoc,
    "\n  mutation DeleteNodeByTypeId($type: DataItemType!, $id: ID!) {\n    result: deleteNode(type: $type, id: $id)\n  }\n": typeof types.DeleteNodeByTypeIdDocument,
    "\n  mutation ChangeTypeByTypeId($type: DataItemType!, $id: ID!, $newType: DataItemType!) {\n    result: changeType(type: $type, id: $id, newType: $newType) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.ChangeTypeByTypeIdDocument,
    "\n  mutation RenameNode($type: DataItemType!, $id: ID!, $name: String!) {\n    result: renameNode(type: $type, id: $id, name: $name) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.RenameNodeDocument,
    "\n  mutation SplitByTypeId($type: DataItemType!, $id: ID!, $values: [String!]!) {\n    result: splitNode(type: $type, id: $id, values: $values) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.SplitByTypeIdDocument,
    "\n  query GetAddressById($id: ID!) {\n    result: addresses(where: { id_EQ: $id }) {\n      id\n      name\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetAddressByIdDocument,
    "\n  query GetAddressCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": typeof types.GetAddressCompaniesDocument,
    "\n  query GetAddressCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": typeof types.GetAddressCountriesDocument,
    "\n  query GetAddressMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": typeof types.GetAddressMessagesDocument,
    "\n  query GetAddressPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetAddressPeopleDocument,
    "\n  query GetCompanyById($id: ID!) {\n    result: companies(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetCompanyByIdDocument,
    "\n  query GetCompanyAddresses($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": typeof types.GetCompanyAddressesDocument,
    "\n  query GetCompanyCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": typeof types.GetCompanyCountriesDocument,
    "\n  query GetCompanyMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": typeof types.GetCompanyMessagesDocument,
    "\n  query GetCompanyPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetCompanyPeopleDocument,
    "\n  query AggregateCompanies {\n    people: aggregate(itemType: company, field: people, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    addresses: aggregate(itemType: company, field: addresses, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    countries: aggregate(itemType: company, field: countries, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n  }\n": typeof types.AggregateCompaniesDocument,
    "\n  query GetCountryById($id: ID!) {\n    result: countries(where: { id_EQ: $id }) {\n      id\n      name\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetCountryByIdDocument,
    "\n  query GetCountryCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": typeof types.GetCountryCompaniesDocument,
    "\n  query GetCountryCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": typeof types.GetCountryCountriesDocument,
    "\n  query GetCountryMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": typeof types.GetCountryMessagesDocument,
    "\n  query GetCountryPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetCountryPeopleDocument,
    "\n  query GetMessageById($id: ID!) {\n    result: messages(where: { id_EQ: $id }) {\n      id\n      year\n      message\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetMessageByIdDocument,
    "\n  query GetMessageCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": typeof types.GetMessageCompaniesDocument,
    "\n  query GetMessageCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": typeof types.GetMessageCountriesDocument,
    "\n  query GetMessageMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": typeof types.GetMessageMessagesDocument,
    "\n  query GetMessagePeople($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": typeof types.GetMessagePeopleDocument,
    "\n  query GetPersonById($id: ID!) {\n    result: people(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n    }\n  }\n": typeof types.GetPersonByIdDocument,
    "\n  query GetPersonCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": typeof types.GetPersonCompaniesDocument,
    "\n  query GetPersonCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": typeof types.GetPersonCountriesDocument,
    "\n  query GetPersonMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": typeof types.GetPersonMessagesDocument,
    "\n  query GetPersonPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": typeof types.GetPersonPeopleDocument,
};
const documents: Documents = {
    "\n  fragment AddressInline on Address {\n    id\n    name\n    companiesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n": types.AddressInlineFragmentDoc,
    "\n  fragment CompanyInline on Company {\n    id\n    name\n    addressesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n": types.CompanyInlineFragmentDoc,
    "\n  fragment CountryInline on Country {\n    id\n    name\n    addressesCount\n    companiesCount\n    messagesCount\n    peopleCount\n  }\n": types.CountryInlineFragmentDoc,
    "\n  fragment MessageInline on Message {\n    id\n    year\n    message\n    addressesCount\n    companiesCount\n    companies(limit: 3) {\n      name\n    }\n    countriesCount\n    peopleCount\n  }\n": types.MessageInlineFragmentDoc,
    "\n  fragment PersonInline on Person {\n    id\n    name\n    addressesCount\n    companiesCount\n    countriesCount\n    messagesCount\n  }\n": types.PersonInlineFragmentDoc,
    "\n  mutation DeleteNodeByTypeId($type: DataItemType!, $id: ID!) {\n    result: deleteNode(type: $type, id: $id)\n  }\n": types.DeleteNodeByTypeIdDocument,
    "\n  mutation ChangeTypeByTypeId($type: DataItemType!, $id: ID!, $newType: DataItemType!) {\n    result: changeType(type: $type, id: $id, newType: $newType) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n": types.ChangeTypeByTypeIdDocument,
    "\n  mutation RenameNode($type: DataItemType!, $id: ID!, $name: String!) {\n    result: renameNode(type: $type, id: $id, name: $name) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n": types.RenameNodeDocument,
    "\n  mutation SplitByTypeId($type: DataItemType!, $id: ID!, $values: [String!]!) {\n    result: splitNode(type: $type, id: $id, values: $values) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n": types.SplitByTypeIdDocument,
    "\n  query GetAddressById($id: ID!) {\n    result: addresses(where: { id_EQ: $id }) {\n      id\n      name\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetAddressByIdDocument,
    "\n  query GetAddressCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": types.GetAddressCompaniesDocument,
    "\n  query GetAddressCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": types.GetAddressCountriesDocument,
    "\n  query GetAddressMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": types.GetAddressMessagesDocument,
    "\n  query GetAddressPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetAddressPeopleDocument,
    "\n  query GetCompanyById($id: ID!) {\n    result: companies(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetCompanyByIdDocument,
    "\n  query GetCompanyAddresses($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": types.GetCompanyAddressesDocument,
    "\n  query GetCompanyCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": types.GetCompanyCountriesDocument,
    "\n  query GetCompanyMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": types.GetCompanyMessagesDocument,
    "\n  query GetCompanyPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetCompanyPeopleDocument,
    "\n  query AggregateCompanies {\n    people: aggregate(itemType: company, field: people, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    addresses: aggregate(itemType: company, field: addresses, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    countries: aggregate(itemType: company, field: countries, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n  }\n": types.AggregateCompaniesDocument,
    "\n  query GetCountryById($id: ID!) {\n    result: countries(where: { id_EQ: $id }) {\n      id\n      name\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetCountryByIdDocument,
    "\n  query GetCountryCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": types.GetCountryCompaniesDocument,
    "\n  query GetCountryCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": types.GetCountryCountriesDocument,
    "\n  query GetCountryMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": types.GetCountryMessagesDocument,
    "\n  query GetCountryPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetCountryPeopleDocument,
    "\n  query GetMessageById($id: ID!) {\n    result: messages(where: { id_EQ: $id }) {\n      id\n      year\n      message\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetMessageByIdDocument,
    "\n  query GetMessageCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": types.GetMessageCompaniesDocument,
    "\n  query GetMessageCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": types.GetMessageCountriesDocument,
    "\n  query GetMessageMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n": types.GetMessageMessagesDocument,
    "\n  query GetMessagePeople($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": types.GetMessagePeopleDocument,
    "\n  query GetPersonById($id: ID!) {\n    result: people(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n    }\n  }\n": types.GetPersonByIdDocument,
    "\n  query GetPersonCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n": types.GetPersonCompaniesDocument,
    "\n  query GetPersonCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n": types.GetPersonCountriesDocument,
    "\n  query GetPersonMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n": types.GetPersonMessagesDocument,
    "\n  query GetPersonPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n": types.GetPersonPeopleDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment AddressInline on Address {\n    id\n    name\n    companiesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n"): (typeof documents)["\n  fragment AddressInline on Address {\n    id\n    name\n    companiesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CompanyInline on Company {\n    id\n    name\n    addressesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n"): (typeof documents)["\n  fragment CompanyInline on Company {\n    id\n    name\n    addressesCount\n    countriesCount\n    messagesCount\n    peopleCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment CountryInline on Country {\n    id\n    name\n    addressesCount\n    companiesCount\n    messagesCount\n    peopleCount\n  }\n"): (typeof documents)["\n  fragment CountryInline on Country {\n    id\n    name\n    addressesCount\n    companiesCount\n    messagesCount\n    peopleCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment MessageInline on Message {\n    id\n    year\n    message\n    addressesCount\n    companiesCount\n    companies(limit: 3) {\n      name\n    }\n    countriesCount\n    peopleCount\n  }\n"): (typeof documents)["\n  fragment MessageInline on Message {\n    id\n    year\n    message\n    addressesCount\n    companiesCount\n    companies(limit: 3) {\n      name\n    }\n    countriesCount\n    peopleCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  fragment PersonInline on Person {\n    id\n    name\n    addressesCount\n    companiesCount\n    countriesCount\n    messagesCount\n  }\n"): (typeof documents)["\n  fragment PersonInline on Person {\n    id\n    name\n    addressesCount\n    companiesCount\n    countriesCount\n    messagesCount\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteNodeByTypeId($type: DataItemType!, $id: ID!) {\n    result: deleteNode(type: $type, id: $id)\n  }\n"): (typeof documents)["\n  mutation DeleteNodeByTypeId($type: DataItemType!, $id: ID!) {\n    result: deleteNode(type: $type, id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangeTypeByTypeId($type: DataItemType!, $id: ID!, $newType: DataItemType!) {\n    result: changeType(type: $type, id: $id, newType: $newType) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation ChangeTypeByTypeId($type: DataItemType!, $id: ID!, $newType: DataItemType!) {\n    result: changeType(type: $type, id: $id, newType: $newType) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RenameNode($type: DataItemType!, $id: ID!, $name: String!) {\n    result: renameNode(type: $type, id: $id, name: $name) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation RenameNode($type: DataItemType!, $id: ID!, $name: String!) {\n    result: renameNode(type: $type, id: $id, name: $name) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SplitByTypeId($type: DataItemType!, $id: ID!, $values: [String!]!) {\n    result: splitNode(type: $type, id: $id, values: $values) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation SplitByTypeId($type: DataItemType!, $id: ID!, $values: [String!]!) {\n    result: splitNode(type: $type, id: $id, values: $values) {\n      ... on Address {\n        ...AddressInline\n      }\n      ... on Company {\n        ...CompanyInline\n      }\n      ... on Country {\n        ...CountryInline\n      }\n      ... on Person {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAddressById($id: ID!) {\n    result: addresses(where: { id_EQ: $id }) {\n      id\n      name\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAddressById($id: ID!) {\n    result: addresses(where: { id_EQ: $id }) {\n      id\n      name\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAddressCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAddressCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAddressCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAddressCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAddressMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAddressMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAddressPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAddressPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: addresses(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompanyById($id: ID!) {\n    result: companies(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCompanyById($id: ID!) {\n    result: companies(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompanyAddresses($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCompanyAddresses($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompanyCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCompanyCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompanyMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCompanyMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCompanyPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCompanyPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: companies(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AggregateCompanies {\n    people: aggregate(itemType: company, field: people, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    addresses: aggregate(itemType: company, field: addresses, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    countries: aggregate(itemType: company, field: countries, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query AggregateCompanies {\n    people: aggregate(itemType: company, field: people, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    addresses: aggregate(itemType: company, field: addresses, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n    countries: aggregate(itemType: company, field: countries, size: 20) {\n      total\n      values {\n        label\n        id\n        count\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountryById($id: ID!) {\n    result: countries(where: { id_EQ: $id }) {\n      id\n      name\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCountryById($id: ID!) {\n    result: countries(where: { id_EQ: $id }) {\n      id\n      name\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountryCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCountryCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountryCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCountryCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountryMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCountryMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetCountryPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCountryPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: countries(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessageById($id: ID!) {\n    result: messages(where: { id_EQ: $id }) {\n      id\n      year\n      message\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessageById($id: ID!) {\n    result: messages(where: { id_EQ: $id }) {\n      id\n      year\n      message\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      peopleCount\n      people(skip: 0, limit: 20) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessageCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessageCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessageCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessageCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessageMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessageMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      people(skip: $skip, limit: $limit) {\n        ...PersonInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMessagePeople($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetMessagePeople($id: ID!, $skip: Int, $limit: Int) {\n    result: messages(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonById($id: ID!) {\n    result: people(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonById($id: ID!) {\n    result: people(where: { id_EQ: $id }) {\n      id\n      name\n\n      addressesCount\n      addresses(skip: 0, limit: 20) {\n        ...AddressInline\n      }\n      companiesCount\n      companies(skip: 0, limit: 20) {\n        ...CompanyInline\n      }\n      countriesCount\n      countries(skip: 0, limit: 20) {\n        ...CountryInline\n      }\n      messagesCount\n      messages {\n        ...MessageInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonCompanies($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      companies(skip: $skip, limit: $limit) {\n        ...CompanyInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonCountries($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      addresses(skip: $skip, limit: $limit) {\n        ...AddressInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonMessages($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      messages(skip: $skip, limit: $limit) {\n        ...MessageInline\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetPersonPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPersonPeople($id: ID!, $skip: Int, $limit: Int) {\n    result: people(where: { id_EQ: $id }) {\n      countries(skip: $skip, limit: $limit) {\n        ...CountryInline\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;