import { graphql } from './generated';

export const AddressInline = graphql(`
  fragment AddressInline on Address {
    id
    name
    companiesCount
    countriesCount
    messagesCount
    peopleCount
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
  }
`);

export const MessageInline = graphql(`
  fragment MessageInline on Message {
    id
    year
    message
    addressesCount
    companiesCount
    companies(limit: 3) {
      name
    }
    countriesCount
    peopleCount
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
  }
`);
