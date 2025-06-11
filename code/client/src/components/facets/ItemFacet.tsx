import { KeywordsFilter } from '@ouestware/facets';
import {
  AutocompleteData,
  HistogramData,
  InputKeywordsProps,
  KeywordsFacetHistogramProps,
  useFacet,
  useFacetsContext,
  useInputKeywords,
} from '@ouestware/facets-client';
import { Tooltip } from '@ouestware/tooltip';
import cx from 'classnames';
import { keyBy, max, without } from 'lodash';
import { FC, useMemo } from 'react';
import { IconType } from 'react-icons';
import {
  RiDownloadLine,
  RiFilterLine,
  RiFilterOffLine,
  RiMore2Line,
  RiShareBoxLine,
} from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';

import {
  APP_LANGUAGE,
  FACETS_DICT,
  ITEM_TYPE_LABELS_PLURAL,
  ItemIcon,
  ItemType,
  ItemValue,
  REACT_SELECT_BASE_PROPS,
} from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { ItemEditionMenu } from '../edition/ItemEditionMenu.tsx';

const HistogramRow: FC<
  {
    itemType: ItemType;
    onClick: () => void;
    maxCount: number;
    index?: number;
    Icon: IconType;
    active?: boolean;
  } & ItemValue
> = ({ itemType, onClick, value, label, link, maxCount, count, index, Icon, active }) => {
  const { enabled } = useEditionContext();

  return (
    <button
      className="histogram-row btn btn-light bg-transparent w-100 border-0 py-3 ps-4 pe-3 position-relative"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div className="d-flex flex-row align-items-bottom">
        <div className="position-relative flex-grow-1 text-start">
          <span>
            {label || <span className="muted fst-italic">No value</span>}
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
            className={cx(
              'position-absolute top-100 w-100 start-0 mt-1',
              active ? 'bg-yellow-100' : 'bg-light-gray',
            )}
          >
            <div
              className={cx('h-100', active ? 'bg-primary' : 'bg-secondary')}
              style={{ width: (count / maxCount) * 100 + '%' }}
            />
          </div>

          {typeof index === 'number' && (index === 0 || !((index + 1) % 5)) && (
            <span
              className="text-muted position-absolute end-100 ps-2 top-0 text-start small"
              style={{ width: '40px', marginTop: '2px' }}
            >
              {index + 1}
            </span>
          )}
        </div>

        {enabled && (
          <Tooltip
            className="p-0 py-1"
            rootClassName="small d-inline-block"
            attachment={['top', 'right']}
            targetAttachment={['bottom', 'right']}
          >
            <button type="button" className="btn btn-sm btn-ico ms-2 p-1 btn-outline-purple-300">
              <RiMore2Line />
            </button>
            <div className="border border-light-gray-300 p-2 rounded bg-white color-purple-300">
              <ItemEditionMenu type={itemType} id={value} label={label || value} />
            </div>
          </Tooltip>
        )}

        <div className="d-inline-block ms-2">
          <Icon className="flex-shrink-0" />
        </div>
      </div>
    </button>
  );
};

const Histogram: FC<KeywordsFacetHistogramProps<ItemValue> & { itemType: ItemType }> = ({
  histogramData,
  values,
  onChange,
  itemType,
}) => {
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
      <ul className="list-unstyled bg-yellow-300 rounded my-2">
        {selected.map(({ label, value, count, link }, i) => (
          <li key={i} className="d-flex">
            <HistogramRow
              itemType={itemType}
              label={label}
              value={value}
              count={count}
              link={link}
              onClick={() => {
                onChange(without(values, value));
              }}
              maxCount={maxCount}
              Icon={RiFilterOffLine}
              active
            />
          </li>
        ))}
      </ul>
      <ul className="list-unstyled">
        {unselected.map(({ label, value, count, link }, i) => (
          <li key={i} className="d-flex">
            <HistogramRow
              itemType={itemType}
              label={label}
              value={value}
              count={count}
              link={link}
              onClick={() => {
                onChange((values || []).concat([value]));
              }}
              maxCount={maxCount}
              index={i}
              Icon={RiFilterLine}
            />
          </li>
        ))}
      </ul>
      <div className="d-flex align-items-baseline flex-row small">
        {/* <button type="button" className="btn btn-sm btn-outline-dark" disabled>
          TODO: Load more
        </button> */}
        {!!histogramData.total && (
          <>
            {' '}
            <span className="text-muted ms-2">
              {(histogramData.values.filter((v) => !!v.count).length || 0).toLocaleString(
                APP_LANGUAGE,
              )}{' '}
              of {histogramData.total.toLocaleString(APP_LANGUAGE)}
            </span>
          </>
        )}
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
      ? (inputValue: string) =>
          autocomplete(facet, state, inputValue) as Promise<AutocompleteData<ItemValue>>
      : undefined;
  }, [facet, autocomplete, state]);

  const fnLoadHistogram = useMemo(() => {
    return facet.type === 'keywords' && facet.histogram && loadHistogram
      ? () => loadHistogram(facet, state) as Promise<HistogramData<ItemValue>>
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
      valueToOption: ({ value, label }) => ({
        label: label || value,
        value,
      }),
    }),
    [filter, fnAutocomplete, fnLoadHistogram, onChange],
  );
  const { selectProps, histogramProps } = useInputKeywords<ItemValue>(inputKeywordsProps);

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

        <button className="btn btn-outline-dark btn-ico p-2 ms-2">
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
      {histogramProps && <Histogram {...histogramProps} itemType={itemType} />}
    </>
  );
};
