import { FC, useMemo } from 'react';

import { ItemType } from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { isInCart } from '../../utils/edition.ts';
import { EditionIcons } from './EditionIcons.tsx';

export const InCartButton: FC<{ type: ItemType; id: string; label: string }> = (item) => {
  const { cart, addToCart, removeFromCart } = useEditionContext();

  const inCart = useMemo(() => isInCart(cart, item), [cart, item]);

  return (
    <button
      className="btn btn-outline-purple-300 btn-ico p-1"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inCart) removeFromCart(item);
        else addToCart(item);
      }}
    >
      {inCart ? EditionIcons.removeFromCart : EditionIcons.addToCart}
    </button>
  );
};
