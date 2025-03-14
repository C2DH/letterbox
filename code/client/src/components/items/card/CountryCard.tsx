import { type FC } from 'react';
import { BsFlag } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { DataItemType, type CountryInlineFragment } from '../../../core/graphql';
import { ItemActionMenu } from '../actions/ItemActions';
import { ItemCounts } from '../ItemCount';

type CountryCardProps = { data: CountryInlineFragment };
export const CountryCard: FC<CountryCardProps> = ({ data }) => {
  return (
    <div className="card">
      {/* Action menu */}
      <ItemActionMenu
        type={DataItemType.Country}
        id={data.id}
        name={data.name}
        className="position-absolute top-0 end-0"
      />
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
