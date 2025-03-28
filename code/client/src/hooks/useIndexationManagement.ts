import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo } from 'react';

import {
  countItemsWithPendingModifications,
  indexPendingModificationsMutation,
} from '../core/graphql';

/**
 * Hook to retrieve a person by its id.
 */
export const useIndexationManagement = () => {
  // get number of pending modifications
  const { loading, error, data, refetch } = useQuery(countItemsWithPendingModifications, {
    variables: {},
  });
  if (error) throw error;
  const nbItemsWithPendingModifications = useMemo(() => data?.nbItems, [data]);
  const onGoingIndexation = useMemo(() => data?.onGoingIndexation[0], [data]);

  // Fetch addresses
  const [_indexPendingModifications] = useMutation(indexPendingModificationsMutation);
  const indexPendingModifications = useCallback(async () => {
    const result = await _indexPendingModifications({ variables: {} });
    return result.data?.result;
  }, [_indexPendingModifications]);

  return {
    loading,
    nbItemsWithPendingModifications,
    onGoingIndexation,
    indexPendingModifications,
    refetch,
  };
};
