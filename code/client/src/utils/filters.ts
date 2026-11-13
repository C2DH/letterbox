import { DateFilter, FiltersState } from '@ouestware/facets';

import config from '../config';
import { DATE_FACET, ItemType, TAGS_FACET, VERIFIED_FACET } from '../core/consts';
import { FilterTypes, SearchFilters } from '../core/graphql';

/**
 * Returns a date filter with both bounds set, defaulting to the extreme years.
 * The facets library drops empty filters, so this keeps the date filter alive.
 */
export function getDateFilter({ min, max }: Omit<DateFilter, 'type'>): Required<DateFilter> {
  return { type: 'date', min: min ?? config.minYear, max: max ?? config.maxYear };
}

export function filtersStateToSearchFilters({ filters = {}, query }: FiltersState, itemType: ItemType): SearchFilters {
  const res: SearchFilters = {};

  if (query) {
    res.content = {
      type: FilterTypes.Content,
      query,
    };
  }

  const verifiedFilter = filters[VERIFIED_FACET.id];
  if (verifiedFilter && verifiedFilter.type === 'boolean' && typeof verifiedFilter.value === 'boolean') {
    res.verified = {
      type: FilterTypes.Boolean,
      value: !!verifiedFilter.value,
    };
  }

  const datesFilter = filters[DATE_FACET.id];
  if (datesFilter && datesFilter.type === 'date') {
    // Drop bounds that do not narrow the range, to keep items without dates:
    const { minYear, maxYear } = config;
    const min = datesFilter.min !== undefined && datesFilter.min > minYear ? datesFilter.min : undefined;
    const max = datesFilter.max !== undefined && datesFilter.max < maxYear ? datesFilter.max : undefined;
    if (min !== undefined || max !== undefined) {
      res[itemType === 'message' ? 'year' : 'years'] = {
        type: FilterTypes.Date,
        min,
        max,
      };
    }
  }

  const tagsFilter = filters[TAGS_FACET.id];
  if (tagsFilter && tagsFilter.type === 'keywords') {
    res.tags = {
      type: FilterTypes.Keywords,
      values: tagsFilter.values,
    };
  }

  // Item type filters:
  (
    [
      { gqlField: 'addresses', field: 'address' },
      { gqlField: 'companies', field: 'company' },
      { gqlField: 'countries', field: 'country' },
      { gqlField: 'people', field: 'person' },
    ] as const
  ).forEach(({ gqlField, field }) => {
    const filter = filters[field];
    // If we have a keyword filter (ie some selected element)
    // which type differ from the current type (ie. on companies explore page, filter on companies is disabled, but not the content one )
    if (filter && filter.type === 'keywords' && field !== itemType)
      res[gqlField] = {
        type: FilterTypes.Keywords,
        values: filter.values,
      };
  });

  return res;
}
