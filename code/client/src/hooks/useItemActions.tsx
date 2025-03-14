import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import type { DataItemType } from '../core/graphql';
import {
  changeTypeByTypeId,
  deleteNodeByTypeId,
  renameByTypeId,
} from '../core/graphql/queries/actions';

export const useItemActions = () => {
  // Change the type of a node
  const [changeTypeMutation] = useMutation(changeTypeByTypeId, {});
  const changeItemType = useCallback(
    async (type: DataItemType, id: string, newType: DataItemType) => {
      const response = await changeTypeMutation({ variables: { type, id, newType } });
      return response.data?.result;
    },
    [changeTypeMutation],
  );

  // Rename a node
  const [renameMutation] = useMutation(renameByTypeId, {});
  const renameItem = useCallback(
    async (type: DataItemType, id: string, name: string) => {
      const response = await renameMutation({ variables: { type, id, name } });
      return response.data?.result;
    },
    [renameMutation],
  );

  // Delete a node
  const [deleteMutation] = useMutation(deleteNodeByTypeId, {});
  const deleteItem = useCallback(
    async (type: DataItemType, id: string) => {
      await deleteMutation({ variables: { type, id } });
    },
    [deleteMutation],
  );

  return {
    changeItemType,
    renameItem,
    deleteItem,
  };
};
