import { graphql } from '../generated/gql';

export const getCountryById = graphql(`
  query GetCountryById($id: ID!) {
    result: countries(where: { id_EQ: $id }) {
      id
      name
      otherNames
      tags
      verified
      deleted
    }
  }
`);

export const getCountryItemsCounts = graphql(`
  query GetCountryItemsCounts($id: ID!) {
    result: countries(where: { id_EQ: $id }) {
      ...CountryItemsCounts
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
  query GetCountryAddresses($id: ID!, $skip: Int, $limit: Int) {
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

export const getCountryCountries = graphql(`
  query GetCountryCountries($id: ID!, $skip: Int, $limit: Int) {
    result: countries(where: { id_EQ: $id }) {
      countries(skip: $skip, limit: $limit) {
        ...CountryInline
      }
    }
  }
`);
