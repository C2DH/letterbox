import { useModal } from '@ouestware/modals';
import { useNotifications } from '@ouestware/notifications';
import { FC, ReactNode, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ItemType } from '../../core/consts.tsx';
import { EditionIcons } from './EditionIcons.tsx';
import { DeleteModal } from './modals/DeleteModal.tsx';
import { RenameModal } from './modals/RenameModal.tsx';
import { SplitModal } from './modals/SplitModal.tsx';

export const ItemEditionMenu: FC<{
  type: ItemType;
  id: string;
  label: string;
}> = (item) => {
  const { notify } = useNotifications();
  const { openModal } = useModal();
  const navigate = useNavigate();

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
        markup: <EditionIcons.rename />,
        action: () => {
          openModal(
            <RenameModal
              type={item.type}
              id={item.id}
              label={item.label}
              onSuccess={() => {
                setTimeout(() => navigate(0), 1000);
                notify({
                  type: 'success',
                  text: `The ${item.type} "${item.label}" has been renamed. Reloading the page...`,
                });
              }}
            />,
          );
        },
      },
      {
        type: 'action',
        markup: <EditionIcons.split />,
        action: () => {
          openModal(<SplitModal item={item} />, '640px');
        },
      },
      {
        type: 'action',
        markup: <EditionIcons.delete />,
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
    ],
    [item, notify, openModal, navigate],
  );

  return (
    <div className="d-flex flex-row align-items-stretch gap-2">
      {menu.map((menuItem, i) =>
        menuItem.type === 'separator' ? (
          <div key={i} className="separator mx-1 my-2 border-end border-1 border-purple-300" />
        ) : (
          <button
            key={i}
            className="btn btn-outline-purple-300 btn-ico p-2"
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
