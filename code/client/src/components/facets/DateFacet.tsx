import { DateFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import { FC, useEffect, useMemo, useState } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import config from '../../config.ts';

export const DateFacet: FC = () => {
  const {
    state: { filters },
    setFilter,
  } = useFacetsContext();
  const [state, setState] = useState<{ min?: number; max?: number }>({});
  const filter = useMemo(() => (filters || {}).date as DateFilter | undefined, [filters]);

  useEffect(() => {
    setState({
      min: filter?.min,
      max: filter?.max,
    });
  }, [filter?.max, filter?.min]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setFilter('date', {
          ...(filter || {}),
          type: 'date',
          min: state.min,
          max: state.max,
        });
      }}
    >
      <section className="d-flex flex-row align-items-end">
        {(
          [
            { key: 'min', label: 'Start', placeholder: config.minYear },
            { key: 'max', label: 'End', placeholder: config.maxYear },
          ] as const
        ).map(({ key, label, placeholder }) => (
          <div key={key} className="ms-2">
            <label htmlFor={`date-${key}`} className="form-label">
              {label}
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                style={{ width: 120 }}
                id={`date-${key}`}
                value={state[key] || ''}
                placeholder={placeholder + ''}
                onChange={(e) =>
                  setState({ ...state, [key]: e.target.value ? +e.target.value : undefined })
                }
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                title={'Set to default value'}
                onClick={() => {
                  setFilter('date', {
                    ...(filter || {}),
                    ...state,
                    type: 'date',
                    [key]: undefined,
                  });
                }}
              >
                <RiCloseFill />
              </button>
            </div>
          </div>
        ))}
        <button className="btn btn-outline-dark ms-2" type="submit">
          Update
        </button>
      </section>
    </form>
  );
};
