import { graphql } from '../generated/gql';

export const countItemsWithPendingModifications = graphql(`
  query CountItemsWithPendingModifications {
    nbItems: countItemsWithPendingModifications
    onGoingIndexation: indexingPendingModifications {
      startTime
      nbItems
    }
  }
`);

export const indexPendingModificationsMutation = graphql(`
  mutation Mutation {
    result: indexPendingModifications {
      message {
        count
        errors
      }
      company {
        count
        errors
      }
      person {
        count
        errors
      }
      address {
        count
        errors
      }
      country {
        count
        errors
      }
    }
  }
`);
