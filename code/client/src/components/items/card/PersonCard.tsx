import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import { type PersonInlineFragment } from '../../../core/graphql';
import { useItemCounts } from '../../../hooks/useItemCounts.ts';
import { ItemDeleted } from '../ItemDeleted.tsx';
import { ItemsCounts } from '../ItemsCounts';
import { ItemVerified } from '../ItemVerified.tsx';

export const PersonCard: FC<{ data: PersonInlineFragment }> = ({ data }) => {
  const { tags } = data;
  const { itemCounts, loadingStatus } = useItemCounts('person', data.id);
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
