import { BooleanFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import { FC } from 'react';

import { FACETS_STATUS } from './const';

export const StatusFacet: FC = () => {
  const { state, setFilter } = useFacetsContext();

  return (
    <>
      <h2 className="fs-3 with-icon fw-semibold">Status</h2>
      <div>
        {FACETS_STATUS.map(({ id, label, isChecked, getFilter }) => (
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
