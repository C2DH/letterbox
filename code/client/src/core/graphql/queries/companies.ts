import { graphql } from '../generated/gql';

export const getCompanyById = graphql(`
  query GetCompanyById($id: ID!) {
    result: companies(where: { id_EQ: $id }) {
      id
      name

      addressesCount
      addresses(skip: 0, limit: 20) {
        ...AddressInline
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

export const getCompanyAddresses = graphql(`
  query GetCompanyAddresses($id: ID!, $skip: Int, $limit: Int) {
    result: companies(where: { id_EQ: $id }) {
      addresses(skip: $skip, limit: $limit) {
        ...AddressInline
      }
    }
  }
`);

export const getCompanyCountries = graphql(`
  query GetCompanyCountries($id: ID!, $skip: Int, $limit: Int) {
    result: companies(where: { id_EQ: $id }) {
      countries(skip: $skip, limit: $limit) {
        ...CountryInline
      }
    }
  }
`);

export const getCompanyMessages = graphql(`
  query GetCompanyMessages($id: ID!, $skip: Int, $limit: Int) {
    result: companies(where: { id_EQ: $id }) {
      messages(skip: $skip, limit: $limit) {
        ...MessageInline
      }
    }
  }
`);

export const getCompanyPeople = graphql(`
  query GetCompanyPeople($id: ID!, $skip: Int, $limit: Int) {
    result: companies(where: { id_EQ: $id }) {
      people(skip: $skip, limit: $limit) {
        ...PersonInline
      }
    }
  }
`);

// TODO add filters
export const aggregateCompaniesQuery = graphql(`
  query AggregateCompanies($filters: SearchFilters) {
    people: aggregate(itemType: company, field: people, size: 20, filters: $filters) {
      total
      values {
        label
        id
        count
      }
    }
    addresses: aggregate(itemType: company, field: addresses, size: 20, filters: $filters) {
      total
      values {
        label
        id
        count
      }
    }
    countries: aggregate(itemType: company, field: countries, size: 20, filters: $filters) {
      total
      values {
        label
        id
        count
      }
    }
  }
`);
