import { useApolloClient } from '@apollo/client';
import { DateFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import { getAsyncMemoData, useAsyncMemo } from '@ouestware/hooks';
import { LoaderFill } from '@ouestware/loaders';
import cx from 'classnames';
import { clamp, fromPairs, inRange, max, range } from 'lodash';
import {
  CSSProperties,
  FC,
  MouseEvent as ReactMouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { RiCloseFill, RiContractLeftLine, RiContractRightLine } from 'react-icons/ri';

import config from '../../config.ts';
import { APP_LANGUAGE, ITEM_TYPE_LABELS, ITEM_TYPE_LABELS_PLURAL } from '../../core/consts.tsx';
import { DataItemType } from '../../core/graphql';
import { itemsTimeline, messagesTimeline } from '../../core/graphql/queries/timeline.ts';
import { filtersStateToSearchFilters } from '../../utils/filters.ts';

const { minYear, maxYear } = config;

type Extents = { min?: number; max?: number };

type BaseDragMouseState = {
  x: number;
  initialX: number;
};
type DragHandleMouseState = BaseDragMouseState & {
  type: 'dragHandle';
  side: 'left' | 'right';
  initialExtents: Extents;
};
type DragSliderMouseState = BaseDragMouseState & {
  type: 'dragSlider';
  initialExtents: Extents;
};
type IdleMouseState = {
  type: 'idle';
};
type MouseState = DragHandleMouseState | DragSliderMouseState | IdleMouseState;

function getSliderStyle(extents: Extents): CSSProperties {
  const min = extents?.min ?? minYear;
  const max = extents?.max ?? maxYear;

  return {
    left: ((min - minYear) / (maxYear - minYear + 1)) * 100 + '%',
    right: ((maxYear - max) / (maxYear - minYear + 1)) * 100 + '%',
  };
}

function getCoordinates(e: ReactMouseEvent | MouseEvent, referential: HTMLElement) {
  const rect = referential.getBoundingClientRect();
  return {
    x: e.pageX - rect.left,
    y: e.pageY - rect.top,
  };
}
function getX(e: ReactMouseEvent | MouseEvent, referential: HTMLElement): number {
  return getCoordinates(e, referential).x;
}

function getYear(x: number, width: number): number {
  const yearPx = width / (maxYear - minYear + 1);
  return minYear + Math.floor(x / yearPx);
}

export const Timeline: FC<{
  itemType: DataItemType;
}> = ({ itemType }) => {
  const root = useRef<HTMLElement>(null);
  const { state: filtersState, setFilter } = useFacetsContext();
  const filter = useMemo(
    () => filtersState?.filters?.date as DateFilter | undefined,
    [filtersState],
  );
  const [extents, setExtents] = useState<null | Extents>({
    min: minYear + 3,
    max: minYear + 5,
  });
  const [hoveredYear, setHoveredYear] = useState<null | number>(null);
  const [mouse, setMouse] = useState<MouseState>({ type: 'idle' });
  const client = useApolloClient();
  const dataState = useAsyncMemo(
    () =>
      client.query({
        fetchPolicy: 'no-cache',
        query: itemType === 'message' ? messagesTimeline : itemsTimeline,
        variables: {
          itemType,
          filters: filtersStateToSearchFilters(filtersState, itemType),
        },
      }),
    [filtersState, itemType],
  );
  const data = useMemo(() => getAsyncMemoData(dataState), [dataState]);
  const timelineData = useMemo(() => {
    if (!data) return null;

    return {
      maxCount: max(data.data.aggregate.values.map(({ count }) => count)) || 0,
      counts: fromPairs(data.data.aggregate.values.map(({ id, count }) => [id, count])),
    };
  }, [data]);

  // Handle body mouse events while interacting with the timeline:
  useEffect(() => {
    if (mouse.type === 'idle') return;

    const moveHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setMouse({
        ...mouse,
        x: getX(e, root.current!),
      });
    };
    const upHandler = () => {
      setMouse({
        type: 'idle',
      });
      setFilter('date', {
        ...(filter || {}),
        type: 'date',
        min: extents?.min && extents.min > minYear ? extents.min : undefined,
        max: extents?.max && extents.max < maxYear ? extents.max : undefined,
      });
    };

    document.body.addEventListener('mousemove', moveHandler);
    document.body.addEventListener('mouseup', upHandler);
    return () => {
      document.body.removeEventListener('mousemove', moveHandler);
      document.body.removeEventListener('mouseup', upHandler);
    };
  }, [extents, filter, mouse, setFilter]);

  // Handle body move event to detect hovered year:
  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      const dom = root.current!;
      const { x, y } = getCoordinates(e, dom);

      // If mouse is hovering the timeline, update hoveredYear:
      if (inRange(x, 0, dom.offsetWidth) && inRange(y, 0, dom.offsetHeight))
        setHoveredYear(getYear(x, dom.offsetWidth));
      else setHoveredYear(null);
    };

    document.body.addEventListener('mousemove', moveHandler);
    return () => {
      document.body.removeEventListener('mousemove', moveHandler);
    };
  }, []);

  // Update extents on mouse move:
  useEffect(() => {
    switch (mouse.type) {
      case 'dragSlider': {
        const {
          x,
          initialX,
          initialExtents: { min = minYear, max = maxYear },
        } = mouse;
        const offset = x - initialX;
        const yearsOffset = Math.round(
          (offset / root.current!.offsetWidth) * (maxYear - minYear + 1),
        );
        const clampedYearsOffset = clamp(yearsOffset, minYear - min, maxYear - max);
        setExtents({
          min: min + clampedYearsOffset,
          max: max + clampedYearsOffset,
        });
        break;
      }
      case 'dragHandle': {
        setExtents(() => {
          const { x, initialX, initialExtents } = mouse;
          const offset = x - initialX;
          const yearsOffset = Math.round(
            (offset / root.current!.offsetWidth) * (maxYear - minYear + 1),
          );
          let newMin = initialExtents?.min ?? minYear;
          let newMax = initialExtents?.max ?? maxYear;

          if (mouse.side === 'left') {
            const clampedNewMin = clamp(newMin + yearsOffset, minYear, maxYear);
            if (clampedNewMin <= newMax) newMin = clampedNewMin;
            else {
              newMin = newMax;
              newMax = clampedNewMin;
            }
          } else {
            const clampedNewMax = clamp(newMax + yearsOffset, minYear, maxYear);
            if (clampedNewMax >= newMin) newMax = clampedNewMax;
            else {
              newMax = newMin;
              newMin = clampedNewMax;
            }
          }

          return {
            min: newMin,
            max: newMax,
          };
        });
        break;
      }
    }
  }, [mouse]);

  // Update extents on filters change:
  useEffect(() => {
    if (typeof filter?.min === 'number' || typeof filter?.max === 'number')
      setExtents({
        min: filter.min,
        max: filter.max,
      });
    else setExtents(null);
  }, [filter]);

  return (
    <section className={cx('timeline', mouse.type !== 'idle' && 'dragging')} ref={root}>
      {filter && <div className="filter-range" style={getSliderStyle(filter)}></div>}
      <div className="timeline-barchart axis-x justify-content-around">
        {range(minYear, maxYear + 1).map((year) => (
          <div
            key={year}
            className="bar-wrapper position-relative flex-grow-0 fs-6"
            style={{ width: 5 }}
          >
            {(year % 10 === 0 || year === minYear || year === maxYear) && (
              <span
                className={cx(
                  'd-flex flex-column w-100',
                  year === minYear ? 'align-items-start' : 'align-items-center',
                )}
              >
                <span className="tick" />
                <span className="label">{year}</span>
              </span>
            )}
            {year === hoveredYear && (
              <div
                className="position-absolute bg-primary text-light rounded z-3 small text-nowrap px-3 py-1 mt-1"
                style={{ top: 0, left: 0 }}
              >
                <div
                  className="position-absolute bg-primary"
                  style={{
                    width: 5,
                    height: 20,
                    top: -3,
                    left: 0,
                  }}
                ></div>
                {year}: {(timelineData?.counts[year] || 0).toLocaleString(APP_LANGUAGE)}{' '}
                {(timelineData?.counts[year] || 0 > 1
                  ? ITEM_TYPE_LABELS_PLURAL[itemType]
                  : ITEM_TYPE_LABELS[itemType]
                ).toLowerCase()}
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="timeline-barchart"
        onMouseDown={(e) => {
          if (mouse.type !== 'idle' || extents || !root.current) return;

          e.stopPropagation();
          e.preventDefault();

          const x = getX(e, root.current);
          const mouseYear = getYear(x, root.current.offsetWidth);

          setMouse({
            type: 'dragHandle',
            side: 'right',
            initialExtents: { min: mouseYear, max: mouseYear },
            initialX: x,
            x,
          });
        }}
        onClick={(e) => {
          if (!root.current || !filter) return;

          e.stopPropagation();
          e.preventDefault();

          const mouseYear = getYear(getX(e, root.current), root.current.offsetWidth);

          if (extents) {
            const { min = minYear, max = maxYear } = extents;

            const centerYear = Math.round((min + max) / 2);
            const clampedYearsOffset = clamp(mouseYear - centerYear, minYear - min, maxYear - max);

            setFilter('date', {
              type: 'date',
              min: min + clampedYearsOffset,
              max: max + clampedYearsOffset,
            });
          } else {
            setFilter('date', {
              type: 'date',
              min: mouseYear,
              max: mouseYear,
            });
          }
        }}
      >
        {range(minYear, maxYear + 1).map((year) => {
          const count = timelineData?.counts[year] || 0;
          const ratio = count / (timelineData?.maxCount || 1);
          return (
            <div key={year} className="bar-wrapper flex-grow-0" style={{ width: 5 }}>
              <div
                className={cx('bar', year === hoveredYear && 'bg-primary')}
                style={{ height: ratio * 100 + '%', width: 5 }}
              />
            </div>
          );
        })}
      </div>
      {extents && (
        <div
          className="local-range"
          onDoubleClick={() => {
            setFilter('date', undefined);
          }}
          onMouseDown={(e) => {
            e.stopPropagation();
            e.preventDefault();

            const x = getX(e, root.current!);
            setMouse({
              type: 'dragSlider',
              x,
              initialX: x,
              initialExtents: extents,
            });
          }}
          style={getSliderStyle(extents)}
        >
          <div
            className="handle handle-close"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setFilter('date', undefined);
            }}
          >
            <RiCloseFill />
          </div>
          <div
            className="handle handle-left"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();

              const x = getX(e, root.current!);
              setMouse({
                type: 'dragHandle',
                side: 'left',
                x,
                initialX: x,
                initialExtents: extents,
              });
            }}
          >
            <RiContractLeftLine />
          </div>
          <div
            className="handle handle-right"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();

              const x = getX(e, root.current!);
              setMouse({
                type: 'dragHandle',
                side: 'right',
                x,
                initialX: x,
                initialExtents: extents,
              });
            }}
          >
            <RiContractRightLine />
          </div>
        </div>
      )}
      {dataState.type === 'loading' && <LoaderFill />}
    </section>
  );
};
