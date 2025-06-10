import { stateToSearch } from '@ouestware/facets-client';
import { useModal } from '@ouestware/modals';
import { useNotifications } from '@ouestware/notifications';
import classNames, { default as cx } from 'classnames';
import { flatten, mapValues, toPairs } from 'lodash';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ITEM_TYPE_LABELS_PLURAL, ITEM_TYPES, ItemIcon, ItemType } from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { getCartSize } from '../../utils/edition.ts';
import { shortenNumber } from '../../utils/number.ts';
import { EditionIcons } from './EditionIcons.tsx';
import { InCartButton } from './InCartButton.tsx';
import { DeleteModal } from './modals/DeleteModal.tsx';
import { MergeModal } from './modals/MergeModal.tsx';
import { EditionActionsTooltip } from './tooltips.tsx';

export const EditionPanel: FC = () => {
  const { enabled, cart, toggle, removeFromCart } = useEditionContext();
  const { notify } = useNotifications();
  const cartSize = getCartSize(cart);
  const { openModal } = useModal();

  const params =
    cartSize > 0
      ? stateToSearch({
          query: undefined,
          filters: mapValues(cart, (selectedItems) =>
            selectedItems
              ? { type: 'keywords' as const, values: selectedItems.map((v) => v.id) }
              : undefined,
          ),
        })
      : undefined;
  const searchMentionsURL = `/explore/message?${params?.toString()}`;

  return (
    <section
      className={classNames(
        'd-flex flex-column h-100',
        enabled ? 'justify-content-between' : 'justify-content-end',
      )}
    >
      <div className="px-4 d-flex flex-row align-items-end mb-2 flex-shrink-0">
        <h3 className="fw-medium flex-grow-1 m-0 text-primary">
          Edition mode{' '}
          <span className="badge rounded-pill text-bg-primary fw-bold px-2 ms-2">
            {shortenNumber(cartSize)} <EditionIcons.toggleCartIn className="align-bottom" />
          </span>
        </h3>
        <div className="form-check form-switch m-0 p-0">
          <input
            className={cx('form-check-input m-0 mt-1', enabled ? 'bg-purple-300' : 'bg-white')}
            type="checkbox"
            role="switch"
            checked={enabled}
            onChange={(e) => toggle(e.target.checked)}
          />
        </div>
      </div>

      {/* Cart */}
      {enabled &&
        (cartSize ? (
          <section className="px-4 overflow-y-auto flex-shrink-0 flex-grow-1">
            {ITEM_TYPES.filter((type) => cart[type]?.length).map((type, i) => (
              <section key={type} className={cx('py-3', !!i && 'border-top')}>
                <h4 className="with-icon">
                  <ItemIcon type={type} /> {ITEM_TYPE_LABELS_PLURAL[type]}
                </h4>
                {cart[type]?.map(({ label, id }) => (
                  <div className="d-flex flex-row align-items-center py-1 gap-1" key={id}>
                    <Link to={`/${type}/${id}`} className="flex-grow-1">
                      {label}
                    </Link>
                    <InCartButton type={type} id={id} label={label} fromCart />
                    <EditionActionsTooltip itemType={type} id={id} label={label} />
                  </div>
                ))}
              </section>
            ))}
          </section>
        ) : (
          <section className="mx-4 border-primary border-1 border-dashed text-primary rounded px-4 py-3">
            <p className="m-0">
              <EditionIcons.toggleCartIn />
            </p>
            <p className="m-0">No items bookmarked...</p>
            <p className="m-0">Bookmark items here to edit them later!</p>
          </section>
        ))}

      {/* Actions */}
      {enabled && (
        <section className="px-4 flex-shrink-0">
          <button
            type="button"
            className="btn mt-2 with-icon py-1 btn-purple-300"
            disabled={cartSize === 0}
            onClick={() => {
              openModal(<MergeModal itemsByType={cart} />);
            }}
          >
            <EditionIcons.merge /> Merge Selection
          </button>

          <button
            type="button"
            className="btn mt-2 with-icon py-1 btn-purple-300"
            disabled={cartSize === 0}
            onClick={() =>
              openModal(
                <DeleteModal
                  items={flatten(
                    toPairs(cart).map(([type, items]) =>
                      items.map((i) => ({ type: type as ItemType, ...i })),
                    ),
                  )}
                  onSuccess={() => {
                    notify({
                      type: 'success',
                      text: `${cartSize} items have been deleted.`,
                    });
                    toPairs(cart).forEach(([type, items]) =>
                      items.forEach((item) => removeFromCart({ type: type as ItemType, ...item })),
                    );
                  }}
                />,
              )
            }
          >
            <EditionIcons.delete /> Delete Selection
          </button>
          <Link to={searchMentionsURL} className="mt-2 d-block w-100 btn-purple-300 text-start">
            Explore messages for this selection
          </Link>
        </section>
      )}
    </section>
  );
};
