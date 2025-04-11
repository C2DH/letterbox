import { useApolloClient } from '@apollo/client';
import { useFacetsContext } from '@ouestware/facets-client';
import { InfiniteScroll, InfiniteScrollProps } from '@ouestware/infinite-scroll';
import cx from 'classnames';
import { isNil } from 'lodash';
import { FC, ReactNode, useCallback, useMemo } from 'react';

import {
  APP_LANGUAGE,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPE_TO_DATA_TYPE,
  ItemIcon,
  ItemType,
} from '../core/consts';
import {
  CompanyInlineFragment,
  CountryInlineFragment,
  MessageInlineFragment,
  NodeItem,
  PersonInlineFragment,
  type AddressInlineFragment,
} from '../core/graphql';
import { searchItems } from '../core/graphql/queries/search';
import { filtersStateToSearchFilters } from '../utils/filters';
import { AddressCard } from './items/card/AddressCard';
import { CompanyCard } from './items/card/CompanyCard';
import { CountryCard } from './items/card/CountryCard';
import { MessageCard } from './items/card/MessageCard';
import { PersonCard } from './items/card/PersonCard';
import { QueryForm } from './QueryForm.tsx';

const ListComponent = InfiniteScroll<NodeItem, { itemType: ItemType }>;
type ListProps = InfiniteScrollProps<NodeItem, { itemType: ItemType }>;

const ItemComponent: ListProps['element'] = ({ itemType, data }) => {
  if (data.__typename !== ITEM_TYPE_LABELS[itemType])
    throw new Error(
      `NodeItem __typename "${data.__typename}" should match page item type "${itemType}"`,
    );

  let content: ReactNode = null;
  switch (itemType) {
    case 'address':
      content = <AddressCard data={data as AddressInlineFragment} />;
      break;
    case 'company':
      content = <CompanyCard data={data as CompanyInlineFragment} />;
      break;
    case 'country':
      content = <CountryCard data={data as CountryInlineFragment} />;
      break;
    case 'people':
      content = <PersonCard data={data as PersonInlineFragment} />;
      break;
    case 'message':
      content = <MessageCard data={data as MessageInlineFragment} />;
      break;
  }

  return <div className={cx('mb-4', itemType === 'message' ? 'col-4' : 'col-2')}>{content}</div>;
};

export const ItemsList: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const { state } = useFacetsContext();
  const client = useApolloClient();
  const loadData = useCallback(
    async (from: number) => {
      const {
        data: { search },
        error,
      } = await client.query({
        query: searchItems,
        variables: {
          itemType: ITEM_TYPE_TO_DATA_TYPE[itemType],
          limit: 30,
          filters: filtersStateToSearchFilters(state),
          from,
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
          <div className="col-4">
            <QueryForm itemType={itemType} />
          </div>
        </div>
      ),
    [itemType],
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
