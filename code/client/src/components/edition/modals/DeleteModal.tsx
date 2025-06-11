import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';
import { Link } from 'react-router-dom';

import { ItemIcon, ItemType } from '../../../core/consts';
import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';
import type { AsyncStatus } from '../../../types';
import { getErrorData } from '../../../utils/error';

type DeleteModalProps = {
  items: {
    label: string;
    type: ItemType;
    id: string;
  }[];
  onSuccess?: () => Promise<void> | void;
};
export const DeleteModal: FC<DeleteModalProps> = ({ items, onSuccess }) => {
  const { closeModal } = useModal();
  const { deleteItem } = useItemActions();
  // async status of the form
  const [status, setStatus] = useState<AsyncStatus>({ type: 'idle' });

  const submit = useCallback(async () => {
    setStatus({ type: 'loading' });
    try {
      await Promise.all(items.map((item) => deleteItem(item.type as DataItemType, item.id)));
      await onSuccess?.();
      closeModal();
      setStatus({ type: 'success' });
    } catch (error) {
      console.error('Error while deleting item:', error);
      setStatus({ type: 'error', message: getErrorData(error).message || 'An error occurred' });
    }
  }, [items, closeModal, deleteItem, onSuccess]);

  return (
    <Modal
      title={`Delete '${items.length > 1 ? `${items.length} items` : items[0].label}' ?`}
      withCloseButton={status.type !== 'loading'}
    >
      <form
        id="deleteForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        {/* Displaying error message if needed*/}
        {status.type === 'error' && (
          <p className="text-danger text-center my-3">{status.message}</p>
        )}

        {items.length === 1 ? (
          <p>
            Are you sure you want to delete the {items[0].type} with name &apos;{items[0].label}
            &apos;?
          </p>
        ) : (
          <p>
            Are you sure you want to delete those {items.length} items?
            <div className="d-flex flex-column">
              {items.map((i) => (
                <Link to={`/${i.type}/${i.id}`} key={i.id} className="with-icon">
                  <ItemIcon type={i.type} /> {i.label}
                </Link>
              ))}
            </div>
          </p>
        )}

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
        <button className="btn btn-success" form="deleteForm" disabled={status.type === 'loading'}>
          Yes
        </button>
      </div>
    </Modal>
  );
};
