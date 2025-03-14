import { useModal } from '@ouestware/modals';
import { Tooltip } from '@ouestware/tooltip';
import { useMemo, type FC, type HTMLAttributes } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';

import type { DataItemType } from '../../../core/graphql';
import { ChangeTypeModal } from './ChangeTypeModal';
import { DeleteModal } from './DeleteModal';
import { RenameModal } from './RenameModal';

type ItemActionProp = HTMLAttributes<HTMLElement> & {
  type: DataItemType;
  id: string;
  name: string;
};

export const ItemActionMenu: FC<ItemActionProp> = ({ type, id, name, ...htmlAttributs }) => {
  const { openModal } = useModal();
  const actions = useMemo(
    () => [
      {
        name: 'Rename',
        action: () =>
          openModal(
            <RenameModal
              type={type}
              id={id}
              name={name}
              onSuccess={() => console.log('success')}
            />,
          ),
      },
      {
        name: 'Change type',
        action: () =>
          openModal(
            <ChangeTypeModal
              type={type}
              id={id}
              name={name}
              onSuccess={() => console.log('success')}
            />,
          ),
      },
      {
        name: 'Delete',
        action: () =>
          openModal(
            <DeleteModal
              type={type}
              id={id}
              name={name}
              onSuccess={() => console.log('success')}
            />,
          ),
      },
    ],
    [type, id, name, openModal],
  );
  return (
    <Tooltip
      rootClassName={htmlAttributs.className}
      attachment={['bottom', 'center']}
      targetAttachment={['top', 'right']}
    >
      <button className="btn" title="Actions">
        <BsThreeDotsVertical />
      </button>
      <ul className="list-unstyled">
        {actions.map((a) => (
          <li key={a.name}>
            <button className="btn" onClick={a.action}>
              {a.name}
            </button>
          </li>
        ))}
      </ul>
    </Tooltip>
  );
};
