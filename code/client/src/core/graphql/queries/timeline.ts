import { graphql } from '../generated';

export const timeline = graphql(`
  query QueryTimeline($itemType: DataItemType!, $filters: SearchFilters!) {
    aggregate(itemType: $itemType, field: years, filters: $filters, size: 1000) {
      total
      values {
        label
        id
        count
      }
    }
  }
`);
