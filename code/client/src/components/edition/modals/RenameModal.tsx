import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { ItemType } from '../../../core/consts';
import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';

type RenameModalProps = {
  type: ItemType;
  id: string;
  label: string;
  onSuccess?: () => Promise<void> | void;
};
export const RenameModal: FC<RenameModalProps> = ({ type, id, label, onSuccess }) => {
  const { closeModal } = useModal();
  const { renameItem } = useItemActions();
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState<string>(label);

  const submit = useCallback(
    async (newName: string) => {
      if (newName !== type) {
        setLoading(true);
        try {
          await renameItem(type as DataItemType, id, newName);
        } finally {
          setLoading(false);
        }
      }
      await onSuccess?.();
      closeModal();
    },
    [type, id, closeModal, renameItem, onSuccess],
  );

  return (
    <Modal title={`Rename '${label}'`} withCloseButton={!loading}>
      <form
        id="renameForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit(newName);
        }}
      >
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
        {loading && <LoaderFill />}
      </form>
      <div className="col d-flex justify-content-between">
        <button className="btn btn-outline-danger" onClick={closeModal} disabled={loading}>
          Cancel
        </button>
        <button className="btn btn-success" form="renameForm" disabled={loading}>
          Submit
        </button>
      </div>
    </Modal>
  );
};
