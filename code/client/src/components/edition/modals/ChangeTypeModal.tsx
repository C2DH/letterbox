import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';

const TYPE_OPTIONS = [
  DataItemType.Address,
  DataItemType.Company,
  DataItemType.Country,
  DataItemType.Person,
];

type ChangeTypeModalProps = {
  type: DataItemType;
  id: string;
  label: string;
  onSuccess?: () => Promise<void> | void;
};

// This modal is not used anymore for now as types are changed directly without modal.
export const ChangeTypeModal: FC<ChangeTypeModalProps> = ({ type, id, label, onSuccess }) => {
  const { closeModal } = useModal();
  const { changeItemType } = useItemActions();
  const [loading, setLoading] = useState(false);
  const [newType, SetNewType] = useState<DataItemType>(type);

  const submit = useCallback(
    async (newType: DataItemType) => {
      if (newType !== type) {
        setLoading(true);
        try {
          await changeItemType(type, id, newType);
        } finally {
          setLoading(false);
        }
      }
      await onSuccess?.();
      closeModal();
    },
    [type, id, closeModal, changeItemType, onSuccess],
  );

  return (
    <Modal title={`Change type for '${label}'`} withCloseButton={!loading}>
      <form
        id="changeTypeForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit(newType);
        }}
      >
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            New type
          </label>
          <select
            id="type"
            className="form-select form-select-lg mb-3"
            onChange={(e) => SetNewType(e.target.value as DataItemType)}
          >
            {TYPE_OPTIONS.map((option) => (
              <option key={option} value={option} selected={option === newType}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {loading && <LoaderFill />}
      </form>
      <div className="col d-flex justify-content-between">
        <button className="btn btn-outline-danger" onClick={closeModal} disabled={loading}>
          Cancel
        </button>
        <button className="btn btn-success" form="changeTypeForm" disabled={loading}>
          Submit
        </button>
      </div>
    </Modal>
  );
};
