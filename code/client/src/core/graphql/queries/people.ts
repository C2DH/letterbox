import { graphql } from '../generated/gql';

export const getPersonById = graphql(`
  query GetpersonById($id: ID!) {
    people(where: { id_EQ: $id }) {
      id
      name
    }
  }
`);
