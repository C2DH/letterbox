import { filter, isNil } from 'lodash';
import { useMemo, type FC } from 'react';
import { Link } from 'react-router-dom';

import { Badge } from '../../../Badge.tsx';
import {
  FILTERABLE_ITEM_TYPES,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPE_TO_COUNT_FIELD,
  ITEM_TYPE_TO_FIELD,
  ItemIcon,
  ItemType,
} from '../../../core/consts.tsx';
import { useEditionContext } from '../../../core/edition.ts';
import { type MessageInlineFragment } from '../../../core/graphql';
import { getMessageName } from '../../../utils/data.ts';
import { Collapsable } from '../../Collapsable';
import { InCartButton } from '../../edition/InCartButton.tsx';
import { ItemsCounts } from '../ItemsCounts';

const TYPES = FILTERABLE_ITEM_TYPES as Exclude<ItemType, 'message'>[];

export const MessageCard: FC<{ data: MessageInlineFragment }> = ({ data }) => {
  const { enabled } = useEditionContext();
  const name = getMessageName(data);
  const cleanedTags = useMemo(
    () => filter(data.tags || [], (s) => !isNil(s)) as string[],
    [data.tags],
  );

  return (
    <>
      <h5 className="card-title d-flex flex-row align-items-baseline">
        <Link to={`/message/${data.id}`} className="flex-grow-1 flex-shrink-1">
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
        if (!list.length) return null;

        return (
          <section key={type}>
            {list.map((item) =>
              enabled ? (
                <div key={item.id} className="mb-1 d-flex align-items-center">
                  <span className="me-2">{item.name}</span>
                  <InCartButton type={type} id={item.id} label={item.name} />
                </div>
              ) : (
                <span key={item.id} className="me-2 with-icon">
                  <ItemIcon type={type} /> {item.name}
                </span>
              ),
            )}
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
    </>
  );
};
