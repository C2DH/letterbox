import { KeywordsFacet, KeywordsFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import cx from 'classnames';
import { omit, range, uniq, without } from 'lodash';
import { FC, Fragment, ReactNode, useMemo, useState } from 'react';
import { RiAddLine, RiFilterLine, RiFilterOffLine } from 'react-icons/ri';
import { ClassNamesConfig, StylesConfig } from 'react-select';
import AsyncSelect from 'react-select/async';

import config from '../../config';
import {
  DATE_FACET,
  FACETS_DICT,
  ITEM_TYPE_LABELS_PLURAL,
  ItemType,
  ItemValue,
  TAGS_FACET,
  VERIFIED_FACET,
} from '../../core/consts';
import { useEntityLabels } from '../../hooks/useEntityLabels';
import { getDateFilter } from '../../utils/filters';
import {
  ENTITY_FACETS_ORDER,
  EditTarget,
  QUERY_FACET_ID,
  STATUS_LABELS,
  SummaryToken,
  getClauseSeparator,
  getFiltersSummary,
  tokenToText,
} from '../../utils/filtersSummary';
import { REACT_SELECT_BASE_PROPS } from '../../utils/react-select';
import { ItemIcon } from '../items/ItemIcon';

const { minYear, maxYear } = config;

const ENTITY_FACETS_SET = new Set<string>(ENTITY_FACETS_ORDER);

const RemoveButton: FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => (
  <button
    type="button"
    className="btn btn-ico btn-outline-dark p-1 border-0 d-inline-flex"
    title={title}
    aria-label={title}
    onClick={onClick}
  >
    <RiFilterOffLine />
  </button>
);

const QueryInput: FC<{ initialValue: string; autoFocus?: boolean; onCommit: (value: string) => void }> = ({
  initialValue,
  autoFocus,
  onCommit,
}) => {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      type="text"
      className="form-control"
      aria-label="Full-text search"
      autoFocus={autoFocus}
      size={Math.max(value.length, 10)}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => onCommit(value.trim())}
      onKeyDown={(e) => {
        if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
        if (e.key === 'Escape') {
          setValue(initialValue);
          onCommit(initialValue);
        }
      }}
    />
  );
};

const YearSelect: FC<{
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (year: number) => void;
}> = ({ value, min, max, label, onChange }) => (
  <select className="form-select" aria-label={label} value={value} onChange={(e) => onChange(+e.target.value)}>
    {range(min, max + 1).map((year) => (
      <option key={year} value={year}>
        {year}
      </option>
    ))}
  </select>
);

const StatusSelect: FC<{
  value?: boolean;
  autoFocus?: boolean;
  onChange: (value: boolean) => void;
  onBlur?: () => void;
}> = ({ value, autoFocus, onChange, onBlur }) => (
  <select
    className="form-select"
    aria-label="Status"
    autoFocus={autoFocus}
    value={typeof value === 'boolean' ? value + '' : ''}
    onChange={(e) => e.target.value && onChange(e.target.value === 'true')}
    onBlur={onBlur}
  >
    {typeof value !== 'boolean' && <option value="">…</option>}
    <option value="true">{STATUS_LABELS.verified}</option>
    <option value="false">{STATUS_LABELS.unverified}</option>
  </select>
);

/**
 * Inline autocomplete, to add a value to a keywords filter. It uses the same react-select setup
 * as the other autocomplete inputs of the app.
 */
