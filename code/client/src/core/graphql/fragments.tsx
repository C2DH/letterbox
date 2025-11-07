import { graphql } from './generated';

export const AddressInline = graphql(`
  fragment AddressInline on Address {
    id
    name
    tags
    deleted
    verified
  }
`);

export const AddressItemsCounts = graphql(`
  fragment AddressItemsCounts on Address {
    companiesCount
    countriesCount
    messagesCount
    peopleCount
    addressesCount
  }
`);

export const CompanyInline = graphql(`
  fragment CompanyInline on Company {
    id
    name
    years
    tags
    deleted
    verified
  }
`);

export const CompanyItemsCounts = graphql(`
  fragment CompanyItemsCounts on Company {
    addressesCount
    countriesCount
    messagesCount
    peopleCount
    companiesCount
  }
`);

export const CountryInline = graphql(`
  fragment CountryInline on Country {
    id
    name
    tags
    deleted
    verified
  }
`);

export const CountryItemsCounts = graphql(`
  fragment CountryItemsCounts on Country {
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
    addresses(limit: 5) {
      id
      name
    }
    companies(limit: 5) {
      id
      name
    }
    countries(limit: 5) {
      id
      name
    }
    people(limit: 5) {
      id
      name
    }
    tags
    deleted
    verified
    filename
    pageNumber
  }
`);

export const MessageItemsCounts = graphql(`
  fragment MessageItemsCounts on Message {
    addressesCount
    companiesCount
    countriesCount
    peopleCount
  }
`);

export const PersonInline = graphql(`
  fragment PersonInline on Person {
    id
    name
    tags
    deleted
    verified
  }
`);

export const PersonItemCounts = graphql(`
  fragment PersonItemCounts on Person {
    addressesCount
    companiesCount
    countriesCount
    messagesCount
    peopleCount
  }
`);
