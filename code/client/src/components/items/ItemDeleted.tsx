import type { FC } from 'react';

import type { NodeItem } from '../../core/graphql';

export const ItemDeleted: FC<{
  item: Pick<NodeItem, 'deleted'>;
}> = ({ item }) => {
  if (!item.deleted) return null;
  return (
    <span style={{ fontSize: '0.7em' }} className="badge rounded-pill text-bg-purple-300 ms-1">
      Deleted
    </span>
  );
};
