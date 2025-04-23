import { useMutation } from '@apollo/client';
import { useCallback } from 'react';

import type { DataItemType } from '../core/graphql';
import {
  changeTypeByTypeId,
  deleteNodeByTypeId,
  merge,
  renameByTypeId,
  splitByTypeId,
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

  // merge nodes
  const [mergeMutation] = useMutation(merge, {});
  const mergeItems = useCallback(
    async (type: DataItemType, name: string, items: { type: DataItemType; id: string }[]) => {
      const response = await mergeMutation({ variables: { type, name, items } });
      return response.data?.result;
    },
    [mergeMutation],
  );

  // split node
  const [splitMutation] = useMutation(splitByTypeId, {});
  const splitItem = useCallback(
    async (type: DataItemType, id: string, names: string[]) => {
      const response = await splitMutation({ variables: { type, id, values: names } });
      return response.data?.result;
    },
    [splitMutation],
  );

  return {
    changeItemType,
    renameItem,
    deleteItem,
    mergeItems,
    splitItem,
  };
};
