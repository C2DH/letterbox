import { useMutation, useQuery } from '@apollo/client';
import { useNotifications } from '@ouestware/notifications';
import { useCallback, useEffect, useMemo } from 'react';

import {
  countItemsWithPendingModifications,
  indexPendingModificationsMutation,
} from '../core/graphql';
import { getErrorData } from '../utils/error';

/**
 * Hook to retrieve a person by its id.
 */
export const useIndexationManagement = () => {
  const { notify } = useNotifications();

  // get number of pending modifications
  const { error, data, refetch } = useQuery(countItemsWithPendingModifications, {
    variables: {},
  });

  const nbItemsWithPendingModifications = useMemo(() => data?.nbItems, [data]);
  const onGoingIndexation = useMemo(() => data?.onGoingIndexation[0], [data]);

  useEffect(() => {
    if (error) {
      notify({ type: 'error', text: getErrorData(error).message });
    }
  }, [error, notify]);

  const [_indexPendingModifications, { loading: loadingIndexation }] = useMutation(
    indexPendingModificationsMutation,
  );
  const indexPendingModifications = useCallback(async () => {
    const result = await _indexPendingModifications({ variables: {} });
    return result.data?.result;
  }, [_indexPendingModifications]);

  return {
    loadingIndexation,
    nbItemsWithPendingModifications,
    onGoingIndexation,
    indexPendingModifications,
    refetch,
  };
};
