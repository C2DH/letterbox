import cx from 'classnames';
import { noop } from 'lodash';
import { FC } from 'react';
import {
  RiInbox2Line,
  RiMergeCellsVertical,
  RiScissorsCutLine,
  RiSearch2Line,
} from 'react-icons/ri';

import { ITEM_TYPE_LABELS_PLURAL, ITEM_TYPES, ItemIcon } from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { getCartSize } from '../../utils/edition.ts';
import { shortenNumber } from '../../utils/number.ts';

const ACTIONS = [
  {
    label: (
      <>
        <RiSearch2Line /> Search Mentions
      </>
    ),
    action: noop,
  },
  {
    label: (
      <>
        <RiMergeCellsVertical /> Merge Items
      </>
    ),
    action: noop,
  },
  {
    label: (
      <>
        <RiScissorsCutLine /> Split Items
      </>
    ),
    action: noop,
  },
];

export const EditionPanel: FC = () => {
  const { enabled, cart, toggle } = useEditionContext();
  const cartSize = getCartSize(cart);

  return (
    <>
      <div className="d-flex flex-row align-items-end mb-2">
        <h3 className="fw-medium flex-grow-1 m-0 text-primary">
          Edition cart{' '}
          <span className="badge rounded-pill text-bg-primary fw-bold px-2 ms-2">
            {shortenNumber(cartSize)}
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
          <section>
            {ITEM_TYPES.map((type) =>
              !cart[type]?.length ? null : (
                <section key={type} className="border-bottom">
                  <h4 className="with-icon">
                    <ItemIcon type={type} /> {ITEM_TYPE_LABELS_PLURAL[type]}
                  </h4>
                  {cart[type].map(({ label, id }) => (
                    <div key={id}>{label}</div>
                  ))}
                </section>
              ),
            )}
          </section>
        ) : (
          <section className="border-primary border-1 border-dashed text-primary rounded px-4 py-3">
            <p className="m-0">
              <RiInbox2Line />
            </p>
            <p className="m-0">Cart empty...</p>
            <p className="m-0">Select an item to edit it!</p>
          </section>
        ))}

      {/* Actions */}
      {enabled && (
        <section>
          {ACTIONS.map(({ label }, i) => (
            <button
              key={i}
              type="button"
              className="btn d-block w-100 btn-link p-0 text-decoration-none text-purple-300 text-start mt-2"
            >
              {label}
            </button>
          ))}
        </section>
      )}
    </>
  );
};
