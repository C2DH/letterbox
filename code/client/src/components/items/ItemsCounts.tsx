import cx from 'classnames';
import type { FC } from 'react';

import {
  APP_LANGUAGE,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPES_AFFINITIES,
  ItemIcon,
  ItemType,
} from '../../core/consts';
import { shortenNumber } from '../../utils/number.ts';

export const ItemsCounts: FC<{
  itemType: ItemType;
  data: Partial<{
    companiesCount: number;
    addressesCount: number;
    peopleCount: number;
    countriesCount: number;
    messagesCount: number;
  }>;
}> = ({ itemType, data }) => {
  return (
    <ul className="list-inline my-1">
      {(
        [
          { field: 'companiesCount', type: 'company' },
          { field: 'addressesCount', type: 'address' },
          { field: 'peopleCount', type: 'person' },
          { field: 'countriesCount', type: 'country' },
          { field: 'messagesCount', type: 'message' },
        ] as const
      ).map(({ field, type }) => {
        const value = data[field] || 0;
        return (
          <li
            key={field}
            className={cx(
              'list-inline-item pe-1 with-icon',
              !ITEM_TYPES_AFFINITIES[itemType].has(type) && 'text-muted',
            )}
            title={`${value.toLocaleString(APP_LANGUAGE)} ${value > 1 ? ITEM_TYPE_LABELS_PLURAL[type] : ITEM_TYPE_LABELS[type]}`.toLowerCase()}
          >
            {shortenNumber(value)} <ItemIcon type={type} />
          </li>
        );
      })}
    </ul>
  );
};
