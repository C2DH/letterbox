import cx from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ITEM_TYPE_LABELS_PLURAL, ITEM_TYPES, ItemIcon, ItemType } from '../../core/consts.tsx';

export const Sidebar: FC<{ activeItemType?: ItemType }> = ({ activeItemType }) => {
  return (
    <aside className="py-5 bg-transparent border-end">
      <h3 className="text-muted fw-light px-4 text-dark">Explore by counting</h3>
      {ITEM_TYPES.map((itemType) => (
        <Link
          key={itemType}
          to={`/explore/${itemType}`}
          className={cx(
            'with-icon d-block link-dark link-underline-opacity-0 px-4 py-3 fs-3',
            itemType === activeItemType ? 'fw-medium' : 'fw-light',
          )}
        >
          <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}
        </Link>
      ))}
    </aside>
  );
};
