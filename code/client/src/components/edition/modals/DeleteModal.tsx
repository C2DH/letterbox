import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';
import { Link } from 'react-router-dom';

import { ItemIcon, ItemType } from '../../../core/consts';
import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';

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
  const [loading, setLoading] = useState(false);

  const submit = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all(items.map((item) => deleteItem(item.type as DataItemType, item.id)));
    } finally {
      setLoading(false);
    }
    await onSuccess?.();
    closeModal();
  }, [items, closeModal, deleteItem, onSuccess]);
  console.log(items);

  return (
    <Modal
      title={`Delete '${items.length > 1 ? `${items.length} items` : items[0].label}' ?`}
      withCloseButton={!loading}
    >
      <form
        id="deleteForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
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
