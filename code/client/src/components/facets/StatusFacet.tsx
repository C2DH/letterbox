import { BooleanFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import { isNil } from 'lodash';
import { FC } from 'react';

export const STATUSES: {
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

export const StatusFacet: FC = () => {
  const { state, setFilter } = useFacetsContext();

  return (
    <>
      <h2 className="with-icon fw-semibold">Status</h2>
      <div>
        {STATUSES.map(({ id, label, isChecked, getFilter }) => (
          <div key={id} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="statuses"
              id={id}
              checked={isChecked((state.filters || {})['verified'] as BooleanFilter | undefined)}
              onChange={(e) => {
                if (e.target.checked) {
                  setFilter('verified', getFilter());
                }
              }}
            />
            <label className="form-check-label" htmlFor={id}>
              {label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
