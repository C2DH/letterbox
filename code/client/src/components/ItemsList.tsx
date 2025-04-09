import { useApolloClient } from '@apollo/client';
import { useFacetsContext } from '@ouestware/facets-client';
import { getAsyncMemoData, useAsyncMemo } from '@ouestware/hooks';
import { FC, useMemo } from 'react';

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

const ItemComponent: FC<{ itemType: ItemType; item: NodeItem }> = ({ itemType, item }) => {
  if (item.__typename !== ITEM_TYPE_LABELS[itemType])
    throw new Error(
      `NodeItem __typename "${item.__typename}" should match page item type "${itemType}"`,
    );

  switch (itemType) {
    case 'address':
      return <AddressCard data={item as AddressInlineFragment} />;
    case 'company':
      return <CompanyCard data={item as CompanyInlineFragment} />;
    case 'country':
      return <CountryCard data={item as CountryInlineFragment} />;
    case 'people':
      return <PersonCard data={item as PersonInlineFragment} />;
    case 'message':
      return <MessageCard data={item as MessageInlineFragment} />;
  }
};

export const ItemsList: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const { state } = useFacetsContext();
  const client = useApolloClient();
  const itemsState = useAsyncMemo(async () => {
    const {
      data: { search },
      error,
    } = await client.query({
      query: searchItems,
      variables: {
        itemType: ITEM_TYPE_TO_DATA_TYPE[itemType],
        limit: 50,
        filters: filtersStateToSearchFilters(state),
      },
      fetchPolicy: 'no-cache',
    });
    if (error) throw error;
    if (!search) throw new Error('No proper data was received from searchCompanies.');

    return search;
  }, [itemType, state]);
  const total = useMemo(() => {
    return getAsyncMemoData(itemsState)?.total;
  }, [itemsState]);
  const items = useMemo(() => {
    const list = getAsyncMemoData(itemsState)?.results || [];
    return list.filter((item) => !!item) as NodeItem[];
  }, [itemsState]);
  const isLoading = itemsState.type === 'loading';

  return (
    <section>
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

      <div className="position-relative row">
        {items.map((item, i) => (
          <div key={i} className="col-2 mb-4">
            <ItemComponent itemType={itemType} item={item} />
          </div>
        ))}

        {isLoading && (
          <div className="position-absolute inset-0">
            <div className="bg-light opacity-50 position-absolute inset-0" />
            <div className="text-center py-3 position-absolute top-0 start-0 end-0">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
