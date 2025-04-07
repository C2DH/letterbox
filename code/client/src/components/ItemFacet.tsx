import { KeywordsFilter } from '@ouestware/facets';
import {
  InputKeywordsProps,
  KeywordsFacetHistogramProps,
  useFacet,
  useInputKeywords,
  ValueWithCount,
} from '@ouestware/facets-client';
import { keyBy, max, without } from 'lodash';
import { FC, useMemo, useState } from 'react';
import { IconType } from 'react-icons';
import { RiFilterLine, RiFilterOffLine, RiShareBoxLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import AsyncCreatableSelect from 'react-select/async-creatable';

import {
  FACETS_DICT,
  ITEM_TYPE_LABELS_PLURAL,
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
            <span className="text-muted position-absolute end-100 pe-2">{index + 1}</span>
          )}
        </div>

        <Icon />
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
  const remainingCount = useMemo(
    () => (histogramData ? histogramData.total - histogramData.values.length : 0),
    [histogramData],
  );
  const maxCount = useMemo<number>(
    () => histogramData?.maxCount || max(histogramData?.values.map((v) => v.count)) || 1,
    [histogramData],
  );

  if (!histogramData)
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
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
        {!!remainingCount && (
          <li className="small text-muted">
            <i>
              ...and {remainingCount} other{remainingCount > 1 ? 's' : ''} value
              {remainingCount > 1 ? 's' : ''}
            </i>
          </li>
        )}
      </ul>
    </>
  );
};

export const ItemFacet: FC<{ itemType: ItemType }> = ({ itemType }) => {
  const facet = useMemo(() => FACETS_DICT[itemType], [itemType]);
  const { filter, onChange } = useFacet(facet);
  const inputKeywordsProps = useMemo<InputKeywordsProps<ItemValue>>(
    () => ({
      isMulti: true,
      values: (filter as KeywordsFilter | undefined)?.values,
      onChange: (values) =>
        onChange({
          type: 'keywords',
          values: values || [],
        }),
      autocomplete: async (_inputValue: string) => ({
        total: 2,
        values: [
          {
            value: 'Lorem ipsum',
            link: `/${itemType}/${1}`,
            count: 456,
          },
          {
            value: 'Dolor sit amet',
            link: `/${itemType}/${2}`,
            count: 123,
          },
        ],
      }),
      loadHistogramData: async () => ({
        total: 2,
        values: [
          {
            value: 'Lorem ipsum',
            link: `/${itemType}/${1}`,
            count: 456,
          },
          {
            value: 'Dolor sit amet',
            link: `/${itemType}/${2}`,
            count: 123,
          },
        ],
      }),
    }),
    [filter, itemType, onChange],
  );
  const { selectProps, histogramProps } = useInputKeywords(inputKeywordsProps);

  return (
    <>
      <AsyncCreatableSelect
        {...selectProps}
        {...REACT_SELECT_BASE_PROPS}
        value={undefined}
        placeholder={`Search for ${ITEM_TYPE_LABELS_PLURAL[itemType].toLowerCase()}`}
      />
      {histogramProps && <Histogram {...histogramProps} />}
    </>
  );
};
