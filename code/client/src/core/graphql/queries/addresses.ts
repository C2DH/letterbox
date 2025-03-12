import { graphql } from '../generated/gql';

export const getAddressById = graphql(`
  query GetAddressById($id: ID!) {
    addresses(where: { id_EQ: $id }) {
      id
      name
    }
  }
`);
