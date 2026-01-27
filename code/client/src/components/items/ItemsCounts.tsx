import { Spinner } from '@ouestware/loaders';
import cx from 'classnames';
import { isNil } from 'lodash';
import type { FC } from 'react';

import {
  APP_LANGUAGE,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ITEM_TYPES_AFFINITIES,
  ItemIcon,
  ItemType,
} from '../../core/consts';
import type { AsyncStatus } from '../../types.ts';
import { shortenNumber } from '../../utils/number.ts';

export const ItemsCounts: FC<{
  itemType: ItemType;
  loadingStatus?: AsyncStatus;
  data: null | Partial<{
    companiesCount: number;
    addressesCount: number;
    peopleCount: number;
    countriesCount: number;
    messagesCount: number;
    commonCompaniesCount?: number;
  }>;
}> = ({ itemType, data, loadingStatus }) => {
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
      )
        .filter(({ type }) => type !== itemType)
        .map(({ field, type }) => {
          const value = data && field in data ? data[field] || 0 : null;
          const displayCommonCount = type === 'company' && !isNil(data?.commonCompaniesCount);
          if (value !== null || loadingStatus !== undefined)
            return (
              <li
                key={field}
                className={cx(
                  'list-inline-item pe-1 with-icon',
                  !ITEM_TYPES_AFFINITIES[itemType].has(type) && 'text-muted',
                  displayCommonCount && 'fw-bold',
                )}
                title={`${value?.toLocaleString(APP_LANGUAGE) || '?'} ${value === null || value > 1 ? ITEM_TYPE_LABELS_PLURAL[type] : ITEM_TYPE_LABELS[type]}`.toLowerCase()}
              >
                {loadingStatus!.type === 'loading' && <Spinner className="spinner-border-sm" />}
                {loadingStatus!.type === 'error' && <>!</>}
                {loadingStatus!.type === 'success' && !isNil(value) && (
                  <>
                    {displayCommonCount && <>{shortenNumber(data.commonCompaniesCount!)}/</>}
                    {shortenNumber(value)}
                  </>
                )}{' '}
                <ItemIcon type={type} />
              </li>
            );
          else return null;
        })}
    </ul>
  );
};
