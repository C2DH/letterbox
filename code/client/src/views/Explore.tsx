import { useApolloClient } from '@apollo/client';
import { FiltersState } from '@ouestware/facets';
import { FacetsRoot, KeywordsFacet, searchToState, stateToSearch } from '@ouestware/facets-client';
import cx from 'classnames';
import { without } from 'lodash';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { DateFacet } from '../components/facets/DateFacet.tsx';
import { ItemFacet } from '../components/facets/ItemFacet.tsx';
import { StatusFacet } from '../components/facets/StatusFacet.tsx';
import { TagsFacet } from '../components/facets/TagsFacet.tsx';
import { ItemsList } from '../components/ItemsList';
import { Sidebar } from '../components/navigation/Sidebar.tsx';
import {
  FACETS,
  FILTERABLE_ITEM_TYPES,
  ITEM_TYPE_TO_DATA_TYPE,
  ITEM_TYPE_TO_FIELD,
  ITEM_TYPES_SET,
  ItemType,
} from '../core/consts';
import { AggregationFields } from '../core/graphql';
import { aggregateItems } from '../core/graphql/queries/search';
import { filtersStateToSearchFilters } from '../utils/filters';

export const Explore: FC = () => {
  const { type: inputType } = useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const client = useApolloClient();

  const [state, setState] = useState(searchToState(new URLSearchParams(search), FACETS));
  const selectedType = useMemo(() => {
    if (!inputType) throw new Error(`There is no item type to explore.`);
    if (!ITEM_TYPES_SET.has(inputType)) throw new Error(`Type ${inputType} is not handled yet.`);
    return inputType as ItemType;
  }, [inputType]);
  const listBlocks = useMemo(() => without(FILTERABLE_ITEM_TYPES, selectedType), [selectedType]);

  const fingerprint = useMemo(
    () => JSON.stringify({ selectedType, ...state }),
    [selectedType, state],
  );

  const fetchItems = useCallback(
    async (facet: KeywordsFacet, filters: FiltersState, input = '') => {
      const field = (ITEM_TYPE_TO_FIELD as unknown as Record<string, AggregationFields>)[facet.id];
      if (!field) throw new Error(`${facet.id} is not a valid field.`);
      const itemType = ITEM_TYPES_SET.has(facet.id) ? (facet.id as ItemType) : null;
      const {
        data: { aggregate },
        error,
      } = await client.query({
        query: aggregateItems,
        variables: {
          itemType: ITEM_TYPE_TO_DATA_TYPE[selectedType],
          field,
          limit: 500,
          filters: filtersStateToSearchFilters(filters),
          includes: input,
        },
        fetchPolicy: 'no-cache',
      });
      if (error) throw error;
      if (!aggregate) throw new Error('No proper data was received from searchCompanies.');

      return {
        total: aggregate.total,
        values: aggregate.values.flatMap((item) =>
          item
            ? [
                {
                  value: item.id,
                  label: item.label,
                  count: item.count,
                  link: itemType ? `/${itemType}/${item.id}` : undefined,
                },
              ]
            : [],
        ),
      };
    },
    [client, selectedType],
  );

  // Update URL search:
  useEffect(() => {
    const newSearch = stateToSearch(state).toString();
    if (newSearch !== search)
      navigate(`/explore/${selectedType}${newSearch ? '?' + newSearch : ''}`, { replace: true });
  }, [navigate, search, selectedType, state]);

  return (
    <FacetsRoot
      filtersState={state}
      onFiltersStateChange={setState}
      portalId="portal-root"
      autocomplete={fetchItems}
      loadHistogram={fetchItems}
    >
      {/* SIDEBAR */}
      <Sidebar activeItemType={selectedType} />

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
              <div
                className="card overflow-y-auto"
                style={{ height: listBlocks.length === 3 ? 800 : 400 }}
              >
                <div className="card-body">
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
            <TagsFacet />
          </section>

          {/*TAG FILTERS*/}
          <section className="col-4">
            <StatusFacet />
          </section>
        </section>

        {/* CORE ITEMS LIST */}
        <ItemsList key={fingerprint} itemType={selectedType} />
      </main>
    </FacetsRoot>
  );
};
