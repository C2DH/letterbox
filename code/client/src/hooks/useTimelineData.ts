import { useApolloClient } from '@apollo/client/react';
import { useFacetsContext } from '@ouestware/facets-client';
import { getAsyncMemoData, useAsyncMemo } from '@ouestware/hooks';
import { fromPairs, max } from 'lodash';
import { useMemo } from 'react';

import { DataItemType } from '../core/graphql';
import { itemsTimeline, messagesTimeline } from '../core/graphql/queries/timeline';
import { filtersStateToSearchFilters } from '../utils/filters';

export type TimelineData = {
  maxCount: number;
  counts: Record<string, number>;
};

export function useTimelineData(itemType: DataItemType): {
  data: TimelineData | null;
  loading: boolean;
} {
  const { state: filtersState } = useFacetsContext();
  const client = useApolloClient();
  const dataState = useAsyncMemo(
    () =>
      client.query({
        fetchPolicy: 'no-cache',
        query: itemType === 'message' ? messagesTimeline : itemsTimeline,
        variables: {
          itemType,
          filters: filtersStateToSearchFilters(filtersState, itemType),
        },
      }),
    [filtersState, itemType],
  );
  const result = useMemo(() => getAsyncMemoData(dataState), [dataState]);
  const data = useMemo(() => {
    if (!result || !result.data) return null;

    return {
      maxCount: max(result.data.aggregate.values.map(({ count }) => count)) || 0,
      counts: fromPairs(result.data.aggregate.values.map(({ id, count }) => [id, count])),
    };
  }, [result]);

  return { data, loading: dataState.type === 'loading' };
}
