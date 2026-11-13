import { DateFilter } from '@ouestware/facets';
import { describe, expect, test } from 'vitest';

import config from '../config';
import { DATE_FACET } from '../core/consts';
import { filtersStateToSearchFilters } from './filters';

const { minYear, maxYear } = config;

describe('filtersStateToSearchFilters, date bounds', () => {
  const toSearch = (min?: number, max?: number) =>
    filtersStateToSearchFilters({ filters: { [DATE_FACET.id]: { type: 'date', min, max } as DateFilter } }, 'message')
      .year;

  test('the full range sends no date filter', () => {
    expect(toSearch(minYear, maxYear)).toBeUndefined();
  });

  test('bounds outside the range send no date filter', () => {
    expect(toSearch(minYear - 10, maxYear + 10)).toBeUndefined();
  });

  test('only the bounds that narrow the range are sent', () => {
    expect(toSearch(1950, maxYear)).toMatchObject({ min: 1950, max: undefined });
    expect(toSearch(minYear, 1980)).toMatchObject({ min: undefined, max: 1980 });
    expect(toSearch(1950, 1980)).toMatchObject({ min: 1950, max: 1980 });
  });

  test('a single year at an extreme is still a filter', () => {
    expect(toSearch(maxYear, maxYear)).toMatchObject({ min: maxYear, max: undefined });
    expect(toSearch(minYear, minYear)).toMatchObject({ min: undefined, max: minYear });
  });
});
