import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import {
  getCountryAddresses,
  getCountryById,
  getCountryCompanies,
  getCountryMessages,
  getCountryPeople,
} from '../core/graphql';

/**
 * Hook to retrieve a country by its id.
 */
export const useGetCountryById = (id?: string) => {
  // Load the country
  const { loading, error, data } = useQuery(getCountryById, { variables: { id: id || '' } });
  if (error) throw error;
  const country = useMemo(() => {
    if (data && data.result.length === 1) {
      return data.result[0];
    }
    return undefined;
  }, [data]);
  if (!loading && !country) throw { code: 404, message: `Country ${id} not found` };

  // Fetch addresses
  const [lazyAddresses] = useLazyQuery(getCountryAddresses);
  const fetchAddresses = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyAddresses({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].addresses : [];
    },
    [lazyAddresses, id],
  );

  // Fetch companies
  const [lazyCompanies] = useLazyQuery(getCountryCompanies, { variables: { id: id || '' } });
  const fetchCompanies = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCompanies({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].companies : [];
    },
    [lazyCompanies, id],
  );

  // Fetch people
  const [lazyPeople] = useLazyQuery(getCountryPeople);
  const fetchPeople = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyPeople({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].people : [];
    },
    [lazyPeople, id],
  );

  // Fetch messages
  const [lazymessage] = useLazyQuery(getCountryMessages);
  const fetchMessages = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazymessage({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].messages : [];
    },
    [lazymessage, id],
  );

  return { loading, country, fetchAddresses, fetchCompanies, fetchPeople, fetchMessages };
};
