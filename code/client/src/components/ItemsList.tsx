import { useApolloClient } from '@apollo/client';
import { useFacetsContext } from '@ouestware/facets-client';
import { InfiniteScroll, InfiniteScrollProps } from '@ouestware/infinite-scroll';
import { useNotifications } from '@ouestware/notifications';
import cx from 'classnames';
import { isNil } from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import streamSaver from 'streamsaver';

import {
  APP_LANGUAGE,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPE_TO_DATA_TYPE,
  ItemIcon,
  ItemType,
} from '../core/consts';
import { EsSortDirection, NodeItem } from '../core/graphql';
import { searchItems } from '../core/graphql/queries/search';
import { escapeToCSVValue, objectToCSV } from '../utils/csv.ts';
import { ITEM_CSV_FIELDS_BY_TYPE } from '../utils/data.ts';
import { filtersStateToSearchFilters } from '../utils/filters';
import { QueryForm } from './facets/QueryForm.tsx';
import { ItemCard } from './items/card/ItemCard.tsx';

const ListComponent = InfiniteScroll<NodeItem, { itemType: ItemType }>;
type ListProps = InfiniteScrollProps<NodeItem, { itemType: ItemType }>;

const ItemComponent: ListProps['element'] = ({ itemType, data }) => {
  return (
    <article className={cx('mb-4', itemType === 'message' ? 'col-4' : 'col-2')}>
      <ItemCard data={data} itemType={itemType} />
    </article>
  );
};

export const ItemsList: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const { state } = useFacetsContext();
  const { notify } = useNotifications();
  const client = useApolloClient();
  const loadData = useCallback(
    async (from: number, limit = 30) => {
      const sortBy = [{ direction: EsSortDirection.Desc, field: '_score' }];
      switch (itemType) {
        case 'company':
          sortBy.push({ direction: EsSortDirection.Desc, field: 'peopleCount' });
          break;
        default:
          sortBy.push({ direction: EsSortDirection.Desc, field: 'companiesCount' });
          break;
      }
      const {
        data: { search },
        error,
      } = await client.query({
        query: searchItems,
        variables: {
          itemType: ITEM_TYPE_TO_DATA_TYPE[itemType],
          filters: filtersStateToSearchFilters(state),
          limit,
          from,
          sortBy,
        },
        fetchPolicy: 'no-cache',
      });
      if (error) throw error;
      if (!search) throw new Error('No proper data was received from searchCompanies.');

      return {
        total: search.total,
        data: search.results.filter((r) => !isNil(r)) as NodeItem[],
      };
    },
    [client, itemType, state],
  );

  /**
   * Download function to create a CSV file.
   * It takes the histogramData that we already have, and generate a CSV of it.
   */
  const download = useCallback(async () => {
    const fileStream = streamSaver.createWriteStream(
      `${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}.csv`,
    );
    const writer = fileStream.getWriter();
    try {
      // Header
      const headers = ITEM_CSV_FIELDS_BY_TYPE[itemType];
      if (!headers) throw new Error(`${itemType} has no CSV definition`);
      writer.write(
        new TextEncoder().encode(headers.map((e) => escapeToCSVValue(e)).join(',') + '\n'),
      );

      // Load data in chunks of 500 items
      notify({
        type: 'info',
        text: `Generating CSV for ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`,
      });
      let hasMore = true;
      let from = 0;
      while (hasMore) {
        const result = await loadData(from, 500);
        if (result.data.length === 0) hasMore = false;
        else {
          for (const item of result.data) {
            writer.write(new TextEncoder().encode(objectToCSV(item, headers) + '\n'));
            from++;
          }
        }
      }
      notify({
        type: 'success',
        text: `CSV has been downloaded successfully`,
      });
    } catch (e) {
      console.error('Error while generating CSV:', e);
      writer.abort(e);
      notify({
        type: 'error',
        text: `Error while generating ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`,
      });
    } finally {
      writer.close();
    }
  }, [itemType, loadData, notify]);

  const Top: ListProps['top'] = useMemo(
    () =>
      ({ total }) => (
        <div className="row mb-4">
          <h2 className="with-icon fw-semibold flex-grow-1 col-8">
            <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}
            {typeof total === 'number' && (
              <>
                {' '}
                <span className="text-muted">{total.toLocaleString(APP_LANGUAGE)}</span>
              </>
            )}
          </h2>

          <div className="col-4 d-flex">
            <QueryForm itemType={itemType} />
            <button
              className="btn btn-outline-dark btn-ico p-2 ms-2"
              title={`Download top 500 ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`}
              onClick={download}
            >
              <RiDownloadLine />
            </button>
          </div>
        </div>
      ),
    [itemType, download],
  );

  const Bottom: ListProps['bottom'] = useMemo(
    () => () => (
      <div className={cx('mb-4', itemType === 'message' ? 'col-4' : 'col-2')}>
        <div className="text-center pt-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    ),
    [itemType],
  );

  const List: ListProps['list'] = useMemo(
    () =>
      ({ children }) => <div className="position-relative row">{children}</div>,
    [],
  );

  return (
    <section>
      <ListComponent
        element={ItemComponent}
        elementProps={{ itemType }}
        getDataId={(data) => data.id}
        loadData={loadData}
        bottom={Bottom}
        list={List}
        top={Top}
      />
    </section>
  );
};
