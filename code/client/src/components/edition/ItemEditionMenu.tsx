import { useModal } from '@ouestware/modals';
import { useNotifications } from '@ouestware/notifications';
import { noop } from 'lodash';
import { FC, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ItemType } from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { isInCart } from '../../utils/edition.ts';
import { DeleteModal } from '../items/actions/DeleteModal.tsx';
import { EditionIcons } from './EditionIcons.tsx';

export const ItemEditionMenu: FC<{
  type: ItemType;
  id: string;
  label: string;
}> = (item) => {
  const { cart, addToCart, removeFromCart } = useEditionContext();
  const { notify } = useNotifications();
  const { openModal } = useModal();
  const navigate = useNavigate();
  const inCart = useMemo(() => isInCart(cart, item), [cart, item]);
  const menu = useMemo<
    (
      | { type: 'separator' }
      | {
          type: 'action';
          markup: ReactNode;
          action: () => void;
        }
    )[]
  >(
    () => [
      {
        type: 'action',
        markup: EditionIcons.rename,
        action: noop,
      },
      {
        type: 'action',
        markup: EditionIcons.split,
        action: noop,
      },
      {
        type: 'action',
        markup: EditionIcons.delete,
        action: () => {
          openModal(
            <DeleteModal
              items={[item]}
              onSuccess={() => {
                // TODO: refacto reload with cleverer refetch: add a refetch method in edition context?
                // reload the page but after 1s to let notification appear...
                setTimeout(() => navigate(0), 1000);
                notify({
                  type: 'success',
                  text: `The ${item.type} "${item.label}" has been deleted. Reloading the page...`,
                });
              }}
            />,
          );
        },
      },
      {
        type: 'separator',
      },
      {
        type: 'action',
        markup: inCart ? EditionIcons.removeFromCart : EditionIcons.addToCart,
        action: () => (inCart ? removeFromCart(item) : addToCart(item)),
      },
    ],
    [addToCart, inCart, item, removeFromCart, notify, openModal, navigate],
  );

  return (
    <div className="d-flex flex-row align-items-stretch">
      {menu.map((menuItem, i) =>
        menuItem.type === 'separator' ? (
          <div key={i} className="separator mx-1 my-2 border-end border-1 border-purple-300" />
        ) : (
          <button
            key={i}
            className="btn btn-outline-purple-300 btn-ico p-2 border-0 rounded-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              menuItem.action();
            }}
          >
            {menuItem.markup}
          </button>
        ),
      )}
    </div>
  );
};
