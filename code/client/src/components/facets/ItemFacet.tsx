import { KeywordsFilter } from '@ouestware/facets';
import {
  AutocompleteData,
  HistogramData,
  InputKeywordsProps,
  KeywordsFacetSimpleHistogramProps,
  useFacet,
  useFacetsContext,
  useInputKeywords,
  useKeywordsFacetSimpleHistogram,
} from '@ouestware/facets-client';
import { InfiniteScroll } from '@ouestware/infinite-scroll';
import { Spinner } from '@ouestware/loaders';
import cx from 'classnames';
import { keyBy, pick, without } from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';
import { RiDownloadLine, RiFilterLine, RiFilterOffLine, RiShareBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AsyncSelect from 'react-select/async';
import streamSaver from 'streamsaver';

import {
  APP_LANGUAGE,
  FACETS_DICT,
  ITEM_TYPE_LABELS,
  ITEM_TYPE_LABELS_PLURAL,
  ItemIcon,
  ItemType,
  ItemValue,
  REACT_SELECT_BASE_PROPS,
} from '../../core/consts.tsx';
import { useEditionContext } from '../../core/edition.ts';
import { InCartButton } from '../edition/InCartButton.tsx';
import { EditionActionsTooltip } from '../edition/tooltips.tsx';

const HistogramRow: FC<
  {
    itemType: ItemType;
    selectedType: ItemType;
    onClick: () => void;
    maxCount: number;
    index?: number;
    Icon: IconType;
    active?: boolean;
  } & ItemValue
> = ({
  itemType,
  selectedType,
  onClick,
  value,
  label,
  link,
  maxCount,
  count,
  index,
  Icon,
  active,
}) => {
  const { enabled } = useEditionContext();

  return (
    <div
      className="histogram-row  w-100 border-0  position-relative"
      title={`${label || 'No value'} (linked to ${count.toLocaleString(APP_LANGUAGE)} ${(count > 1 ? ITEM_TYPE_LABELS_PLURAL[selectedType] : ITEM_TYPE_LABELS[selectedType]).toLowerCase()})`}
    >
      {/* clickable part of the row */}
      <div
        className="clickable-area d-flex h-100 flex-column flex-grow-1 justify-content-middle align-items-bottom btn btn-light bg-transparent border-0 position-relative"
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
      >
        <div className=" flex-grow-1 d-flex gap-1 align-items-end text-start justify-content-between">
          <span className="">
            {label ? <span>{label} </span> : <span className="muted fst-italic">No value</span>}{' '}
            <Icon className="align-baseline" />
          </span>

          <span className="histogram-row-value">{count.toLocaleString(APP_LANGUAGE)}</span>
        </div>
        <div
          style={{
            height: 4,
          }}
          className={cx(' mt-1', active ? 'bg-yellow-100' : 'bg-light-gray')}
        >
          <div
            className={cx('h-100', active ? 'bg-primary' : 'bg-secondary')}
            style={{ width: (count / maxCount) * 100 + '%' }}
          />
        </div>

        {typeof index === 'number' && (index === 0 || !((index + 1) % 5)) && (
          <span className="histogram-row-index-marker text-muted position-absolute  text-start small h-100">
            <span className="histogram-row-index-marker-value">{index + 1}</span>
          </span>
        )}
      </div>

      <div className="h-100 my-auto d-flex align-items-center  justify-content-center actions-container ">
        <div className="  d-flex flex-row justify-content-start  gap-1  ">
          {enabled && itemType !== 'message' && (
            <>
              <InCartButton label={label || value} type={itemType} id={value} />
              <EditionActionsTooltip itemType={itemType} id={value} label={label || value} />
            </>
          )}

          {link && (
            <Link
              to={link}
              target="_blank"
              className="btn btn-ico btn-outline-dark p-1 border-0"
              onClick={(e) => e.stopPropagation()}
            >
              <RiShareBoxLine />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const Histogram: FC<
  {
    total: number;
    maxCount: number;
    histogramValues?: HistogramData<ItemValue>['values'];
    loading: boolean;
    itemType: ItemType;
    selectedType: ItemType;
  } & KeywordsFacetSimpleHistogramProps
> = ({
  loading,
  histogramValues = [],
  total,
  maxCount,
  itemType,
  selectedType,
  onChange,
  values,
}) => {
  const selectedValues = useMemo(() => new Set(values || []), [values]);
  const { selected, unselected } = useMemo(() => {
    const valuesDict = keyBy(histogramValues || [], 'value');
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
      unselected: histogramValues.filter(({ value }) => !selectedValues.has(value)),
    };
  }, [histogramValues, selectedValues, values]);

  if (loading)
    return (
      <div className="text-center pt-3">
        <Spinner />
      </div>
    );

  return (
    <>
      {selected.length > 0 && (
        <ul className="list-unstyled bg-yellow-300 rounded my-2 py-1">
          {selected.map(({ label, value, count, link }, i) => (
            <li key={i} className="d-flex">
              <HistogramRow
                itemType={itemType}
                selectedType={selectedType}
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
      )}
      <InfiniteScroll
        list={({ children }) => <ul className="list-unstyled">{children}</ul>}
        bottom={() => (
          <li className="text-center pt-3">
            <Spinner />
          </li>
        )}
        loadData={async (from) => {
          const valuesToLoad = unselected.slice(from, from + 20);
          return {
            data: valuesToLoad.map((item, index) => ({ item, index: from + index })),
            total: unselected.length,
          };
        }}
        getDataId={(data: { item: ItemValue }) => `${data.item.label}-${data.item.count}`}
        element={({ data }) => (
          <li className="d-flex">
            <HistogramRow
              itemType={itemType}
              selectedType={selectedType}
              label={data.item.label}
              value={data.item.value}
              count={data.item.count}
              link={data.item.link}
              onClick={() => {
                onChange((values || []).concat([data.item.value]));
              }}
              maxCount={maxCount}
              index={data.index}
              Icon={RiFilterLine}
            />
          </li>
        )}
      />
      <div className="d-flex align-items-baseline flex-row small">
        {/* <button type="button" className="btn btn-sm btn-outline-dark" disabled>
          TODO: Load more
        </button> */}
        {!!total && (
          <>
            {' '}
            <span className="text-muted ms-2">
              {(histogramValues.filter((v) => !!v.count).length || 0).toLocaleString(APP_LANGUAGE)}{' '}
              of {total.toLocaleString(APP_LANGUAGE)}
            </span>
          </>
        )}
      </div>
    </>
  );
};

export const ItemFacet: FC<{ itemType: ItemType; selectedType: ItemType }> = ({
  itemType,
  selectedType,
}) => {
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
  const { selectProps } = useInputKeywords<ItemValue>(inputKeywordsProps);
  const histogramProps = pick(inputKeywordsProps, [
    'loadHistogramData',
    'values',
    'onChange',
    'paginate',
  ]) as KeywordsFacetSimpleHistogramProps<ItemValue>;
  const histogramData = useKeywordsFacetSimpleHistogram(histogramProps);

  /**
   * Download function to create a CSV file.
   * It takes the histogramData that we already have, and generate a CSV of it.
   */
  const download = useCallback(() => {
    // Header
    let headerLine = ``;
    let fileName = 'top500-';
    switch (itemType) {
      case 'address':
        headerLine += `Address`;
        fileName += 'addresses';
        break;
      case 'country':
        headerLine = `Country`;
        fileName += 'countries';
        break;
      case 'company':
        headerLine = `Company`;
        fileName += 'companies';
        break;
      case 'person':
        headerLine = `Person`;
        fileName += 'persons';
        break;
    }
    switch (selectedType) {
      case 'address':
        headerLine += `,Count by address`;
        fileName += '-by-address';
        break;
      case 'country':
        headerLine += `,Count by country`;
        fileName += '-by-country';
        break;
      case 'company':
        headerLine += `,Count by company`;
        fileName += '-by-company';
        break;
      case 'person':
        headerLine += `,Count by person`;
        fileName += '-by-person';
        break;
    }
    headerLine += `,ID\n`;
    fileName += '.csv';

    const fileStream = streamSaver.createWriteStream(fileName);
    const writer = fileStream.getWriter();

    writer.write(new TextEncoder().encode(headerLine));
    histogramData.histogramValues?.forEach(({ value, label, count }) => {
      writer.write(
        new TextEncoder().encode(`"${label?.split(`"`).join(`""`)}",${count},${value},\n`),
      );
    });
    writer.close();
  }, [itemType, selectedType, histogramData]);

  return (
    <>
      <div className="card-title d-flex flex-row align-items-baseline">
        <h2 className="with-icon fw-semibold flex-grow-1 m-0">
          <ItemIcon type={itemType} /> {ITEM_TYPE_LABELS_PLURAL[itemType]}
          {!!histogramData.total && (
            <>
              {' '}
              <span className="text-muted">{histogramData.total.toLocaleString(APP_LANGUAGE)}</span>
            </>
          )}
        </h2>

        <button
          className="btn btn-outline-dark btn-ico p-2 ms-2"
          title={`Download top 500 ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`}
          onClick={download}
        >
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
      <Histogram
        {...histogramProps}
        {...histogramData}
        itemType={itemType}
        selectedType={selectedType}
      />
    </>
  );
};
