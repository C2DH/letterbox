import { LoaderFill } from '@ouestware/loaders';
import { Modal, useModal } from '@ouestware/modals';
import { useCallback, useState, type FC } from 'react';

import { DataItemType } from '../../../core/graphql';
import { useItemActions } from '../../../hooks/useItemActions';
import type { AsyncStatus } from '../../../types';
import { getErrorData } from '../../../utils/error';

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
  const [newType, SetNewType] = useState<DataItemType>(type);
  // async status of the form
  const [status, setStatus] = useState<AsyncStatus>({ type: 'idle' });

  const submit = useCallback(
    async (newType: DataItemType) => {
      if (newType !== type) {
        setStatus({ type: 'loading' });
        try {
          await changeItemType(type, id, newType);
          await onSuccess?.();
          closeModal();
          setStatus({ type: 'success' });
        } catch (error) {
          console.error('Error while changing item type:', error);
          setStatus({
            type: 'error',
            message: getErrorData(error).message || 'An error occurred',
          });
        }
      }
    },
    [type, id, closeModal, changeItemType, onSuccess],
  );

  return (
    <Modal title={`Change type for '${label}'`} withCloseButton={status.type !== 'loading'}>
      <form
        id="changeTypeForm"
        onSubmit={(e) => {
          e.preventDefault();
          submit(newType);
        }}
      >
        {/* Displaying error message if needed*/}
        {status.type === 'error' && (
          <p className="text-danger text-center my-3">{status.message}</p>
        )}

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
        <button
          className="btn btn-success"
          form="changeTypeForm"
          disabled={status.type === 'loading'}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};
