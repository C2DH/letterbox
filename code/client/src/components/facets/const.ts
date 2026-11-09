import { BooleanFilter } from '@ouestware/facets';
import { isNil } from 'lodash';

export const FACETS_STATUS: {
  id: string;
  label: string;
  isChecked: (filter?: BooleanFilter) => boolean;
  getFilter: () => BooleanFilter | undefined;
}[] = [
  {
    id: 'all',
    label: 'All statuses',
    isChecked: (filter?: BooleanFilter) => isNil(filter?.value),
    getFilter: () => undefined,
  },
  {
    id: 'verified',
    label: 'Verified',
    isChecked: (filter?: BooleanFilter) => filter?.value === true,
    getFilter: () => ({
      type: 'boolean',
      value: true,
    }),
  },
  {
    id: 'unverified',
    label: 'Unverified',
    isChecked: (filter?: BooleanFilter) => filter?.value === false,
    getFilter: () => ({
      type: 'boolean',
      value: false,
    }),
  },
];
