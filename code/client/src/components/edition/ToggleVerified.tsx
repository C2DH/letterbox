import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import { FC, useState } from 'react';

import { ITEM_TYPE_TO_DATA_TYPE, ItemType } from '../../core/consts';
import { NodeItem } from '../../core/graphql';
import { setVerifiedMutation } from '../../core/graphql/queries/actions';

export const ToggleVerified: FC<{
  item: Pick<NodeItem, 'id' | 'verified'> & { type: ItemType };
}> = ({ item }) => {
  const [_updateVerified] = useMutation(setVerifiedMutation);
  const [verified, setVerified] = useState<boolean>(item.verified || false);
  const inputId = `verifiedCheck${item.type}${item.id}`;

  return (
    <div className="form-check form-switch ">
      <input
        className={classNames('form-check-input', verified ? 'bg-purple-300' : 'bg-white')}
        type="checkbox"
        role="switch"
        id={inputId}
        checked={verified}
        onChange={(e) => {
          setVerified(e.target.checked);
          _updateVerified({
            variables: {
              type: ITEM_TYPE_TO_DATA_TYPE[item.type],
              id: item.id,
              verified: e.target.checked,
            },
          });
        }}
      />
      <label className="form-check-label" htmlFor={inputId}>
        Verified
      </label>
    </div>
  );
};
