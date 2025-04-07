import { BooleanFilter, DateFilter } from '@ouestware/facets';
import {
  FacetsRoot,
  searchToState,
  stateToSearch,
  useFacetsContext,
} from '@ouestware/facets-client';
import cx from 'classnames';
import { isNil, without } from 'lodash';
import { FC, useEffect, useMemo, useState } from 'react';
import { RiDownloadLine, RiPriceTagLine, RiSearch2Line } from 'react-icons/ri';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

import { ItemFacet } from '../components/ItemFacet.tsx';
import {
  FACETS,
  FILTERABLE_ITEM_TYPES,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPES,
  ITEM_TYPES_SET,
  ItemIcon,
  ItemType,
  REACT_SELECT_BASE_PROPS,
} from '../core/consts.tsx';

const STATUSES: {
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

const StatusFacet: FC = () => {
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

const DateFacet: FC = () => {
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

export const Explore: FC = () => {
  const { type: inputType } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();

  const [state, setState] = useState(searchToState(new URLSearchParams(search), FACETS));
  const selectedType = useMemo(() => {
    if (!inputType) throw new Error(`There is no item type to explore.`);
    if (!ITEM_TYPES_SET.has(inputType)) throw new Error(`Type ${inputType} is not handled yet.`);
    return inputType as ItemType;
  }, [inputType]);

  // Update URL search:
  useEffect(() => {
    const newSearch = stateToSearch(state).toString();
    console.log({ search, newSearch });
    if (newSearch !== search)
      navigate(`/explore/${selectedType}${newSearch ? '?' + newSearch : ''}`, { replace: true });
  }, [navigate, search, selectedType, state]);

  const listBlocks = useMemo(() => without(FILTERABLE_ITEM_TYPES, selectedType), [selectedType]);

  return (
    <FacetsRoot
      filtersState={state}
      onFiltersStateChange={setState}
      portalId="portal-root"
      autocomplete={async (_facet, _state, _includes) => {
        return {
          values: [],
          total: 0,
        };
      }}
      loadHistogram={async (_facet, _state) => {
        return {
          values: [],
          total: 0,
        };
      }}
    >
      {/* SIDEBAR */}
      <aside className="py-5">
        <h3 className="text-muted fw-light px-4 text-dark">Explore by counting</h3>
        {ITEM_TYPES.map((itemType) => (
          <Link
            key={itemType}
            to={`/explore/${itemType}`}
            className={cx(
              'with-icon d-block link-dark link-underline-opacity-0 px-4 py-3 fs-3',
              itemType === selectedType ? 'fw-medium' : 'fw-light',
            )}
          >
            <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}
          </Link>
        ))}
      </aside>

      {/* MAIN CONTENT */}
      <main className="p-4">
        {/* HEADER (timeline + date inputs) */}
        <section className="d-flex flex-row align-items-end mb-4">
          <div className="me-4 timeline flex-grow-1"></div>
          <div>
            <DateFacet />
          </div>
        </section>

        {/* LIST BLOCKS */}
        <section className="row align-items-stretch">
          {listBlocks.map((itemType) => (
            <div key={itemType} className={cx('mb-4', listBlocks.length === 3 ? 'col-4' : 'col-6')}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title d-flex flex-row align-items-baseline">
                    <h2 className="with-icon fw-semibold flex-grow-1 m-0">
                      <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}{' '}
                      <span className="text-muted">123</span>
                    </h2>

                    <button className="btn btn-dark py-1 px-2">
                      <RiDownloadLine />
                    </button>
                  </div>

                  <ItemFacet itemType={itemType} />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* OTHER FILTERS */}
        <section className="row mb-6">
          {/*TAG FILTERS*/}
          <section className="col-4">
            <h2 className="with-icon fw-semibold">
              <RiPriceTagLine /> Tags
            </h2>
            <Select {...REACT_SELECT_BASE_PROPS} isMulti placeholder="Search for tags and filter" />
          </section>

          {/*TAG FILTERS*/}
          <section className="col-4">
            <StatusFacet />
          </section>
        </section>

        {/* CORE ITEMS LIST */}
        <section>
          <div className="row">
            <h2 className="with-icon fw-semibold flex-grow-1 col-8">
              <ItemIcon type={selectedType} /> {ITEM_TYPE_LABELS_PLURAL[selectedType]}{' '}
              <span className="text-muted">123</span>
            </h2>
            <div className="col-4">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Search for ${ITEM_TYPE_LABELS_PLURAL[selectedType].toLowerCase()}`}
                  aria-label={`Search for ${ITEM_TYPE_LABELS_PLURAL[selectedType].toLowerCase()}`}
                />
                <span className="input-group-text">
                  <RiSearch2Line />
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </FacetsRoot>
  );
};
