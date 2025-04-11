import { graphql } from './generated';

export const AddressInline = graphql(`
  fragment AddressInline on Address {
    id
    name
    companiesCount
    countriesCount
    messagesCount
    peopleCount
    tags
  }
`);

export const CompanyInline = graphql(`
  fragment CompanyInline on Company {
    id
    name
    addressesCount
    countriesCount
    messagesCount
    peopleCount
    years
    tags
  }
`);

export const CountryInline = graphql(`
  fragment CountryInline on Country {
    id
    name
    addressesCount
    companiesCount
    messagesCount
    peopleCount
    tags
  }
`);

export const MessageInline = graphql(`
  fragment MessageInline on Message {
    id
    year
    message
    addressesCount
    addresses(limit: 5) {
      id
      name
    }
    companiesCount
    companies(limit: 5) {
      id
      name
    }
    countriesCount
    countries(limit: 5) {
      id
      name
    }
    peopleCount
    people(limit: 5) {
      id
      name
    }
    tags
  }
`);

export const PersonInline = graphql(`
  fragment PersonInline on Person {
    id
    name
    addressesCount
    companiesCount
    countriesCount
    messagesCount
    tags
  }
`);
