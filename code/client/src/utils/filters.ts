import { FiltersState } from '@ouestware/facets';

import { DATE_FACET, TAGS_FACET, VERIFIED_FACET } from '../core/consts.tsx';
import { FilterTypes, SearchFilters } from '../core/graphql';

export function filtersStateToSearchFilters({ filters = {}, query }: FiltersState): SearchFilters {
  const res: SearchFilters = {};

  if (query) {
    res.content = {
      type: FilterTypes.Content,
      query,
    };
  }

  const verifiedFilter = filters[VERIFIED_FACET.id];
  if (
    verifiedFilter &&
    verifiedFilter.type === 'boolean' &&
    typeof verifiedFilter.value === 'boolean'
  ) {
    res.verified = {
      type: FilterTypes.Boolean,
      value: !!verifiedFilter.value,
    };
  }

  const datesFilter = filters[DATE_FACET.id];
  if (datesFilter && datesFilter.type === 'date') {
    res.years = {
      type: FilterTypes.Date,
      min: datesFilter.min,
      max: datesFilter.max,
    };
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
      { gqlField: 'people', field: 'people' },
    ] as const
  ).forEach(({ gqlField, field }) => {
    const filter = filters[field];
    if (filter && filter.type === 'keywords') {
      res[gqlField] = {
        type: FilterTypes.Keywords,
        values: filter.values,
      };
    }
  });

  return res;
}
