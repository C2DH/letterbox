import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import { type AddressInlineFragment } from '../../../core/graphql';
import { ItemDeleted } from '../ItemDeleted.tsx';
import { ItemsCounts } from '../ItemsCounts';
import { ItemVerified } from '../ItemVerified.tsx';

export const AddressCard: FC<{ data: AddressInlineFragment }> = ({ data }) => {
  const { tags } = data;
  const cleanedTags = useMemo(() => filter(tags || [], (s) => !isNil(s)) as string[], [tags]);

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

      <ItemsCounts itemType="address" data={data} />

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
