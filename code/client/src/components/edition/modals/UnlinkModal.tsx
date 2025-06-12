import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { ItemType } from '../../../core/consts';
import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';
import type { AsyncStatus } from '../../../types';
import { getErrorData } from '../../../utils/error';

type UnlinkModalProps = {
  item: {
    label: string;
    type: ItemType;
    id: string;
  };
  messageId: string;
  onSuccess?: () => Promise<void> | void;
};
export const UnlinkModal: FC<UnlinkModalProps> = ({ item, messageId, onSuccess }) => {
  const { closeModal } = useModal();
  const { unlinkItem } = useItemActions();
  // async status of the form
  const [status, setStatus] = useState<AsyncStatus>({ type: 'idle' });

  const submit = useCallback(async () => {
    setStatus({ type: 'loading' });
    try {
      await unlinkItem(item.type as DataItemType, item.id, messageId);
      await onSuccess?.();
      closeModal();
      setStatus({ type: 'success' });
    } catch (error) {
      console.error('Error while unlink item:', error);
      setStatus({ type: 'error', message: getErrorData(error).message || 'An error occurred' });
    }
  }, [item, messageId, closeModal, unlinkItem, onSuccess]);

  return (
    <Modal title={`Unlink '${item.label}'`} withCloseButton={status.type !== 'loading'}>
      <form
        id="unlinkForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {/* Displaying error message if needed*/}
        {status.type === 'error' && (
          <p className="text-danger text-center my-3">{status.message}</p>
        )}

        <p>
          Are you sure you want to unlink the {item.type} with name &apos;{item.label} from the
          message &apos;?
        </p>

        {/* Displaying the loader if needed*/}
        {status.type === 'loading' && <LoaderFill />}
      </form>

      <div className="col d-flex justify-content-between">
        <button
          className="btn btn-danger"
          onClick={closeModal}
          disabled={status.type === 'loading'}
        >
          No
        </button>
        <button className="btn btn-success" form="unlinkForm" disabled={status.type === 'loading'}>
          Yes
        </button>
      </div>
    </Modal>
  );
};
