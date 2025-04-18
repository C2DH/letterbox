import { Tooltip } from '@ouestware/tooltip';
import cx from 'classnames';
import { FC } from 'react';
import { RiArrowDownSLine, RiMore2Line } from 'react-icons/ri';

import { FILTERABLE_ITEM_TYPES, ItemIcon, ItemType } from '../../core/consts.tsx';
import { ItemEditionMenu } from './ItemEditionMenu.tsx';

export const EditionActionsTooltip: FC<{ itemType: ItemType; id: string; label: string }> = ({
  itemType,
  id,
  label,
}) => (
  <Tooltip
    className="p-0 py-1"
    rootClassName="small d-inline-block"
    attachment={['top', 'right']}
    targetAttachment={['bottom', 'right']}
  >
    <button type="button" className="btn btn-sm btn-ico p-1 btn-outline-purple-300">
      <RiMore2Line />
    </button>
    <div className="border border-purple-300 rounded bg-white color-purple-300 overflow-hidden">
      <ItemEditionMenu type={itemType} id={id} label={label} />
    </div>
  </Tooltip>
);

export const QuickSwapTypeTooltip: FC<{ itemType: ItemType; id: string }> = ({ itemType }) => (
  <Tooltip
    className="p-0 py-1"
    rootClassName="small d-inline-block"
    attachment={['top', 'left']}
    targetAttachment={['bottom', 'left']}
  >
    <button type="button" className="btn btn-sm btn-ico me-2 p-1 btn-outline-purple-300">
      <ItemIcon type={itemType} /> <RiArrowDownSLine />
    </button>
    <div className="border border-purple-300 rounded bg-white color-purple-300 overflow-hidden">
      <div className="d-flex flex-row align-items-stretch">
        {FILTERABLE_ITEM_TYPES.map((type) => (
          <button
            key={type}
            className={cx(
              'btn btn-ico p-2 rounded-0',
              type === itemType ? 'btn-purple-300' : 'btn-outline-purple-300 border-0',
            )}
          >
            <ItemIcon type={type} />
          </button>
        ))}
      </div>
    </div>
  </Tooltip>
);
