import { graphql } from '../generated';

export const searchItems = graphql(`
  query SearchItems(
    $itemType: DataItemType!
    $includes: String!
    $filters: SearchFilters!
    $limit: Int = 10
  ) {
    search(itemType: $itemType, filters: $filters, limit: $limit, includes: $includes) {
      total
      results {
        ... on Company {
          id
          name
        }
        ... on Address {
          id
          name
        }
        ... on Country {
          id
          name
        }
        ... on Message {
          id
          name: message
        }
        ... on Person {
          id
          name
        }
      }
    }
  }
`);

export const aggregateItems = graphql(`
  query AggregateItems(
    $itemType: DataItemType!
    $field: AggregationFields!
    $filters: SearchFilters!
    $query: String
    $includes: String
    $limit: Int = 10
  ) {
    aggregate(
      itemType: $itemType
      field: $field
      filters: $filters
      query: $query
      includes: $includes
      size: $limit
    ) {
      total
      values {
        label
        id
        count
      }
    }
  }
`);
