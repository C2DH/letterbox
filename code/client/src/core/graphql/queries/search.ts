import { graphql } from '../generated';

export const searchItems = graphql(`
  query SearchItems(
    $itemType: DataItemType!
    $filters: SearchFilters!
    $includes: String = ""
    $limit: Int = 10
  ) {
    search(itemType: $itemType, filters: $filters, limit: $limit, includes: $includes) {
      total
      results {
        ... on Company {
          ...CompanyInline
        }
        ... on Address {
          ...AddressInline
        }
        ... on Country {
          ...CountryInline
        }
        ... on Message {
          ...MessageInline
        }
        ... on Person {
          ...PersonInline
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
