import { FC, useEffect } from 'react';

import { useIndexationManagement } from '../hooks/useIndexationManagement';

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
        <>
          {nbItemsWithPendingModifications}
          <button
            className="btn btn-primary"
            disabled={nbItemsWithPendingModifications === 0}
            onClick={indexPendingModifications}
          >
            index
          </button>
        </>
      )}
      {onGoingIndexation !== undefined && nbItemsWithPendingModifications !== undefined && (
        <>
          <label htmlFor="indexation-progress-bar">{nbItemsWithPendingModifications}</label>
          <progress
            id="indexation-progress-bar"
            max={
              onGoingIndexation.nbItems >= nbItemsWithPendingModifications
                ? onGoingIndexation.nbItems
                : undefined
            }
            value={
              onGoingIndexation.nbItems >= nbItemsWithPendingModifications
                ? onGoingIndexation.nbItems - nbItemsWithPendingModifications
                : undefined
            }
          ></progress>
        </>
      )}
    </div>
  );
};
