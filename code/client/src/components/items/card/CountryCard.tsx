import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { type CountryInlineFragment } from '../../../core/graphql';
import { ItemsCounts } from '../ItemsCounts';

export const CountryCard: FC<{ data: CountryInlineFragment }> = ({ data }) => {
  const { tags } = data;
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);

  return (
    <article className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link className="text-dark" to={`/country/${data.id}`}>
            {data.name}
          </Link>
        </h5>

        <ItemsCounts itemType="country" data={data} />

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
