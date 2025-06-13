import { graphql } from '../generated';

export const messagesTimeline = graphql(`
  query QueryMessagesTimeline($itemType: DataItemType!, $filters: SearchFilters!) {
    aggregate(itemType: $itemType, field: year, filters: $filters, size: 1000) {
      total
      values {
        label
        id
        count
      }
    }
  }
`);

export const itemsTimeline = graphql(`
  query QueryItemsTimeline($itemType: DataItemType!, $filters: SearchFilters!) {
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
