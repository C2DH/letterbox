import { type FC } from 'react';
import { BsFlag } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import type { CountryInlineFragment } from '../../core/graphql';
import { ItemCounts } from './ItemCount';

type CountryCardProps = { data: CountryInlineFragment };
export const CountryCard: FC<CountryCardProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        {/* Title */}
        <BsFlag />
        <h5 className="card-title">
          <Link title={`Link to country page "${data.name}"`} to={`/country/${data.id}`}>
            {data.name}
          </Link>
        </h5>
        {/* Count */}
        <ItemCounts data={data} />
      </div>
    </div>
  );
};
