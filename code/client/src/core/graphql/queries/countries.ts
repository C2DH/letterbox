import { graphql } from '../generated/gql';

export const getCountryById = graphql(`
  query GetCountryById($id: ID!) {
    countries(where: { id_EQ: $id }) {
      id
      name
    }
  }
`);
