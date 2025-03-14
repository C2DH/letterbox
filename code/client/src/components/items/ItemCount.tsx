import cx from 'classnames';
import { isNil } from 'lodash';
import type { FC } from 'react';
import { BsBuildings, BsFlag, BsGeoAlt, BsJournalText, BsPerson } from 'react-icons/bs';

type ItemCountsProps = {
  data: Partial<{
    companiesCount: number;
    addressesCount: number;
    peopleCount: number;
    countriesCount: number;
    messagesCount: number;
  }>;
};
export const ItemCounts: FC<ItemCountsProps> = ({ data }) => {
  return (
    <ul className="list-inline my-1">
      <li className={cx('list-inline-item pe-1', isNil(data.companiesCount) && 'text-muted')}>
        {!isNil(data.companiesCount) ? data.companiesCount : '**'} <BsBuildings />
      </li>
      <li className={cx('list-inline-item pe-1', isNil(data.addressesCount) && 'text-muted')}>
        {!isNil(data.addressesCount) ? data.addressesCount : '**'} <BsGeoAlt />
      </li>
      <li className={cx('list-inline-item pe-1', isNil(data.peopleCount) && 'text-muted')}>
        {!isNil(data.peopleCount) ? data.peopleCount : '**'} <BsPerson />
      </li>
      <li className={cx('list-inline-item pe-1', isNil(data.countriesCount) && 'text-muted')}>
        {!isNil(data.countriesCount) ? data.countriesCount : '**'} <BsFlag />
      </li>
      <li className={cx('list-inline-item pe-1', isNil(data.messagesCount) && 'text-muted')}>
        {!isNil(data.messagesCount) ? data.messagesCount : '**'} {data.messagesCount}{' '}
        <BsJournalText />
      </li>
    </ul>
  );
};
