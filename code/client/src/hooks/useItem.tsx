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
  getCountryCountries,
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

const SORT_HINT_COMMON = 'Companies in common (desc), name (asc)';
const SORT_HINT_BY_NAME = 'Name (asc)';
const SORT_HINT_BY_DATE = 'Date (asc)';

export const QUERIES = {
  company: {
    getItemById: getCompanyById,
    itemsCounts: getCompanyItemsCounts,
    relations: {
      address: { query: getCompanyAddresses, sortHint: SORT_HINT_BY_NAME },
      company: { query: getCompanyCompanies, sortHint: SORT_HINT_BY_NAME },
      country: { query: getCompanyCountries, sortHint: SORT_HINT_BY_NAME },
      message: { query: getCompanyMessages, sortHint: SORT_HINT_BY_DATE },
      person: { query: getCompanyPeople, sortHint: SORT_HINT_BY_NAME },
    },
  },
  address: {
    getItemById: getAddressById,
    itemsCounts: getAddressItemsCounts,
    relations: {
      address: { query: getAddressAddresses, sortHint: SORT_HINT_COMMON },
      company: { query: getAddressCompanies, sortHint: SORT_HINT_COMMON },
      country: { query: getAddressCountries, sortHint: SORT_HINT_COMMON },
      message: { query: getAddressMessages, sortHint: SORT_HINT_BY_DATE },
      person: { query: getAddressPeople, sortHint: SORT_HINT_COMMON },
    },
  },
  country: {
    getItemById: getCountryById,
    itemsCounts: getCountryItemsCounts,
    relations: {
      address: { query: getCountryAddresses, sortHint: SORT_HINT_COMMON },
      company: { query: getCountryCompanies, sortHint: SORT_HINT_COMMON },
      country: { query: getCountryCountries, sortHint: SORT_HINT_COMMON },
      message: { query: getCountryMessages, sortHint: SORT_HINT_BY_DATE },
      person: { query: getCountryPeople, sortHint: SORT_HINT_COMMON },
    },
  },
  person: {
    getItemById: getPersonById,
    itemsCounts: getPersonItemsCounts,
    relations: {
      address: {
        query: getPersonAddresses,
        sortHint: SORT_HINT_COMMON,
      },
      company: {
        query: getPersonCompanies,
        sortHint: SORT_HINT_COMMON,
      },
      country: { query: getPersonCountries, sortHint: SORT_HINT_COMMON },
      message: { query: getPersonMessages, sortHint: SORT_HINT_BY_DATE },
      person: { query: getPersonPeople, sortHint: SORT_HINT_COMMON },
    },
  },
  message: {
    getItemById: getMessageById,
    itemsCounts: getMessageItemsCounts,
    relations: {
      address: { query: getMessageAddresses, sortHint: SORT_HINT_BY_NAME },
      company: { query: getMessageCompanies, sortHint: SORT_HINT_BY_NAME },
      country: { query: getMessageCountries, sortHint: SORT_HINT_BY_NAME },
      person: { query: getMessagePeople, sortHint: SORT_HINT_BY_NAME },
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
  relationSortHints: Map<ItemType, string>;
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
        query: queries[relationType as keyof typeof queries].query,
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

  const relationSortHints = useMemo(() => {
    const hints = new Map<ItemType, string>();
    const relationsDefinition = QUERIES[itemType].relations;
    if ('address' in relationsDefinition)
      hints.set('address', relationsDefinition.address.sortHint);
    if ('company' in relationsDefinition)
      hints.set('company', relationsDefinition.company.sortHint);
    if ('country' in relationsDefinition)
      hints.set('country', relationsDefinition.country.sortHint);
    if ('person' in relationsDefinition) hints.set('person', relationsDefinition.person.sortHint);
    if ('message' in relationsDefinition)
      hints.set('message', relationsDefinition.message.sortHint);

    return hints;
  }, [itemType]);

  return { loading, itemData, fetchRelations, fetchItemsCounts, relationSortHints };
}
