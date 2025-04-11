import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import { type AddressInlineFragment } from '../../../core/graphql';
import { ItemsCounts } from '../ItemsCounts';

export const AddressCard: FC<{ data: AddressInlineFragment }> = ({ data }) => {
  const { tags } = data;
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);

  return (
    <article className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link className="text-dark" to={`/address/${data.id}`}>
            {data.name}
          </Link>
        </h5>

        <ItemsCounts itemType="address" data={data} />

        {!!cleanedTags.length && (
          <section>
            {cleanedTags.map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </section>
        )}
      </div>
    </article>
  );
};
