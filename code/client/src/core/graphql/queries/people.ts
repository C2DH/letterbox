import { graphql } from '../generated/gql';

export const getPersonById = graphql(`
  query GetPersonById($id: ID!) {
    result: people(where: { id_EQ: $id }) {
      id
      name
      otherNames
      tags
      verified
      deleted

      addresses(skip: 0, limit: 20) {
        ...AddressInline
      }

      companies(skip: 0, limit: 20) {
        ...CompanyInline
      }

      countries(skip: 0, limit: 20) {
        ...CountryInline
      }

      messages {
        ...MessageInline
      }

      people {
        ...PersonInline
      }
    }
  }
`);

export const getPersonItemsCounts = graphql(`
  query GetPersonItemsCount($id: ID!) {
    result: people(where: { id_EQ: $id }) {
      ...PersonItemCounts
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
  query GetPersonAddresses($id: ID!, $skip: Int, $limit: Int) {
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
  query GetPersonCountries($id: ID!, $skip: Int, $limit: Int) {
    result: people(where: { id_EQ: $id }) {
      countries(skip: $skip, limit: $limit) {
        ...CountryInline
      }
    }
  }
`);

export const getPersonPeople = graphql(`
  query GetPersonPeople($id: ID!, $skip: Int, $limit: Int) {
    result: people(where: { id_EQ: $id }) {
      people(skip: $skip, limit: $limit) {
        ...PersonInline
      }
    }
  }
`);
