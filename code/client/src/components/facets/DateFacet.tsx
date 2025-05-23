import { DateFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import { FC, useEffect, useMemo, useState } from 'react';

export const DateFacet: FC = () => {
  const {
    state: { filters },
    setFilter,
  } = useFacetsContext();
  const [state, setState] = useState<{ min?: number; max?: number }>({});
  const filter = useMemo(() => (filters || {}).date as DateFilter | undefined, [filters]);
  const isDisabled = useMemo(
    () => filter?.min === state.min && filter?.max === state.max,
    [filter?.max, filter?.min, state.max, state.min],
  );

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
            { key: 'min', label: 'Start' },
            { key: 'max', label: 'End' },
          ] as const
        ).map(({ key, label }) => (
          <div key={key} className="ms-2">
            <label htmlFor={`date-${key}`} className="form-label">
              {label}
            </label>
            <input
              type="number"
              className="form-control"
              style={{ width: 120 }}
              id={`date-${key}`}
              value={state[key] || ''}
              onChange={(e) =>
                setState({ ...state, [key]: e.target.value ? +e.target.value : undefined })
              }
            />
          </div>
        ))}
        <button className="btn ms-2" type="submit" disabled={isDisabled}>
          Update
        </button>
      </section>
      <section className="text-end"></section>
    </form>
  );
};
