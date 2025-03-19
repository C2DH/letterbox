import { FC } from 'react';
import { Link } from 'react-router-dom';

import { AggregateResults } from '../core/graphql';

export const TopValues: FC<{
  title: string;
  aggregates: AggregateResults;
  linkPrefix: string;
  countUnit: string;
  className?: string;
}> = ({ title, aggregates, linkPrefix, className, countUnit }) => {
  return (
    <div className={className}>
      <h2>
        {title} {aggregates.total}
      </h2>
      <div className="d-flex flex-column">
        {aggregates.values.map((item) => (
          <Link key={`${linkPrefix}/${item.id}`} to={`${linkPrefix}${item.id}`}>
            {item.label}: {item.count} {countUnit}
          </Link>
        ))}
      </div>
    </div>
  );
};
