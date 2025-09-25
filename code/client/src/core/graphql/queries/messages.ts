import { graphql } from '../generated/gql';

export const getMessageById = graphql(`
  query GetMessageById($id: ID!) {
    result: messages(where: { id_EQ: $id }) {
      id
      year
      message
      filename
      pageNumber
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
      people(skip: 0, limit: 20) {
        ...PersonInline
      }
    }
  }
`);

export const getMessageItemsCounts = graphql(`
  query GetMessageItemsCounts($id: ID!) {
    result: messages(where: { id_EQ: $id }) {
      ...MessageItemsCounts
    }
  }
`);

export const getMessageCompanies = graphql(`
  query GetMessageCompanies($id: ID!, $skip: Int, $limit: Int) {
    result: messages(where: { id_EQ: $id }) {
      companies(skip: $skip, limit: $limit) {
        ...CompanyInline
      }
    }
  }
`);

export const getMessageAddresses = graphql(`
  query GetMessageCountries($id: ID!, $skip: Int, $limit: Int) {
    result: messages(where: { id_EQ: $id }) {
      addresses(skip: $skip, limit: $limit) {
        ...AddressInline
      }
    }
  }
`);

export const getMessagePeople = graphql(`
  query GetMessageMessages($id: ID!, $skip: Int, $limit: Int) {
    result: messages(where: { id_EQ: $id }) {
      people(skip: $skip, limit: $limit) {
        ...PersonInline
      }
    }
  }
`);

export const getMessageCountries = graphql(`
  query GetMessagePeople($id: ID!, $skip: Int, $limit: Int) {
    result: messages(where: { id_EQ: $id }) {
      countries(skip: $skip, limit: $limit) {
        ...CountryInline
      }
    }
  }
`);
