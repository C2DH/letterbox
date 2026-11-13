import { useApolloClient } from '@apollo/client/react';
import { FiltersState, KeywordsFilter } from '@ouestware/facets';
import { useEffect, useRef, useState } from 'react';

import { ItemValue } from '../core/consts';
import { ENTITY_FACETS_ORDER } from '../utils/filtersSummary';
import { QUERIES } from './useItem';

/**
 * The filters state only stores IDs. This hook loads the labels of the selected entities.
 * A label is undefined while loading, and null when the entity cannot be found.
 */
export function useEntityLabels(state: FiltersState) {
  const client = useApolloClient();
  const [labels, setLabels] = useState<Record<string, string | null>>({});
  // IDs whose label is being fetched, so that they are not fetched twice:
  const loadingIds = useRef(new Set<string>());

  useEffect(() => {
    const toLoad = ENTITY_FACETS_ORDER.flatMap((facet) => {
      const filter = state.filters?.[facet] as KeywordsFilter | undefined;
      return (filter?.values || [])
        .filter((id) => !(id in labels) && !loadingIds.current.has(id))
        .map((id) => ({ facet, id }));
    });
    if (!toLoad.length) return;
    toLoad.forEach(({ id }) => loadingIds.current.add(id));

    Promise.all(
      toLoad.map(async ({ facet, id }) => {
        try {
          const { data } = await client.query({ query: QUERIES[facet].getItemById, variables: { id } });
          return [[id, data?.result[0]?.name || null] as const];
        } catch {
          // Errors are not stored, so that the label is fetched again later:
          return [];
        }
      }),
    ).then((results) => {
      toLoad.forEach(({ id }) => loadingIds.current.delete(id));
      const entries = results.flat();
      if (entries.length) setLabels((labels) => ({ ...labels, ...Object.fromEntries(entries) }));
    });
  }, [client, state.filters, labels]);

  const addLabels = (values: ItemValue[]) =>
    setLabels((labels) => ({
      ...labels,
      ...Object.fromEntries(values.map(({ value, label }) => [value, label || value])),
    }));

  return { labels, addLabels };
}
