import { useQuery } from '@apollo/client';
import { useMemo } from 'react';

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
  if (error) throw error;
  const itemCounts = useMemo(() => data?.result[0] || null, [data]);

  return {
    loading,
    itemCounts,
    refetch,
  };
};
