import { graphql } from '../generated/gql';

export const getAddressById = graphql(`
  query GetAddressById($id: ID!) {
    result: addresses(where: { id_EQ: $id }) {
      id
      name
      otherNames
      tags
      verified
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
      peopleCount
      people(skip: 0, limit: 20) {
        ...PersonInline
      }
    }
  }
`);

export const getAddressCompanies = graphql(`
  query GetAddressCompanies($id: ID!, $skip: Int, $limit: Int) {
    result: addresses(where: { id_EQ: $id }) {
      companies(skip: $skip, limit: $limit) {
        ...CompanyInline
      }
    }
  }
`);

export const getAddressCountries = graphql(`
  query GetAddressCountries($id: ID!, $skip: Int, $limit: Int) {
    result: addresses(where: { id_EQ: $id }) {
      countries(skip: $skip, limit: $limit) {
        ...CountryInline
      }
    }
  }
`);

export const getAddressMessages = graphql(`
  query GetAddressMessages($id: ID!, $skip: Int, $limit: Int) {
    result: addresses(where: { id_EQ: $id }) {
      messages(skip: $skip, limit: $limit) {
        ...MessageInline
      }
    }
  }
`);

export const getAddressPeople = graphql(`
  query GetAddressPeople($id: ID!, $skip: Int, $limit: Int) {
    result: addresses(where: { id_EQ: $id }) {
      people(skip: $skip, limit: $limit) {
        ...PersonInline
      }
    }
  }
`);
