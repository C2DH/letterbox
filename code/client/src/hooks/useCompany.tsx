import { useLazyQuery, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import {
  aggregateCompaniesQuery,
  getCompanyAddresses,
  getCompanyById,
  getCompanyCountries,
  getCompanyMessages,
  getCompanyPeople,
} from '../core/graphql';

/**
 * Hook to retrieve a company by its id.
 */
export const useGetCompanyById = (id?: string) => {
  // Load the company
  const { loading, error, data } = useQuery(getCompanyById, { variables: { id: id || '' } });
  const company = useMemo(() => {
    if (data && data.result.length === 1) {
      return data.result[0];
    }
    return undefined;
  }, [data]);
  if (error) throw error;
  if (!loading && !company) throw { code: 404, message: `Company ${id} not found` };

  // Fetch addresses
  const [lazyAddresses] = useLazyQuery(getCompanyAddresses, { variables: { id: id || '' } });
  const fetchAddresses = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyAddresses({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].addresses : [];
    },
    [lazyAddresses, id],
  );

  // Fetch countries
  const [lazyCountries] = useLazyQuery(getCompanyCountries);
  const fetchCountries = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyCountries({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].countries : [];
    },
    [lazyCountries, id],
  );

  // Fetch people
  const [lazyPeople] = useLazyQuery(getCompanyPeople);
  const fetchPeople = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyPeople({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].people : [];
    },
    [lazyPeople, id],
  );

  // Fetch messages
  const [lazyMessage] = useLazyQuery(getCompanyMessages);
  const fetchMessages = useCallback(
    async (skip: number, limit: number) => {
      const result = await lazyMessage({ variables: { id: id || '', skip, limit } });
      return result.data?.result[0] ? result.data.result[0].messages : [];
    },
    [lazyMessage, id],
  );

  return { loading, company, fetchAddresses, fetchCountries, fetchPeople, fetchMessages };
};

/**
 * Hook to retrive top values for companies
 */
export const useGetCompanyAggregations = () => {
  const { loading, error, data } = useQuery(aggregateCompaniesQuery, {});
  return { loading, error, data };
};
