import { KeywordsFilter } from '@ouestware/facets';
import {
  AutocompleteData,
  InputKeywordsProps,
  KeywordsFacet,
  useFacetsContext,
  useInputKeywords,
} from '@ouestware/facets-client';
import { FC, useMemo } from 'react';
import { RiPriceTagLine } from 'react-icons/ri';
import AsyncSelect from 'react-select/async';

import { ItemValue, REACT_SELECT_BASE_PROPS, TAGS_FACET } from '../core/consts.tsx';

export const TagsFacet: FC = () => {
  const { state, autocomplete, setFilter } = useFacetsContext();
  const fnAutocomplete = useMemo(() => {
    return autocomplete
      ? (inputValue: string) =>
          autocomplete(TAGS_FACET as KeywordsFacet, state, inputValue) as Promise<
            AutocompleteData<ItemValue>
          >
      : undefined;
  }, [autocomplete, state]);
  const inputKeywordsProps = useMemo<InputKeywordsProps<ItemValue>>(
    () => ({
      isMulti: true,
      values: (state.filters?.tags as KeywordsFilter | undefined)?.values,
      onChange: (values) =>
        setFilter(TAGS_FACET.id, {
          type: 'keywords',
          values: values || [],
        }),
      autocomplete: fnAutocomplete,
      valueToOption: ({ value, label }) => ({
        label: label || value,
        value,
      }),
    }),
    [fnAutocomplete, setFilter, state.filters?.tags],
  );
  const { selectProps } = useInputKeywords<ItemValue>(inputKeywordsProps);

  return (
    <>
      <h2 className="with-icon fw-semibold">
        <RiPriceTagLine /> Tags
      </h2>
      <AsyncSelect
        {...selectProps}
        {...REACT_SELECT_BASE_PROPS}
        placeholder="Search for tags and filter"
        noOptionsMessage={() => 'Start typing'}
      />
    </>
  );
};
