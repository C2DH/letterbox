import { Spinner } from '@ouestware/loaders';
import { useNotifications } from '@ouestware/notifications';
import cx from 'classnames';
import { FC, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FILTERABLE_ITEM_TYPES, ItemIcon, ItemType } from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { DataItemType } from '../../core/graphql/index.ts';
import { useItemActions } from '../../hooks/useItemActions.tsx';
import { isInCart } from '../../utils/edition.ts';
import { getErrorData } from '../../utils/error.ts';

export const QuickSwapTypeMenu: FC<{ type: ItemType; id: string }> = ({ type: itemType, id }) => {
  const [loading, setLoading] = useState<ItemType | undefined>(undefined);
  const { notify } = useNotifications();
  const navigate = useNavigate();
  const { changeItemType } = useItemActions();

  const { cart, addToCart, removeFromCart } = useEditionContext();

  const inCart = useMemo(() => isInCart(cart, { type: itemType, id }), [cart, itemType, id]);

  return (
    <div className="border border-purple-300 rounded bg-white color-purple-300 overflow-hidden w-fit-content">
      <div className="d-flex flex-row align-items-stretch">
        {FILTERABLE_ITEM_TYPES.map((type, i) => (
          <button
            key={type}
            title={`Change item type to "${type}"`}
            className={cx(
              'btn btn-ico p-2 rounded-0',
              type === itemType
                ? 'btn-purple-300'
                : i !== 0
                  ? 'border-1 border-top-0 border-end-0 border-bottom-0 btn-outline-purple-300'
                  : 'btn-outline-purple-300 border-0',
            )}
            onClick={async () => {
              setLoading(type);
              try {
                await changeItemType(itemType as DataItemType, id, type as DataItemType);
                if (inCart) {
                  const existing = cart[itemType]?.find((i) => i.id === id);
                  const label = existing ? existing.label : undefined;
                  removeFromCart({ type: itemType, id });

                  if (label) addToCart({ type, id, label });
                }
                // TODO: refacto reload with cleverer refetch: add a refetch method in edition context?
                // reload the page but after 1s to let notification appear...
                setTimeout(() => navigate(0), 1500);
                notify({ type: 'success', text: `Item type changed to "${type}"` });
              } catch (e) {
                notify({ type: 'error', text: `Error changing item type: ${getErrorData(e)}` });
              } finally {
                setLoading(undefined);
              }
            }}
          >
            {loading === type ? (
              <Spinner style={{ width: '14px', height: '14px' }} />
            ) : (
              <ItemIcon type={type} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
