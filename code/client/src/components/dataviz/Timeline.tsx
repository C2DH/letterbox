import { useApolloClient } from '@apollo/client';
import { DateFilter } from '@ouestware/facets';
import { useFacetsContext } from '@ouestware/facets-client';
import { getAsyncMemoData, useAsyncMemo } from '@ouestware/hooks';
import { LoaderFill } from '@ouestware/loaders';
import cx from 'classnames';
import { clamp, fromPairs, max, range } from 'lodash';
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from 'react';
import { RiContractLeftLine, RiContractRightLine } from 'react-icons/ri';

import config from '../../config.ts';
import { APP_LANGUAGE } from '../../core/consts.tsx';
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
  initialValue: number;
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
  const [mouse, setMouse] = useState<MouseState>({ type: 'idle' });
  const client = useApolloClient();
  const dataState = useAsyncMemo(
    () =>
      client.query({
        query: itemType === 'message' ? messagesTimeline : itemsTimeline,
        variables: {
          itemType,
          filters: filtersStateToSearchFilters(filtersState),
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

  // Handle body mouse events:
  useEffect(() => {
    if (mouse.type === 'idle') return;

    const moveHandler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setMouse({
        ...mouse,
        x: e.clientX,
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
      case 'dragHandle':
        if (mouse.side === 'left') {
          setExtents((state) => {
            const { x, initialX, initialValue: min } = mouse;
            const offset = x - initialX;
            const yearsOffset = Math.round(
              (offset / root.current!.offsetWidth) * (maxYear - minYear + 1),
            );
            const clampedNewMin = clamp(min + yearsOffset, minYear, state?.max ?? maxYear);
            return {
              min: clampedNewMin,
              max: state?.max ?? maxYear,
            };
          });
        } else {
          setExtents((state) => {
            const { x, initialX, initialValue: max } = mouse;
            const offset = x - initialX;
            const yearsOffset = Math.round(
              (offset / root.current!.offsetWidth) * (maxYear - minYear + 1),
            );
            const clampedNewMax = clamp(max + yearsOffset, state?.min ?? minYear, maxYear);
            return {
              min: state?.min ?? minYear,
              max: clampedNewMax,
            };
          });
        }
        break;
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
      <div
        className="timeline-barchart"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();

          const x = e.pageX - root.current!.getBoundingClientRect().x;
          const mouseYear =
            minYear + Math.round((x / root.current!.offsetWidth) * (maxYear - minYear + 1));

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
            <div key={year} className="bar-wrapper">
              <div
                className="bar"
                title={`${count.toLocaleString(APP_LANGUAGE)} message${count > 1 ? 's' : ''} in ${year}`}
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
            setMouse({
              type: 'dragSlider',
              x: e.clientX,
              initialX: e.clientX,
              initialExtents: extents,
            });
          }}
          style={getSliderStyle(extents)}
        >
          <div
            className="handle handle-left"
            onMouseDown={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMouse({
                type: 'dragHandle',
                side: 'left',
                x: e.clientX,
                initialX: e.clientX,
                initialValue: extents?.min ?? minYear,
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
              setMouse({
                type: 'dragHandle',
                side: 'right',
                x: e.clientX,
                initialX: e.clientX,
                initialValue: extents?.max ?? maxYear,
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
