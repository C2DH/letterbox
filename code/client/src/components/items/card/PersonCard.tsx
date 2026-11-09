import { filter, isNil } from 'lodash';
import { type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge';
import type { ItemType } from '../../../core/consts';
import { type PersonInlineFragment } from '../../../core/graphql';
import { useItemCounts } from '../../../hooks/useItemCounts';
import { ItemDeleted } from '../ItemDeleted';
import { ItemVerified } from '../ItemVerified';
import { ItemsCounts } from '../ItemsCounts';

export const PersonCard: FC<{
  data: PersonInlineFragment;
  from?: { type: ItemType; id: string };
}> = ({ data, from }) => {
  const { tags } = data;
  const { itemCounts, loadingStatus } = useItemCounts('person', data.id, from);
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);

  return (
    <>
      <h5 className="card-title">
        <Link className="text-dark" to={`/person/${data.id}`} title={`View person "${data.name}"`}>
          {data.name}
        </Link>
        <ItemVerified item={data} />
        <ItemDeleted item={data} />
      </h5>

      <ItemsCounts itemType="person" data={itemCounts} loadingStatus={loadingStatus} />

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
