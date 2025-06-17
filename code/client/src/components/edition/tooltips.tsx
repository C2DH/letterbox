import { Tooltip } from '@ouestware/tooltip';
import { FC } from 'react';
import { RiMore2Line } from 'react-icons/ri';

import { DEFAULT_TOOLTIP_CLASSNAME, ItemType } from '../../core/consts.tsx';
import { ItemEditionMenu } from './ItemEditionMenu.tsx';
import { QuickSwapTypeMenu } from './QuickSwapTypeMenu.tsx';

export const EditionActionsTooltip: FC<{
  itemType: ItemType;
  id: string;
  label: string;
  fromMessageId?: string;
}> = ({ itemType, id, label, fromMessageId }) => {
  // No edition actions for messages
  if (itemType === 'message') return null;

  return (
    <Tooltip
      className={DEFAULT_TOOLTIP_CLASSNAME}
      rootClassName="small d-inline-block"
      attachment={['top', 'right']}
      targetAttachment={['bottom', 'right']}
    >
      <button
        type="button"
        className="btn btn-sm btn-ico p-1 btn-outline-purple-300"
        title={'Edition tools'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <RiMore2Line />
      </button>
      <div
        className="border border-light-gray rounded bg-white color-purple-300 overflow-hidden p-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        Edition tools:
        <ItemEditionMenu type={itemType} id={id} label={label} messageId={fromMessageId} />
        Item type:
        <QuickSwapTypeMenu type={itemType} id={id} />
      </div>
    </Tooltip>
  );
};
