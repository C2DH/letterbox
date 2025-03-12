import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import {
  getAddressById,
  getAddressCompanies,
  getAddressCountries,
  getAddressMessages,
  getAddressPeople,
} from '../core/graphql';

/**
 * Hook to retrieve an address by its id.
 */
export const useGetAddressById = (id?: string) => {
  // Loading the address
  const { loading, error, data } = useQuery(getAddressById, { variables: { id: id || '' } });
  if (error) throw error;
  const address = useMemo(() => {
    if (data && data.result.length === 1) {
      return data.result[0];
    }
    return undefined;
  }, [data]);
  if (!loading && !address) throw { code: 404, message: `Address ${id} not found` };

  // Fetch companies
  const [lazyCompanies] = useLazyQuery(getAddressCompanies, { variables: { id: id || '' } });
  const fetchCompanies = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCompanies({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].companies : [];
    },
    [lazyCompanies, id],
  );

  // Fetch countries
  const [lazyCountries] = useLazyQuery(getAddressCountries);
  const fetchCountries = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCountries({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].countries : [];
    },
    [lazyCountries, id],
  );

  // Fetch people
  const [lazyPeople] = useLazyQuery(getAddressPeople);
  const fetchPeople = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyPeople({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].people : [];
    },
    [lazyPeople, id],
  );

  // Fetch messages
  const [lazyMessage] = useLazyQuery(getAddressMessages);
  const fetchMessages = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyMessage({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].messages : [];
    },
    [lazyMessage, id],
  );

  return { loading, address, fetchCountries, fetchPeople, fetchMessages, fetchCompanies };
};
