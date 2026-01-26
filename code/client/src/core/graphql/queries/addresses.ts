import { graphql } from '../generated/gql';

export const getAddressById = graphql(`
  query GetAddressById($id: ID!) {
    result: addresses(where: { id_EQ: $id }) {
      id
      name
      otherNames
      tags
      verified
      deleted
    }
  }
`);

export const getAddressItemsCounts = graphql(`
  query GetAddressItemsCount($id: ID!) {
    result: addresses(where: { id_EQ: $id }) {
      ...AddressItemsCounts
    }
  }
`);

export const getAddressItemsCountsWithCommons = graphql(`
  query GetAddressItemsCountWithCommons($id: ID!, $fromType: String!, $fromId: ID!) {
    result: addresses(where: { id_EQ: $id }) {
      ...AddressItemsCounts
      commonCompaniesCount(type: $fromType, id: $fromId)
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

export const getAddressAddresses = graphql(`
  query GetAddressAddresses($id: ID!, $skip: Int, $limit: Int) {
    result: addresses(where: { id_EQ: $id }) {
      addresses(skip: $skip, limit: $limit) {
        ...AddressInline
      }
    }
  }
`);
