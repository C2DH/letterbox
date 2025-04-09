import { filter, isNil, max, min } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { type CompanyInlineFragment } from '../../../core/graphql';
import { ItemsCounts } from '../ItemsCounts';

export const CompanyCard: FC<{ data: CompanyInlineFragment }> = ({ data }) => {
  const { tags, years } = data;
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);
  const minYear = min(years);
  const maxYear = max(years);

  return (
    <article className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link className="text-dark" to={`/company/${data.id}`}>
            {data.name}
          </Link>
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
              <span key={i} className="badge text-bg-primary me-2">
                {tag}
              </span>
            ))}
          </section>
        )}
      </div>
    </article>
  );
};
