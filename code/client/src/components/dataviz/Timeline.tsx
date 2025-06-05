import { useApolloClient } from '@apollo/client';
import { FiltersState } from '@ouestware/facets';
import { getAsyncMemoData, useAsyncMemo } from '@ouestware/hooks';
import { LoaderFill } from '@ouestware/loaders';
import { fromPairs, max, range } from 'lodash';
import { FC, useMemo } from 'react';

import config from '../../config.ts';
import { APP_LANGUAGE } from '../../core/consts.tsx';
import { DataItemType } from '../../core/graphql';
import { timeline } from '../../core/graphql/queries/timeline.ts';
import { filtersStateToSearchFilters } from '../../utils/filters.ts';

export const Timeline: FC<{
  itemType: DataItemType;
  filters: FiltersState;
}> = ({ filters, itemType }) => {
  const client = useApolloClient();
  const dataState = useAsyncMemo(
    () =>
      client.query({
        query: timeline,
        variables: {
          itemType,
          filters: filtersStateToSearchFilters(filters),
        },
      }),
    [filters, itemType],
  );
  const data = useMemo(() => getAsyncMemoData(dataState), [dataState]);
  const timelineData = useMemo(() => {
    if (!data) return null;

    return {
      maxCount: max(data.data.aggregate.values.map(({ count }) => count)) || 0,
      counts: fromPairs(data.data.aggregate.values.map(({ id, count }) => [id, count])),
    };
  }, [data]);

  return (
    <section className="position-relative h-100 d-flex flex-row align-items-center">
      {timelineData?.maxCount && (
        <>
          <span>{config.minYear}</span>
          <div className=" h-100 flex-grow-1 mx-2 border rounded-pill" style={{ padding: '.8em' }}>
            <div className="border w-100 h-100 d-flex flex-row align-items-stretch">
              {range(config.minYear, config.maxYear + 1).map((year) => {
                const count = timelineData.counts[year] || 0;
                const ratio = count / timelineData.maxCount;
                return (
                  <div
                    key={year}
                    title={`${count.toLocaleString(APP_LANGUAGE)} message${count > 1 ? 's' : ''} in ${year}`}
                    style={{ opacity: ratio, background: '#000' }}
                    className="flex-grow-1"
                  />
                );
              })}
            </div>
          </div>
          <span>{config.maxYear}</span>
        </>
      )}
      {dataState.type === 'loading' && <LoaderFill />}
    </section>
  );
};
