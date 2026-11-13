import { range } from 'lodash';
import { FC, useCallback } from 'react';
import { RiDownloadLine } from 'react-icons/ri';
import streamSaver from 'streamsaver';

import config from '../../config';
import { ITEM_TYPE_LABELS_PLURAL } from '../../core/consts';
import { DataItemType } from '../../core/graphql';
import { useTimelineData } from '../../hooks/useTimelineData';
import { escapeToCSVValue } from '../../utils/csv';
import { Timeline } from './Timeline';

const { minYear, maxYear } = config;

export const TimelineHeader: FC<{ itemType: DataItemType }> = ({ itemType }) => {
  const { data, loading } = useTimelineData(itemType);
  const label = ITEM_TYPE_LABELS_PLURAL[itemType];

  const download = useCallback(() => {
    if (!data) return;

    const encoder = new TextEncoder();
    const fileStream = streamSaver.createWriteStream(`${label.toLowerCase()}-by-year.csv`);
    const writer = fileStream.getWriter();

    writer.write(encoder.encode(['Year', `${label} count`].map((v) => escapeToCSVValue(v)).join(',') + '\n'));
    range(minYear, maxYear + 1).forEach((year) => {
      writer.write(encoder.encode(`${year},${data.counts[year] || 0}\n`));
    });
    writer.close();
  }, [data, label]);

  return (
    <section className="explore-header d-flex flex-row align-items-end mb-4 pb-1">
      <div
        className="h-100 flex-grow-1"
        style={{
          borderBottom: 'var(--bs-border-width) solid var(--bs-border-color-translucent)',
        }}
      >
        <Timeline itemType={itemType} timelineData={data} loading={loading} />
      </div>
      <div className="ps-2">
        <button
          type="button"
          className="btn btn-outline-dark btn-ico p-2"
          title={
            itemType === DataItemType.Message
              ? `Download number of ${label.toLowerCase()} by year`
              : `Download number of ${label.toLowerCase()} by year (an item can be counted in several years)`
          }
          disabled={!data}
          onClick={download}
        >
          <RiDownloadLine />
        </button>
      </div>
    </section>
  );
};
