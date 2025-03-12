import { graphql } from '../generated/gql';

export const getCompanyById = graphql(`
  query GetCompanyById($id: ID!) {
    companies(where: { id_EQ: $id }) {
      id
      name
    }
  }
`);
