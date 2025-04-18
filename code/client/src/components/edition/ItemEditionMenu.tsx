import { noop } from 'lodash';
import { FC, ReactNode, useMemo } from 'react';
import {
  RiDeleteBin5Line,
  RiInbox2Line,
  RiIndeterminateCircleLine,
  RiInputField,
  RiScissorsCutLine,
} from 'react-icons/ri';

import { ItemType } from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { isInCart } from '../../utils/edition.ts';

export const ItemEditionMenu: FC<{
  type: ItemType;
  id: string;
  label: string;
}> = (item) => {
  const { cart, addToCart, removeFromCart } = useEditionContext();
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
        markup: <RiInputField />,
        action: noop,
      },
      {
        type: 'action',
        markup: <RiScissorsCutLine />,
        action: noop,
      },
      {
        type: 'action',
        markup: <RiDeleteBin5Line />,
        action: noop,
      },
      {
        type: 'separator',
      },
      {
        type: 'action',
        markup: inCart ? <RiIndeterminateCircleLine /> : <RiInbox2Line />,
        action: () => (inCart ? removeFromCart(item) : addToCart(item)),
      },
    ],
    [addToCart, inCart, item, removeFromCart],
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
