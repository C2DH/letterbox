import { useApolloClient, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import { ITEM_TYPE_TO_FIELD, ItemType } from '../core/consts.tsx';
import {
  getAddressById,
  getAddressCompanies,
  getAddressCountries,
  getAddressMessages,
  getAddressPeople,
  getCompanyAddresses,
  getCompanyById,
  getCompanyCountries,
  getCompanyMessages,
  getCompanyPeople,
  getCountryAddresses,
  getCountryById,
  getCountryCompanies,
  getCountryMessages,
  getCountryPeople,
  getMessageAddresses,
  getMessageById,
  getMessageCompanies,
  getMessageCountries,
  getMessagePeople,
  getPersonAddresses,
  getPersonById,
  getPersonCompanies,
  getPersonCountries,
  getPersonMessages,
  NodeItem,
} from '../core/graphql';

const QUERIES = {
  company: {
    getItemById: getCompanyById,
    relations: {
      address: getCompanyAddresses,
      country: getCompanyCountries,
      people: getCompanyPeople,
      message: getCompanyMessages,
    },
  },
  address: {
    getItemById: getAddressById,
    relations: {
      company: getAddressCompanies,
      country: getAddressCountries,
      people: getAddressPeople,
      message: getAddressMessages,
    },
  },
  country: {
    getItemById: getCountryById,
    relations: {
      company: getCountryCompanies,
      address: getCountryAddresses,
      people: getCountryPeople,
      message: getCountryMessages,
    },
  },
  people: {
    getItemById: getPersonById,
    relations: {
      company: getPersonCompanies,
      address: getPersonAddresses,
      country: getPersonCountries,
      message: getPersonMessages,
    },
  },
  message: {
    getItemById: getMessageById,
    relations: {
      company: getMessageCompanies,
      address: getMessageAddresses,
      country: getMessageCountries,
      people: getMessagePeople,
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
      if (itemType === relationType)
        throw new Error(`Items of type ${itemType} have no relation to themselves.`);

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

  return { loading, itemData, fetchRelations };
}
