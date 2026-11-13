import { useFacetsContext } from '@ouestware/facets-client';
import { FC, Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';

import { ITEM_TYPE_LABELS_PLURAL, ItemType } from '../../core/consts';

export type QueryFormHandle = {
  // Focuses the field, and selects its content:
  focus: () => void;
};

/**
 * Full-text search field. Escape restores the applied query.
 */
export const QueryForm: FC<{ itemType: ItemType; ref?: Ref<QueryFormHandle> }> = ({ itemType, ref }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    state: { query: stateQuery },
    setQuery: setStateQuery,
  } = useFacetsContext();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setQuery(stateQuery || '');
  }, [stateQuery]);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
      inputRef.current?.select();
    },
  }));

  const label = `Search for ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`;

  return (
    <form
      className="query-form input-group"
      onSubmit={(e) => {
        e.preventDefault();
        setStateQuery(query.trim() || undefined);
      }}
    >
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder={`${label} (AND, OR, NOT, "exact phrase"...)`}
        aria-label={label}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') setQuery(stateQuery || '');
        }}
      />
      <button type="submit" className="input-group-text" title="Search" aria-label="Search">
        <RiSearch2Line />
      </button>
    </form>
  );
};
