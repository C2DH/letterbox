import { Spinner } from '@ouestware/loaders';
import { FC, useEffect } from 'react';

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
    <div>
      {onGoingIndexation === undefined && (
        <div className="d-flex justify-content-between gap-1">
          <button
            className="btn btn-purple-300"
            disabled={nbItemsWithPendingModifications === 0}
            onClick={indexPendingModifications}
          >
            Update Explorer
          </button>
          <div className="text-center">
            Items impacted:
            <br />
            {nbItemsWithPendingModifications
              ? numberFormat.format(nbItemsWithPendingModifications)
              : 0}
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