const ValuePicker: FC<{
  facet: string;
  onPick: (value: ItemValue) => void;
  onClose: () => void;
}> = ({ facet, onPick, onClose }) => {
  const { state, autocomplete } = useFacetsContext();
  const facetDef = (facet === TAGS_FACET.id ? TAGS_FACET : FACETS_DICT[facet]) as KeywordsFacet;
  const selected = useMemo(
    () => new Set((state.filters?.[facet] as KeywordsFilter | undefined)?.values || []),
    [state, facet],
  );

  return (
    <span className="filters-summary-picker">
      <AsyncSelect<ItemValue>
        {...(REACT_SELECT_BASE_PROPS as object)}
        autoFocus
        value={null}
        menuPortalTarget={document.body}
        classNames={{
          ...(REACT_SELECT_BASE_PROPS.classNames as ClassNamesConfig<ItemValue, false>),
          // Keep the placeholder on one line, so that the field height never changes:
          placeholder: () => 'text-truncate',
        }}
        styles={{
          ...(REACT_SELECT_BASE_PROPS.styles as StylesConfig<ItemValue, false>),
          menuPortal: (base) => ({ ...base, zIndex: 1050 }),
        }}
        placeholder={`Search for ${facet === TAGS_FACET.id ? 'tags' : ITEM_TYPE_LABELS_PLURAL[facet as ItemType].toLowerCase()}`}
        noOptionsMessage={() => 'Start typing'}
        loadOptions={async (input) => {
          if (!autocomplete) return [];
          // Do not filter the values of a facet with the facet itself:
          const { values } = await autocomplete(facetDef, { ...state, filters: omit(state.filters, facet) }, input);
          return (values as ItemValue[]).filter(({ value }) => !selected.has(value));
        }}
        onChange={(option) => {
          if (option) onPick(option);
        }}
        onBlur={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
      />
    </span>
  );
};

/**
 * "Add filter" menu, listing the filters that are not in the sentence yet.
 */
const AddFilterMenu: FC<{ options: { id: string; label: string }[]; onSelect: (id: string) => void }> = ({
  options,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  if (!options.length) return null;

  return (
    <div
      className="dropdown"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className="btn btn-outline-dark btn-ico gap-1 px-2"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <RiFilterLine /> Add filter
      </button>
      <ul className={cx('dropdown-menu', open && 'show')}>
        {options.map(({ id, label }) => (
          <li key={id}>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => {
                setOpen(false);
                onSelect(id);
              }}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

/**
 * MAIN COMPONENT
 * **************
 */

export const FiltersSummary: FC<{ itemType: ItemType; count?: number }> = ({ itemType, count }) => {
  const { state, setState, setQuery, setFilter } = useFacetsContext();
  const { labels, addLabels } = useEntityLabels(state);
  const [expandedFacets, setExpandedFacets] = useState<Set<string>>(new Set());
  const [editTarget, setEditTarget] = useState<EditTarget | null>(null);

  const summary = useMemo(
    () =>
      getFiltersSummary({
        state,
        itemType,
        count,
        labels,
        expandedFacets,
        editTarget,
      }),
    [state, itemType, count, labels, expandedFacets, editTarget],
  );

  const filters = useMemo(() => state.filters || {}, [state.filters]);
  const getValues = (facet: string) => (filters[facet] as KeywordsFilter | undefined)?.values || [];
  const dateFilter = filters[DATE_FACET.id];
  const { min: dateMin, max: dateMax } = getDateFilter(dateFilter?.type === 'date' ? dateFilter : {});

  const addValue = (facet: string, value: ItemValue) => {
    addLabels([value]);
    setFilter(facet, { type: 'keywords', values: uniq([...getValues(facet), value.value]) });
  };
  const replaceValue = (facet: string, oldValue: string, newValue: ItemValue) => {
    addLabels([newValue]);
    const values = uniq(getValues(facet).map((v) => (v === oldValue ? newValue.value : v)));
    setFilter(facet, { type: 'keywords', values });
  };
  const removeValues = (facet: string, toRemove: string[]) => {
    const values = without(getValues(facet), ...toRemove);
    setFilter(facet, values.length ? { type: 'keywords', values } : undefined);
  };
  const removeClause = (facet: string) => {
    if (facet === QUERY_FACET_ID) setQuery(undefined);
    else setFilter(facet, undefined);
  };
  const setYear = (bound: 'min' | 'max', year: number) =>
    setFilter(DATE_FACET.id, getDateFilter({ min: dateMin, max: dateMax, [bound]: year }));
  const setStatus = (value: boolean) => setFilter(VERIFIED_FACET.id, { type: 'boolean', value });

  // Filters that can still be added:
  const facetsInSentence = new Set(summary.clauses.map(({ facet }) => facet));
  const hasStatus = summary.head.some(({ type }) => type === 'status');
  const addOptions = [
    { id: QUERY_FACET_ID, label: 'Full-text search' },
    ...ENTITY_FACETS_ORDER.filter((facet) => facet !== itemType).map((facet) => ({
      id: facet,
      label: ITEM_TYPE_LABELS_PLURAL[facet],
    })),
    { id: DATE_FACET.id, label: 'Dates' },
    { id: TAGS_FACET.id, label: 'Tags' },
    ...(hasStatus ? [] : [{ id: VERIFIED_FACET.id, label: 'Status' }]),
  ].filter(({ id }) => !facetsInSentence.has(id) && id !== editTarget?.facet);

  const isEmpty = !hasStatus && !summary.clauses.length;

  const renderToken = (token: SummaryToken, key: number): ReactNode => {
    switch (token.type) {
      case 'status':
        return (
          <Fragment key={key}>
            <StatusSelect value={token.verified} onChange={setStatus} />
            <RemoveButton title="Remove status filter" onClick={() => removeClause(VERIFIED_FACET.id)} />
          </Fragment>
        );
      case 'query':
        return (
          <QueryInput
            key={token.query}
            initialValue={token.query}
            autoFocus={editTarget?.facet === QUERY_FACET_ID}
            onCommit={(value) => {
              if (value !== token.query) setQuery(value || undefined);
              setEditTarget(null);
            }}
          />
        );
      case 'value':
      case 'loading':
      case 'unknown': {
        const values = token.type === 'unknown' ? token.values : [token.value];
        return (
          <span
            key={key}
            className={cx('filters-summary-value bg-yellow-300 rounded', token.type === 'unknown' && 'fst-italic')}
          >
            {token.type === 'unknown' ? (
              <span className="filters-summary-label text-truncate" title={tokenToText(token)}>
                {tokenToText(token)}
              </span>
            ) : (
              <button
                type="button"
                className="filters-summary-label filters-summary-editable text-truncate"
                title={`${tokenToText(token)} (click to replace)`}
                onClick={() => setEditTarget({ facet: token.facet, value: token.value })}
              >
                {tokenToText(token)}
              </button>
            )}
            <RemoveButton
              title={token.type === 'loading' ? 'Remove this filter' : `Remove ${tokenToText(token)}`}
              onClick={() => removeValues(token.facet, values)}
            />
          </span>
        );
      }
      case 'more':
        return (
          <button
            key={key}
            type="button"
            className="btn btn-link p-0 align-baseline filters-summary-more"
            title="Show all values"
            onClick={() => setExpandedFacets(new Set([...expandedFacets, token.facet]))}
          >
            {tokenToText(token)}
          </button>
        );
      case 'picker':
        return (
          <ValuePicker
            key={key}
            facet={token.facet}
            onPick={(value) => {
              if (token.replaces) replaceValue(token.facet, token.replaces, value);
              else addValue(token.facet, value);
              setEditTarget(null);
            }}
            onClose={() => setEditTarget(null)}
          />
        );
      case 'year':
        return token.bound === 'min' ? (
          <YearSelect
            key={key}
            label="Start year"
            value={token.year}
            min={minYear}
            max={dateMax}
            onChange={(year) => setYear('min', year)}
          />
        ) : (
          <YearSelect
            key={key}
            label="End year"
            value={token.year}
            min={dateMin}
            max={maxYear}
            onChange={(year) => setYear('max', year)}
          />
        );
      default:
        return <Fragment key={key}>{tokenToText(token)}</Fragment>;
    }
  };

  // While picking, the picker is rendered as a value token (see 'picker' above):
  const renderAddValue = (facet: string) =>
    editTarget?.facet === facet && editTarget.value === undefined ? null : (
      <button
        type="button"
        className="btn btn-ico btn-outline-dark p-1 border-0 d-inline-flex"
        title="Add a value"
        aria-label="Add a value"
        onClick={() => setEditTarget({ facet })}
      >
        <RiAddLine />
      </button>
    );

  return (
    <section className="filters-summary mb-4">
      <h1 className="fs-2 with-icon mb-0">
        <ItemIcon type={itemType} />{' '}
        {summary.head.map((token, i) => (
          <Fragment key={i}>
            {renderToken(token, i)}
            {token.type === 'count' && editTarget?.facet === VERIFIED_FACET.id && (
              <>
                {' '}
                <StatusSelect
                  autoFocus
                  onChange={(value) => {
                    setStatus(value);
                    setEditTarget(null);
                  }}
                  onBlur={() => setEditTarget(null)}
                />
              </>
            )}
          </Fragment>
        ))}
        {summary.clauses.map((clause, i) => (
          <Fragment key={clause.facet}>
            {getClauseSeparator(i, summary.clauses.length)}
            {clause.tokens.map(renderToken)}
            {(clause.facet === TAGS_FACET.id || ENTITY_FACETS_SET.has(clause.facet)) && renderAddValue(clause.facet)}
            {((clause.facet === QUERY_FACET_ID && editTarget?.facet !== QUERY_FACET_ID) ||
              clause.facet === DATE_FACET.id) && (
              <RemoveButton
                title={clause.facet === QUERY_FACET_ID ? 'Remove full-text search' : 'Remove dates filter'}
                onClick={() => removeClause(clause.facet)}
              />
            )}
          </Fragment>
        ))}
      </h1>

      <div className="d-flex flex-row gap-2 mt-2">
        <AddFilterMenu
          options={addOptions}
          onSelect={(id) => {
            // Dates are created right away, with the extreme years:
            if (id === DATE_FACET.id) {
              setEditTarget(null);
              setFilter(DATE_FACET.id, getDateFilter({}));
            } else setEditTarget({ facet: id });
          }}
        />
        {!isEmpty && (
          <button
            type="button"
            className="btn btn-outline-dark btn-ico gap-1 px-2"
            onClick={() => {
              setEditTarget(null);
              setExpandedFacets(new Set());
              setState({});
            }}
          >
            <RiFilterOffLine /> Reset all filters
          </button>
        )}
      </div>
    </section>
  );
};
