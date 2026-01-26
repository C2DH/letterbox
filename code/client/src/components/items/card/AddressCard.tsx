import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import type { ItemType } from '../../../core/consts.tsx';
import { type AddressInlineFragment } from '../../../core/graphql';
import { useItemCounts } from '../../../hooks/useItemCounts.ts';
import { ItemDeleted } from '../ItemDeleted.tsx';
import { ItemsCounts } from '../ItemsCounts';
import { ItemVerified } from '../ItemVerified.tsx';

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
