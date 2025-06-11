import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { ItemType } from '../../../core/consts';
import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';
import type { AsyncStatus } from '../../../types';
import { getErrorData } from '../../../utils/error';

type RenameModalProps = {
  type: ItemType;
  id: string;
  label: string;
  onSuccess?: () => Promise<void> | void;
};
export const RenameModal: FC<RenameModalProps> = ({ type, id, label, onSuccess }) => {
  const { closeModal } = useModal();
  const { renameItem } = useItemActions();
  // async status of the form
  const [status, setStatus] = useState<AsyncStatus>({ type: 'idle' });
  const [newName, setNewName] = useState<string>(label);

  const submit = useCallback(
    async (newName: string) => {
      if (newName !== type) {
        setStatus({ type: 'loading' });
        try {
          await renameItem(type as DataItemType, id, newName);
          await onSuccess?.();
          closeModal();
          setStatus({ type: 'success' });
        } catch (error) {
          console.error('Error while renaming node:', error);
          setStatus({
            type: 'error',
            message: getErrorData(error).message || 'An error occurred',
          });
        }
      }
    },
    [type, id, closeModal, renameItem, onSuccess],
  );

  return (
    <Modal title={`Rename '${label}'`} withCloseButton={status.type !== 'loading'}>
      <form
        id="renameForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit(newName);
        }}
      >
        {/* Displaying error message if needed*/}
        {status.type === 'error' && (
          <p className="text-danger text-center my-3">{status.message}</p>
        )}

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        {/* Displaying the loader if needed*/}
        {status.type === 'loading' && <LoaderFill />}
      </form>
      <div className="col d-flex justify-content-between">
        <button
          className="btn btn-outline-danger"
          onClick={closeModal}
          disabled={status.type === 'loading'}
        >
          Cancel
        </button>
        <button className="btn btn-success" form="renameForm" disabled={status.type === 'loading'}>
          Submit
        </button>
      </div>
    </Modal>
  );
};
