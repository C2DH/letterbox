import { FC, useMemo } from 'react';

import { ItemType } from '../../core/consts';
import { useEditionContext } from '../../core/edition';
import { isInCart } from '../../utils/edition';
import { EditionIcons } from './EditionIcons';

export const InCartButton: FC<{ type: ItemType; id: string; label: string; fromCart?: boolean }> = (
  item,
) => {
  const { cart, addToCart, removeFromCart } = useEditionContext();

  const inCart = useMemo(() => isInCart(cart, item), [cart, item]);

  return (
    <button
      className="btn btn-sm btn-outline-purple-300 btn-ico p-1"
      title={inCart ? 'Remove from cart' : 'Add to cart'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (inCart) removeFromCart(item);
        else addToCart(item);
      }}
    >
      {!item.fromCart && (inCart ? <EditionIcons.toggleCartOut /> : <EditionIcons.toggleCartIn />)}
      {item.fromCart && <EditionIcons.removeFromCart />}
    </button>
  );
};
