import { useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import { ITEM_TYPE_TO_FIELD, ItemType } from '../core/consts.tsx';
import {
  AddressItemsCountsFragment,
  CompanyItemsCountsFragment,
  CountryItemsCountsFragment,
  getAddressAddresses,
  getAddressById,
  getAddressCompanies,
  getAddressCountries,
  getAddressItemsCounts,
  getAddressMessages,
  getAddressPeople,
  getCompanyAddresses,
  getCompanyById,
  getCompanyCompanies,
  getCompanyCountries,
  getCompanyItemsCounts,
  getCompanyMessages,
  getCompanyPeople,
  getCountryAddresses,
  getCountryById,
  getCountryCompanies,
  getCountryItemsCounts,
  getCountryMessages,
  getCountryPeople,
  getMessageAddresses,
  getMessageById,
  getMessageCompanies,
  getMessageCountries,
  getMessageItemsCounts,
  getMessagePeople,
  getPersonAddresses,
  getPersonById,
  getPersonCompanies,
  getPersonCountries,
  getPersonItemsCounts,
  getPersonMessages,
  getPersonPeople,
  MessageItemsCountsFragment,
  NodeItem,
  PersonItemCountsFragment,
} from '../core/graphql';

const QUERIES = {
  company: {
    getItemById: getCompanyById,
    itemsCounts: getCompanyItemsCounts,
    relations: {
      company: getCompanyCompanies,
      address: getCompanyAddresses,
      country: getCompanyCountries,
      person: getCompanyPeople,
      message: getCompanyMessages,
    },
  },
  address: {
    getItemById: getAddressById,
    itemsCounts: getAddressItemsCounts,
    relations: {
      company: getAddressCompanies,
      country: getAddressCountries,
      person: getAddressPeople,
      message: getAddressMessages,
      address: getAddressAddresses,
    },
  },
  country: {
    getItemById: getCountryById,
    itemsCounts: getCountryItemsCounts,
    relations: {
      company: getCountryCompanies,
      address: getCountryAddresses,
      person: getCountryPeople,
      message: getCountryMessages,
      //country: getCountryCountries,
    },
  },
  person: {
    getItemById: getPersonById,
    itemsCounts: getPersonItemsCounts,
    relations: {
      company: getPersonCompanies,
      address: getPersonAddresses,
      country: getPersonCountries,
      message: getPersonMessages,
      person: getPersonPeople,
    },
  },
  message: {
    getItemById: getMessageById,
    itemsCounts: getMessageItemsCounts,
    relations: {
      company: getMessageCompanies,
      address: getMessageAddresses,
      country: getMessageCountries,
      person: getMessagePeople,
    },
  },
} as const;

export function useLoadItemData(
  itemType: ItemType,
  id?: string,
): {
  loading?: boolean;
  itemData?: NodeItem;
  fetchRelations: (relationType: ItemType, skip: number, limit: number) => Promise<NodeItem[]>;
  fetchItemsCounts: () => Promise<
    | PersonItemCountsFragment
    | CountryItemsCountsFragment
    | CompanyItemsCountsFragment
    | MessageItemsCountsFragment
    | AddressItemsCountsFragment
    | null
  >;
} {
  const client = useApolloClient();

  // Load the country
  const { loading, error, data } = useQuery(QUERIES[itemType].getItemById, {
    variables: { id: id || '' },
  });
  if (error) throw error;
  const itemData = useMemo(() => {
    if (data && data.result.length === 1) {
      return data.result[0] as NodeItem;
    }
    return undefined;
  }, [data]);
  if (!loading && !itemData)
    throw { code: 404, message: `Item ${id} with type ${itemType} not found` };

  const fetchRelations = useCallback(
    async (relationType: ItemType, skip: number, limit: number) => {
      const queries = QUERIES[itemType].relations;

      const result = await client.query({
        query: queries[relationType as keyof typeof queries],
        variables: { id: id || '', skip, limit },
      });

      const fieldKey = ITEM_TYPE_TO_FIELD[relationType];
      const firstResult = result.data?.result[0] as Record<typeof fieldKey, NodeItem[]> | undefined;
      return firstResult ? firstResult[fieldKey] : [];
    },
    [client, id, itemType],
  );

  const fetchItemsCounts = useCallback(async () => {
    const query = QUERIES[itemType].itemsCounts;

    const result = await client.query({
      query,
      variables: { id: id || '' },
    });

    const firstResult = result.data?.result[0];
    return firstResult ? firstResult : null;
  }, [client, id, itemType]);

  return { loading, itemData, fetchRelations, fetchItemsCounts };
}
