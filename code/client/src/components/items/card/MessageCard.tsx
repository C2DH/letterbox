import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import {
  FILTERABLE_ITEM_TYPES,
  ITEM_TYPE_ICONS,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPE_TO_COUNT_FIELD,
  ITEM_TYPE_TO_FIELD,
  ItemType,
} from '../../../core/consts.tsx';
import { type MessageInlineFragment } from '../../../core/graphql';
import { getMessageName } from '../../../utils/data.ts';
import { Collapsable } from '../../Collapsable';
import { ItemsCounts } from '../ItemsCounts';

const TYPES = FILTERABLE_ITEM_TYPES as Exclude<ItemType, 'message'>[];

export const MessageCard: FC<{ data: MessageInlineFragment }> = ({ data }) => {
  const name = getMessageName(data);
  const cleanedTags = useMemo(
    () => filter(data.tags || [], (s) => !isNil(s)) as string[],
    [data.tags],
  );

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link title={`Link to message page '${name}`} to={`/message/${data.id}`}>
            {name}
            {data.companiesCount > 3 && ` and ${data.companiesCount - 3} more`}
          </Link>
        </h5>
        <ItemsCounts itemType="message" data={data} />
        {!!cleanedTags.length && (
          <section>
            {cleanedTags.map((tag, i) => (
              <Badge key={i}>{tag}</Badge>
            ))}
          </section>
        )}

        {TYPES.map((type) => {
          const list = data[ITEM_TYPE_TO_FIELD[type]];
          const count = data[ITEM_TYPE_TO_COUNT_FIELD[type]];
          const remaining = count - list.length;
          const Icon = ITEM_TYPE_ICONS[type];
          if (!list.length) return null;

          return (
            <section key={type}>
              {list.map((item) => (
                <span key={item.id} className="me-2 with-icon">
                  <Icon /> {item.name}
                </span>
              ))}
              {!!remaining && (
                <span className="text-muted">
                  and {remaining} other{' '}
                  {(remaining > 1
                    ? ITEM_TYPE_LABELS_PLURAL[type]
                    : ITEM_TYPE_LABELS[type]
                  ).toLowerCase()}
                </span>
              )}
            </section>
          );
        })}

        <Collapsable title="Content">
          <div className="card card-body bg-yellow-200">{data.message}</div>
        </Collapsable>
      </div>
    </div>
  );
};
