import { filter, isNil, max, min } from 'lodash';
import { type FC, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge';
import type { ItemType } from '../../../core/consts';
import { type CompanyInlineFragment } from '../../../core/graphql';
import { useItemCounts } from '../../../hooks/useItemCounts';
import { ItemDeleted } from '../ItemDeleted';
import { ItemVerified } from '../ItemVerified';
import { ItemsCounts } from '../ItemsCounts';

export const CompanyCard: FC<{
  data: CompanyInlineFragment;
  from?: { type: ItemType; id: string };
}> = ({ data, from }) => {
  const { tags, years } = data;
  const { itemCounts, loadingStatus } = useItemCounts('company', data.id, from);
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);
  const minYear = min(years);
  const maxYear = max(years);

  return (
    <>
      <h5 className="card-title">
        <Link
          className="text-dark"
          to={`/company/${data.id}`}
          title={`View company "${data.name}"`}
        >
          {data.name}
        </Link>
        <ItemVerified item={data} />
        <ItemDeleted item={data} />
      </h5>

      <ItemsCounts itemType="company" data={itemCounts} loadingStatus={loadingStatus} />

      {typeof minYear === 'number' && typeof maxYear === 'number' && (
        <section className="text-muted">
          {minYear === maxYear ? minYear : `${minYear} - ${maxYear}`}
        </section>
      )}

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
