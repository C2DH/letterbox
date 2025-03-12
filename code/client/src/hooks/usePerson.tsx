import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import {
  getPersonAddresses,
  getPersonById,
  getPersonCompanies,
  getPersonCountries,
  getPersonMessages,
} from '../core/graphql';

/**
 * Hook to retrieve a person by its id.
 */
export const useGetPersonById = (id?: string) => {
  // Load the person
  const { loading, error, data } = useQuery(getPersonById, { variables: { id: id || '' } });
  if (error) throw error;
  const person = useMemo(() => {
    if (data && data.result.length === 1) {
      return data.result[0];
    }
    return undefined;
  }, [data]);
  if (!loading && !person) throw { code: 404, message: `Person ${id} not found` };

  // Fetch addresses
  const [lazyAddresses] = useLazyQuery(getPersonAddresses);
  const fetchAddresses = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyAddresses({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].addresses : [];
    },
    [lazyAddresses, id],
  );

  // Fetch companies
  const [lazyCompanies] = useLazyQuery(getPersonCompanies, { variables: { id: id || '' } });
  const fetchCompanies = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCompanies({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].companies : [];
    },
    [lazyCompanies, id],
  );

  // Fetch countries
  const [lazyCountries] = useLazyQuery(getPersonCountries);
  const fetchCountries = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCountries({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].countries : [];
    },
    [lazyCountries, id],
  );

  // Fetch messages
  const [lazymessage] = useLazyQuery(getPersonMessages);
  const fetchMessages = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazymessage({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].messages : [];
    },
    [lazymessage, id],
  );

  return { loading, person, fetchAddresses, fetchCompanies, fetchCountries, fetchMessages };
};
