import { Tooltip } from '@ouestware/tooltip';
import { FC } from 'react';
import { RiMore2Line } from 'react-icons/ri';

import { ItemType } from '../../core/consts.tsx';
import { ItemEditionMenu } from './ItemEditionMenu.tsx';
import { QuickSwapTypeMenu } from './QuickSwapTypeMenu.tsx';

export const EditionActionsTooltip: FC<{ itemType: ItemType; id: string; label: string }> = ({
  itemType,
  id,
  label,
}) => {
  // No edition actions for messages
  if (itemType === 'message') return null;

  return (
    <Tooltip
      className="p-0 py-1"
      rootClassName="small d-inline-block"
      attachment={['top', 'right']}
      targetAttachment={['bottom', 'right']}
    >
      <button type="button" className="btn btn-sm btn-ico p-1 btn-outline-purple-300">
        <RiMore2Line />
      </button>
      <div className="border border-light-gray rounded bg-white color-purple-300 overflow-hidden p-2">
        Edition tools:
        <ItemEditionMenu type={itemType} id={id} label={label} />
        Item type:
        <QuickSwapTypeMenu type={itemType} id={id} />
      </div>
    </Tooltip>
  );
};
