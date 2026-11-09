import { filter, isNil } from 'lodash';
import { type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge';
import type { ItemType } from '../../../core/consts';
import { type AddressInlineFragment } from '../../../core/graphql';
import { useItemCounts } from '../../../hooks/useItemCounts';
import { ItemDeleted } from '../ItemDeleted';
import { ItemVerified } from '../ItemVerified';
import { ItemsCounts } from '../ItemsCounts';

export const AddressCard: FC<{
  data: AddressInlineFragment;
  from?: { type: ItemType; id: string };
}> = ({ data, from }) => {
  const { tags } = data;
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);

  const { itemCounts, loadingStatus } = useItemCounts('address', data.id, from);

  return (
    <>
      <h5 className="card-title">
        <Link
          className="text-dark me-1"
          to={`/address/${data.id}`}
          title={`View address "${data.name}"`}
        >
          {data.name}
        </Link>
        <ItemVerified item={data} />
        <ItemDeleted item={data} />
      </h5>

      <ItemsCounts itemType="address" data={itemCounts} loadingStatus={loadingStatus} />

      {!!cleanedTags.length && (
        <section>
          {cleanedTags.map((tag, i) => (
            <Badge key={i}>{tag}</Badge>
          ))}
        </section>
      )}
    </>
  );
};
