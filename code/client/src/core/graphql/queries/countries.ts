import { graphql } from '../generated/gql';

export const getCountryById = graphql(`
  query GetCountryById($id: ID!) {
    result: countries(where: { id_EQ: $id }) {
      id
      name
      otherNames
      addressesCount
      addresses(skip: 0, limit: 20) {
        ...AddressInline
      }
      companiesCount
      companies(skip: 0, limit: 20) {
        ...CompanyInline
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

export const getCountryCompanies = graphql(`
  query GetCountryCompanies($id: ID!, $skip: Int, $limit: Int) {
    result: countries(where: { id_EQ: $id }) {
      companies(skip: $skip, limit: $limit) {
        ...CompanyInline
      }
    }
  }
`);

export const getCountryAddresses = graphql(`
  query GetCountryCountries($id: ID!, $skip: Int, $limit: Int) {
    result: countries(where: { id_EQ: $id }) {
      addresses(skip: $skip, limit: $limit) {
        ...AddressInline
      }
    }
  }
`);

export const getCountryMessages = graphql(`
  query GetCountryMessages($id: ID!, $skip: Int, $limit: Int) {
    result: countries(where: { id_EQ: $id }) {
      messages(skip: $skip, limit: $limit) {
        ...MessageInline
      }
    }
  }
`);

export const getCountryPeople = graphql(`
  query GetCountryPeople($id: ID!, $skip: Int, $limit: Int) {
    result: countries(where: { id_EQ: $id }) {
      people(skip: $skip, limit: $limit) {
        ...PersonInline
      }
    }
  }
`);
