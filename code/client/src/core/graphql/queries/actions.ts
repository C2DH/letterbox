import { graphql } from '../generated/gql';

export const deleteNodeByTypeId = graphql(`
  mutation DeleteNodeByTypeId($type: DataItemType!, $id: ID!) {
    result: deleteNode(type: $type, id: $id)
  }
`);

export const changeTypeByTypeId = graphql(`
  mutation ChangeTypeByTypeId($type: DataItemType!, $id: ID!, $newType: DataItemType!) {
    result: changeType(type: $type, id: $id, newType: $newType) {
      ... on Address {
        ...AddressInline
      }
      ... on Company {
        ...CompanyInline
      }
      ... on Country {
        ...CountryInline
      }
      ... on Person {
        ...PersonInline
      }
    }
  }
`);

export const renameByTypeId = graphql(`
  mutation RenameNode($type: DataItemType!, $id: ID!, $name: String!) {
    result: renameNode(type: $type, id: $id, name: $name) {
      ... on Address {
        ...AddressInline
      }
      ... on Company {
        ...CompanyInline
      }
      ... on Country {
        ...CountryInline
      }
      ... on Person {
        ...PersonInline
      }
    }
  }
`);

export const splitByTypeId = graphql(`
  mutation SplitByTypeId($type: DataItemType!, $id: ID!, $values: [String!]!) {
    result: splitNode(type: $type, id: $id, values: $values) {
      ... on Address {
        ...AddressInline
      }
      ... on Company {
        ...CompanyInline
      }
      ... on Country {
        ...CountryInline
      }
      ... on Person {
        ...PersonInline
      }
    }
  }
`);
