import { graphql } from '../generated/gql';

export const getPersonById = graphql(`
  query GetPersonById($id: ID!) {
    result: people(where: { id_EQ: $id }) {
      id
      name

      addressesCount
      addresses(skip: 0, limit: 20) {
        ...AddressInline
      }
      companiesCount
      companies(skip: 0, limit: 20) {
        ...CompanyInline
      }
      countriesCount
      countries(skip: 0, limit: 20) {
        ...CountryInline
      }
      messagesCount
      messages {
        ...MessageInline
      }
    }
  }
`);

export const getPersonCompanies = graphql(`
  query GetPersonCompanies($id: ID!, $skip: Int, $limit: Int) {
    result: people(where: { id_EQ: $id }) {
      companies(skip: $skip, limit: $limit) {
        ...CompanyInline
      }
    }
  }
`);

export const getPersonAddresses = graphql(`
  query GetPersonCountries($id: ID!, $skip: Int, $limit: Int) {
    result: people(where: { id_EQ: $id }) {
      addresses(skip: $skip, limit: $limit) {
        ...AddressInline
      }
    }
  }
`);

export const getPersonMessages = graphql(`
  query GetPersonMessages($id: ID!, $skip: Int, $limit: Int) {
    result: people(where: { id_EQ: $id }) {
      messages(skip: $skip, limit: $limit) {
        ...MessageInline
      }
    }
  }
`);

export const getPersonCountries = graphql(`
  query GetPersonPeople($id: ID!, $skip: Int, $limit: Int) {
    result: people(where: { id_EQ: $id }) {
      countries(skip: $skip, limit: $limit) {
        ...CountryInline
      }
    }
  }
`);
