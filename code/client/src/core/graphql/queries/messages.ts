import { graphql } from '../generated/gql';

export const getMessageById = graphql(`
  query GetMessageById($id: ID!) {
    messages(where: { id_EQ: $id }) {
      id
      people {
        id
        name
      }
      companies {
        id
        name
      }
      addresses {
        id
        name
      }
      countries {
        id
        name
      }
    }
  }
`);
