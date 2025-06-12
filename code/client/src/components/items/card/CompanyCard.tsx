import { filter, isNil, max, min } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import { type CompanyInlineFragment } from '../../../core/graphql';
import { ItemDeleted } from '../ItemDeleted.tsx';
import { ItemsCounts } from '../ItemsCounts';
import { ItemVerified } from '../ItemVerified.tsx';

export const CompanyCard: FC<{ data: CompanyInlineFragment }> = ({ data }) => {
  const { tags, years } = data;
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);
  const minYear = min(years);
  const maxYear = max(years);

  return (
    <>
      <h5 className="card-title">
        <Link className="text-dark" to={`/company/${data.id}`}>
          {data.name}
        </Link>
        <ItemVerified item={data} />
        <ItemDeleted item={data} />
      </h5>

      <ItemsCounts itemType="company" data={data} />

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
