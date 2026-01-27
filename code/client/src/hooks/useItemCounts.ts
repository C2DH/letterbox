import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import { ITEM_TYPE_LABELS, ItemType } from '../core/consts';
import {
  AddressItemsCountsFragment,
  CompanyItemsCountsFragment,
  CountryItemsCountsFragment,
  getAddressItemsCounts,
  getAddressItemsCountsWithCommons,
  getCompanyItemsCounts,
  getCompanyItemsCountsWithCommons,
  getCountryItemsCounts,
  getCountryItemsCountsWithCommons,
  getMessageItemsCounts,
  getPersonItemsCounts,
  getPersonItemsCountsWithCommons,
  MessageItemsCountsFragment,
  PersonItemCountsFragment,
} from '../core/graphql';
import type { AsyncStatus } from '../types';

const QUERIES = {
  company: getCompanyItemsCounts,
  address: getAddressItemsCounts,
  country: getCountryItemsCounts,
  person: getPersonItemsCounts,
  message: getMessageItemsCounts,
} as const;

const QUERIES_WITH_COMMONS = {
  company: getCompanyItemsCountsWithCommons,
  address: getAddressItemsCountsWithCommons,
  country: getCountryItemsCountsWithCommons,
  person: getPersonItemsCountsWithCommons,
  message: getMessageItemsCounts,
} as const;

type Graphqlresponse =
  | { result: Array<CompanyItemsCountsFragment & { commonCompaniesCount?: number }> }
  | { result: Array<AddressItemsCountsFragment & { commonCompaniesCount?: number }> }
  | { result: Array<CountryItemsCountsFragment & { commonCompaniesCount?: number }> }
  | { result: Array<PersonItemCountsFragment & { commonCompaniesCount?: number }> }
  | { result: Array<MessageItemsCountsFragment> };
/**
 * Hook to retrieve item relations counts.
 */
export const useItemCounts = (
  type: ItemType,
  id: string,
  from?: { type: ItemType; id: string },
) => {
  const [fetchCounts] = useLazyQuery<Graphqlresponse>(QUERIES[type], {});

  const [fetchCountsWithCommons] = useLazyQuery<Graphqlresponse>(QUERIES_WITH_COMMONS[type], {});

  const [loadingStatus, setLoadingStatus] = useState<AsyncStatus>({ type: 'idle' });
  const [itemCounts, setItemCounts] = useState<null | Graphqlresponse['result'][0]>(null);

  useEffect(() => {
    const exec = async () => {
      setLoadingStatus({ type: 'loading' });
      try {
        const response = await (from
          ? fetchCountsWithCommons({
              variables: { id, fromType: ITEM_TYPE_LABELS[from.type], fromId: from.id },
            })
          : fetchCounts({ variables: { id } }));

        if (!response.data) throw new Error(`Bad count result: ${JSON.stringify(response)}`);
        setItemCounts(response.data.result[0]);
        setLoadingStatus({ type: 'success' });
      } catch (error) {
        setLoadingStatus({ type: 'error' });
        console.error(error);
      }
    };
    exec();
  }, [fetchCounts, fetchCountsWithCommons, type, id, from]);

  return {
    loadingStatus,
    itemCounts,
  };
};
