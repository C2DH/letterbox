import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';

import { ItemType } from '../core/consts';
import {
  AddressItemsCountsFragment,
  CompanyItemsCountsFragment,
  CountryItemsCountsFragment,
  getAddressItemsCounts,
  getCompanyItemsCounts,
  getCountryItemsCounts,
  getMessageItemsCounts,
  getPersonItemsCounts,
  MessageItemsCountsFragment,
  PersonItemCountsFragment,
} from '../core/graphql';
import type { AsyncStatusType } from '../types';

const QUERIES = {
  company: getCompanyItemsCounts,
  address: getAddressItemsCounts,
  country: getCountryItemsCounts,
  person: getPersonItemsCounts,
  message: getMessageItemsCounts,
} as const;

/**
 * Hook to retrieve item relations counts.
 */
export const useItemCounts = (type: ItemType, id: string) => {
  const { loading, error, data, refetch } = useQuery<
    | { result: CompanyItemsCountsFragment[] }
    | { result: AddressItemsCountsFragment[] }
    | { result: CountryItemsCountsFragment[] }
    | { result: PersonItemCountsFragment[] }
    | { result: MessageItemsCountsFragment[] }
  >(QUERIES[type], {
    variables: { id },
  });
  const [loadingStatus, setLoadingStatus] = useState<AsyncStatusType>('idle');
  const itemCounts = useMemo(() => data?.result[0] || null, [data]);

  useEffect(() => {
    if (loading) {
      setLoadingStatus('loading');
    } else if (data) {
      setLoadingStatus('success');
    } else if (error) {
      setLoadingStatus('error');
      console.error(error);
    } else {
      setLoadingStatus('idle');
    }
  }, [error, loading, data]);

  return {
    loadingStatus,
    itemCounts,
    refetch,
  };
};
