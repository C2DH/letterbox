import { Spinner } from '@ouestware/loaders';
import { FC, useEffect } from 'react';
import { RiLoopRightFill } from 'react-icons/ri';

import { useIndexationManagement } from '../../hooks/useIndexationManagement';

const numberFormat = new Intl.NumberFormat('en-EN');

export const IndexationManagement: FC = () => {
  const { nbItemsWithPendingModifications, indexPendingModifications, onGoingIndexation, refetch } =
    useIndexationManagement();

  useEffect(() => {
    const polling = setInterval(refetch, 1500);
    return () => {
      if (polling) clearInterval(polling);
    };
  }, [refetch]);

  return (
    <div className="indexation-management">
      {onGoingIndexation === undefined && (
        <div className="d-flex flex-column justify-content-between gap-1">
          <div className="text-start">
            {nbItemsWithPendingModifications
              ? numberFormat.format(nbItemsWithPendingModifications)
              : 0}{' '}
            Items impacted
          </div>
          <div>
            <button
              className="btn btn-purple-300 "
              disabled={nbItemsWithPendingModifications === 0}
              onClick={indexPendingModifications}
            >
              <RiLoopRightFill className="pe-1" />
              Update Explorer
            </button>
          </div>
        </div>
      )}
      {onGoingIndexation !== undefined && nbItemsWithPendingModifications !== undefined && (
        <>
          {nbItemsWithPendingModifications <= onGoingIndexation.nbItems ? (
            <div className="d-flex flex-column">
              <label
                htmlFor="indexation-progress-bar"
                className="d-flex justify-content-between mb-1"
              >
                <span>
                  <Spinner style={{ height: '14px', width: '14px' }} className="text-secondary" />{' '}
                  Updating
                </span>{' '}
                <span>
                  {numberFormat.format(nbItemsWithPendingModifications)} /{' '}
                  {numberFormat.format(onGoingIndexation.nbItems)}
                </span>
              </label>
              <progress
                id="indexation-progress-bar"
                max={onGoingIndexation.nbItems}
                value={onGoingIndexation.nbItems - nbItemsWithPendingModifications}
              ></progress>
            </div>
          ) : (
            <div>
              <Spinner style={{ height: '14px', width: '14px' }} className="text-secondary" />{' '}
              Confirming Updates
            </div>
          )}
        </>
      )}
    </div>
  );
};
