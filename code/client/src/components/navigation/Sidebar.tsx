import cx from 'classnames';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ITEM_TYPE_LABELS_PLURAL, ITEM_TYPES, ItemIcon, ItemType } from '../../core/consts.tsx';
import { EditionPanel } from '../edition/EditionPanel.tsx';

export const Sidebar: FC<{ activeItemType?: ItemType }> = ({ activeItemType }) => {
  return (
    <aside className="bg-transparent border-end d-flex flex-column">
      {/* Links to explore pages: */}
      <section className="border-bottom py-5 px-4 flex-shrink-0">
        <h3 className="text-muted fw-light text-dark">Explore by counting</h3>
        {ITEM_TYPES.map((itemType) => (
          <Link
            key={itemType}
            to={`/explore/${itemType}`}
            className={cx(
              'with-icon d-block link-dark link-underline-opacity-0 py-3 fs-3',
              itemType === activeItemType ? 'fw-medium' : 'fw-light',
            )}
          >
            <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}
          </Link>
        ))}
      </section>

      {/* Filler: */}
      <section className="flex-grow-1 flex-shrink-1" />

      {/* Edit controls: */}
      <section className="flex-shrink-0 p-4">
        <EditionPanel />
      </section>
    </aside>
  );
};
