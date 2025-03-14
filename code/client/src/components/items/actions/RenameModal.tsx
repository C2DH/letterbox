import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';

type RenameModalProps = {
  type: DataItemType;
  id: string;
  name: string;
  onSuccess?: () => Promise<void> | void;
};
export const RenameModal: FC<RenameModalProps> = ({ type, id, name, onSuccess }) => {
  const { closeModal } = useModal();
  const { renameItem } = useItemActions();
  const [loading, setLoading] = useState(false);
  const [newName, setNewName] = useState<string>(name);

  const submit = useCallback(
    async (newName: string) => {
      if (newName !== type) {
        setLoading(true);
        try {
          await renameItem(type, id, newName);
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
    <Modal title={`Rename '${name}'`} withCloseButton={!loading}>
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
