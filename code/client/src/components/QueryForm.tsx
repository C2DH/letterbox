import { useFacetsContext } from '@ouestware/facets-client';
import { FC, useEffect, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

import { ITEM_TYPE_LABELS_PLURAL, ItemType } from '../core/consts.tsx';

export const QueryForm: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const [query, setQuery] = useState('');
  const {
    state: { query: stateQuery },
    setQuery: setStateQuery,
  } = useFacetsContext();

  useEffect(() => {
    setQuery(stateQuery || '');
  }, [stateQuery]);

  return (
    <form
      className="input-group"
      onSubmit={(e) => {
        e.preventDefault();
        setStateQuery(query || undefined);
      }}
    >
      <input
        type="text"
        className="form-control"
        placeholder={`Search for ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`}
        aria-label={`Search for ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`}
        value={query}
        onChange={(e) => setQuery(e.target.value || '')}
      />
      <button type="submit" className="input-group-text">
        <RiSearch2Line />
      </button>
    </form>
  );
};
