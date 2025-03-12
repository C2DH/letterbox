import { graphql } from './generated';

export const AddressInline = graphql(`
  fragment AddressInline on Address {
    id
    name
  }
`);

export const CompanyInline = graphql(`
  fragment CompanyInline on Company {
    id
    name
  }
`);

export const CountryInline = graphql(`
  fragment CountryInline on Country {
    id
    name
  }
`);

export const MessageInline = graphql(`
  fragment MessageInline on Message {
    id
    year
    message
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
  }
`);
