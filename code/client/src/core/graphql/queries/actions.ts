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

export const merge = graphql(`
  mutation Merge($type: DataItemType!, $name: String!, $items: [NodeIdentification!]!) {
    result: mergeNodes(type: $type, name: $name, nodes: $items) {
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

export const setTagsMutation = graphql(`
  mutation SetNodeTags($type: DataItemType!, $id: ID!, $tags: [String]!) {
    result: setNodeTags(type: $type, id: $id, tags: $tags) {
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

export const setVerifiedMutation = graphql(`
  mutation SetNodeVerified($type: DataItemType!, $id: ID!, $verified: Boolean!) {
    result: setNodeVerified(type: $type, id: $id, verified: $verified) {
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
