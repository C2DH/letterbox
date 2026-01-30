import { useApolloClient } from '@apollo/client';
import { useFacetsContext } from '@ouestware/facets-client';
import { InfiniteScroll, InfiniteScrollProps } from '@ouestware/infinite-scroll';
import { useNotifications } from '@ouestware/notifications';
import cx from 'classnames';
import { isNil } from 'lodash';
import { FC, useCallback, useMemo, useState } from 'react';
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
import type { AsyncStatus } from '../types.ts';
import { escapeToCSVValue, objectToCSV } from '../utils/csv.ts';
import { ITEM_CSV_FIELDS_BY_TYPE } from '../utils/data.ts';
import { getErrorData } from '../utils/error.ts';
import { filtersStateToSearchFilters } from '../utils/filters';
import { ErrorInline } from './error/index.tsx';
import { QueryForm } from './facets/QueryForm.tsx';
import { ItemCard } from './items/card/ItemCard.tsx';

const ListComponent = InfiniteScroll<NodeItem, { itemType: ItemType }>;
type ListProps = InfiniteScrollProps<NodeItem, { itemType: ItemType }>;

const ItemComponent: ListProps['element'] = ({ itemType, data }) => {
  return (
    <article
      className={cx(
        'card-item mb-4',
        itemType === 'message'
          ? 'col-sm-6 col-md-6 col-lg-4 col-xl-2'
          : 'col-sm-6 col-md-4 col-lg-3 col-xl-2',
      )}
    >
      <ItemCard data={data} itemType={itemType} />
    </article>
  );
};

export const ItemsList: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const { state } = useFacetsContext();
  const { notify } = useNotifications();
  const client = useApolloClient();
  const [loadDataStatus, setLoadDataStatus] = useState<AsyncStatus>({ type: 'idle' });

  const loadData = useCallback(
    async (from: number, limit = 30) => {
      try {
        setLoadDataStatus({ type: 'loading' });
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
            filters: filtersStateToSearchFilters(state, itemType),
            limit,
            from,
            sortBy,
          },
          fetchPolicy: 'no-cache',
        });
        if (error) throw error;
        if (!search) throw new Error('No proper data was received from searchCompanies.');
        setLoadDataStatus({ type: 'success' });
        return {
          total: search.total,
          data: search.results.filter((r) => !isNil(r)) as NodeItem[],
        };
      } catch (e) {
        setLoadDataStatus({ type: 'error', message: getErrorData(e).message });
        return {
          total: -1,
          data: [],
        };
      }
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
        // With from & size, ES has a limit of 10k results
        let limit = 500;
        if (from + 500 >= 10000) {
          limit = 10000 - from;
          hasMore = false; // We are at the limit of 10k items
        }
        const result = await loadData(from, limit);
        for (const item of result.data || []) {
          writer.write(new TextEncoder().encode(objectToCSV(item, headers) + '\n'));
          from++;
        }
        if (result.data.length < 500) {
          hasMore = false; // No more data to fetch
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
              title={`Download ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()} (Limited to 10k items)`}
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
      <>
        {loadDataStatus.type === 'loading' && (
          <div className={cx('mb-4', itemType === 'message' ? 'col-4' : 'col-2')}>
            <div className="text-center pt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {loadDataStatus.type === 'error' && <ErrorInline message={loadDataStatus.message} />}
      </>
    ),
    [itemType, loadDataStatus],
  );

  const List: ListProps['list'] = useMemo(
    () =>
      ({ children }) => <div className="position-relative row">{children}</div>,
    [],
  );

  return (
    <ListComponent
      element={ItemComponent}
      elementProps={{ itemType }}
      getDataId={(data) => data.id}
      loadData={loadData}
      bottom={Bottom}
      list={List}
      top={Top}
    />
  );
};
