import { noop } from 'lodash';
import { FC, ReactNode } from 'react';
import { RiDeleteBin5Line, RiInbox2Line, RiInputField, RiScissorsCutLine } from 'react-icons/ri';

import { ItemType } from '../../core/consts.tsx';

const MENU: (
  | { type: 'separator' }
  | {
      type: 'action';
      markup: ReactNode;
      action: (item: { itemType: ItemType; id: string }) => void;
    }
)[] = [
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
    markup: <RiInbox2Line />,
    action: noop,
  },
];

export const ItemEditionMenu: FC<{
  itemType: ItemType;
  id: string;
}> = ({ itemType, id }) => {
  return (
    <div className="d-flex flex-row align-items-stretch">
      {MENU.map((item, i) =>
        item.type === 'separator' ? (
          <div key={i} className="separator mx-1 my-2 border-end border-1 border-purple-300" />
        ) : (
          <button
            key={i}
            className="btn btn-outline-purple-300 btn-ico p-2 border-0 rounded-0"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              item.action({ itemType, id });
            }}
          >
            {item.markup}
          </button>
        ),
      )}
    </div>
  );
};
