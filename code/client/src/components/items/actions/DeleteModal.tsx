import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';

type DeleteModalProps = {
  type: DataItemType;
  id: string;
  name: string;
  onSuccess?: () => Promise<void> | void;
};
export const DeleteModal: FC<DeleteModalProps> = ({ type, id, name, onSuccess }) => {
  const { closeModal } = useModal();
  const { deleteItem } = useItemActions();
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      await deleteItem(type, id);
    } finally {
      setLoading(false);
    }
    await onSuccess?.();
    closeModal();
  }, [type, id, closeModal, deleteItem, onSuccess]);

  return (
    <Modal title={`Delete '${name}' ?`} withCloseButton={!loading}>
      <form
        id="deleteForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <p>
          Are you sure you want to delete the {type} with name &apos;{name}&apos; ?
        </p>
        {loading && <LoaderFill />}
      </form>
      <div className="col d-flex justify-content-between">
        <button className="btn btn-danger" onClick={closeModal} disabled={loading}>
          No
        </button>
        <button className="btn btn-success" form="deleteForm" disabled={loading}>
          Yes
        </button>
      </div>
    </Modal>
  );
};
