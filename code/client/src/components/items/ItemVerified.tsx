import type { FC } from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import type { NodeItem } from '../../core/graphql';

export const ItemVerified: FC<{
  item: Pick<NodeItem, 'verified'>;
}> = ({ item }) => {
  if (!item.verified) return null;
  return <RiCheckboxCircleLine className="ms-1" />;
};
