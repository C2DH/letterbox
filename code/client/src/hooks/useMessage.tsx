import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import {
  getMessageAddresses,
  getMessageById,
  getMessageCompanies,
  getMessageCountries,
  getMessagePeople,
} from '../core/graphql';

/**
 * Hook to retrieve an message by its id.
 */
export const useGetMessageById = (id?: string) => {
  // Load the message
  const { loading, error, data } = useQuery(getMessageById, { variables: { id: id || '' } });
  if (error) throw error;
  const message = useMemo(() => {
    if (data && data.result.length === 1) {
      return data.result[0];
    }
    return undefined;
  }, [data]);
  if (!loading && !message) throw { code: 404, message: `Message ${id} not found` };

  // Fetch companies
  const [lazyCompanies] = useLazyQuery(getMessageCompanies, { variables: { id: id || '' } });
  const fetchCompanies = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCompanies({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].companies : [];
    },
    [lazyCompanies, id],
  );

  // Fetch countries
  const [lazyCountries] = useLazyQuery(getMessageCountries);
  const fetchCountries = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCountries({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].countries : [];
    },
    [lazyCountries, id],
  );

  // Fetch people
  const [lazyPeople] = useLazyQuery(getMessagePeople);
  const fetchPeople = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyPeople({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].people : [];
    },
    [lazyPeople, id],
  );

  // Fetch addresses
  const [lazyAddresses] = useLazyQuery(getMessageAddresses);
  const fetchAddresses = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyAddresses({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].addresses : [];
    },
    [lazyAddresses, id],
  );

  return { loading, message, fetchAddresses, fetchCompanies, fetchCountries, fetchPeople };
};
