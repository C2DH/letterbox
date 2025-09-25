import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import { type CountryInlineFragment } from '../../../core/graphql';
import { useItemCounts } from '../../../hooks/useItemCounts.ts';
import { ItemDeleted } from '../ItemDeleted.tsx';
import { ItemsCounts } from '../ItemsCounts';
import { ItemVerified } from '../ItemVerified.tsx';

export const CountryCard: FC<{ data: CountryInlineFragment }> = ({ data }) => {
  const { tags } = data;
  const { itemCounts, loading } = useItemCounts('country', data.id);
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);

  return (
    <>
      <h5 className="card-title">
        <Link
          className="text-dark"
          to={`/country/${data.id}`}
          title={`View country "${data.name}"`}
        >
          {data.name}
        </Link>
        <ItemVerified item={data} />
        <ItemDeleted item={data} />
      </h5>

      <ItemsCounts itemType="country" data={itemCounts} loadingData={loading} />

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
