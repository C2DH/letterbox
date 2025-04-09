import { KeywordsFilter } from '@ouestware/facets';
import {
  InputKeywordsProps,
  KeywordsFacetHistogramProps,
  useFacet,
  useFacetsContext,
  useInputKeywords,
  ValueWithCount,
} from '@ouestware/facets-client';
import { keyBy, max, without } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { RiDownloadLine, RiFilterLine, RiFilterOffLine, RiShareBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import {
  APP_LANGUAGE,
  FACETS_DICT,
  ITEM_TYPE_LABELS_PLURAL,
  ItemIcon,
  ItemType,
  REACT_SELECT_BASE_PROPS,
} from '../core/consts.tsx';

type ItemValue = ValueWithCount & { link?: string };

const HistogramRow: FC<
  { onClick: () => void; maxCount: number; index: number; Icon: IconType } & ItemValue
> = ({ onClick, value, link, maxCount, count, index, Icon }) => {
  return (
    <button
      className="btn btn-light bg-transparent w-100 border-0 p-3 position-relative"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="d-flex flex-row align-items-baseline">
        <div className="position-relative flex-grow-1 text-start me-2">
          <span>
            {value}
            {link && (
              <>
                {' '}
                <Link
                  to={link}
                  target="_blank"
                  className="text-dark"
                  onClick={(e) => e.stopPropagation()}
                >
                  <RiShareBoxLine />
                </Link>
              </>
            )}
          </span>
          <div
            style={{
              height: 4,
            }}
            className="bg-light position-absolute top-100 w-100 start-0 mt-1"
          >
            <div className="h-100 bg-dark" style={{ width: (count / maxCount) * 100 + '%' }} />
          </div>

          {(index === 0 || !((index + 1) % 5)) && (
            <span className="text-muted position-absolute end-100 pe-2 top-0">{index + 1}</span>
          )}
        </div>

        <Icon className="flex-shrink-0" />
      </div>
    </button>
  );
};

const Histogram: FC<KeywordsFacetHistogramProps<ItemValue>> = ({
  histogramData,
  values,
  onChange,
}) => {
  const [hover, setHover] = useState<number | null>(null);
  const selectedValues = useMemo(() => new Set(values || []), [values]);
  const { selected, unselected } = useMemo(() => {
    const valuesDict = keyBy(histogramData?.values || [], 'value');
    const missingSelectedValues = values?.filter((v) => valuesDict[v]) || [];
    const presentSelectedValues = values?.filter((v) => !valuesDict[v]) || [];

    return {
      selected: [...presentSelectedValues, ...missingSelectedValues].map(
        (value) =>
          valuesDict[value] || {
            value,
            count: 0,
          },
      ),
      unselected: (histogramData?.values || []).filter(({ value }) => !selectedValues.has(value)),
    };
  }, [histogramData?.values, selectedValues, values]);
  const maxCount = useMemo<number>(
    () => histogramData?.maxCount || max(histogramData?.values.map((v) => v.count)) || 1,
    [histogramData],
  );

  if (!histogramData)
    return (
      <div className="text-center pt-3">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <>
      <ul className="list-unstyled bg-light rounded my-2">
        {selected.map(({ value, count, link }, i) => (
          <li
            key={i}
            className={`${hover === i ? 'bg-light' : ''} d-flex`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <HistogramRow
              value={value}
              count={count}
              link={link}
              onClick={() => {
                onChange(without(values, value));
              }}
              maxCount={maxCount}
              index={i}
              Icon={RiFilterOffLine}
            />
          </li>
        ))}
      </ul>
      <ul className="list-unstyled">
        {unselected.map(({ value, count, link }, i) => (
          <li
            key={i}
            className={`${hover === i ? 'bg-light' : ''} d-flex`}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          >
            <HistogramRow
              value={value}
              count={count}
              link={link}
              onClick={() => {
                onChange((values || []).concat([value]));
              }}
              maxCount={maxCount}
              index={selected.length + i}
              Icon={RiFilterLine}
            />
          </li>
        ))}
      </ul>
      <div className="d-flex align-items-baseline flex-row small">
        <button type="button" className="btn btn-sm btn-outline-dark" disabled>
          TODO: Load more
        </button>{' '}
        <span className="text-muted ms-2">
          {histogramData.values.length.toLocaleString(APP_LANGUAGE)} of{' '}
          {histogramData.total.toLocaleString(APP_LANGUAGE)}
        </span>
      </div>
    </>
  );
};

export const ItemFacet: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const { state, loadHistogram, autocomplete } = useFacetsContext();
  const facet = useMemo(() => FACETS_DICT[itemType], [itemType]);
  const { filter, onChange } = useFacet(facet);
  const fnAutocomplete = useMemo(() => {
    return facet.type === 'keywords' && facet.autocomplete && autocomplete
      ? (inputValue: string) => autocomplete(facet, state, inputValue)
      : undefined;
  }, [facet, autocomplete, state]);

  const fnLoadHistogram = useMemo(() => {
    return facet.type === 'keywords' && facet.histogram && loadHistogram
      ? () => loadHistogram(facet, state)
      : undefined;
  }, [facet, loadHistogram, state]);
  const inputKeywordsProps = useMemo<InputKeywordsProps<ItemValue>>(
    () => ({
      isMulti: true,
      values: (filter as KeywordsFilter | undefined)?.values,
      onChange: (values) =>
        onChange({
          type: 'keywords',
          values: values || [],
        }),
      autocomplete: fnAutocomplete,
      loadHistogramData: fnLoadHistogram,
    }),
    [filter, fnAutocomplete, fnLoadHistogram, onChange],
  );
  const { selectProps, histogramProps } = useInputKeywords(inputKeywordsProps);

  return (
    <>
      <div className="card-title d-flex flex-row align-items-baseline">
        <h2 className="with-icon fw-semibold flex-grow-1 m-0">
          <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}
          {!!histogramProps?.histogramData?.total && (
            <>
              {' '}
              <span className="text-muted">
                {histogramProps.histogramData.total.toLocaleString(APP_LANGUAGE)}
              </span>
            </>
          )}
        </h2>

        <button className="btn btn-dark py-1 px-2">
          <RiDownloadLine />
        </button>
      </div>

      <AsyncSelect
        {...selectProps}
        {...REACT_SELECT_BASE_PROPS}
        value={null}
        noOptionsMessage={() => 'Start typing'}
        placeholder={`Search for ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`}
      />
      {histogramProps && <Histogram {...histogramProps} />}
    </>
  );
};
