import { type FC } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { DataItemType, type AddressInlineFragment } from '../../../core/graphql';
import { ItemActionMenu } from '../actions/ItemActions';
import { ItemCounts } from '../ItemCount';

type AddressCardProps = { data: AddressInlineFragment };
export const AddressCard: FC<AddressCardProps> = ({ data }) => {
  return (
    <div className="card">
      {/* Action menu */}
      <ItemActionMenu
        type={DataItemType.Address}
        id={data.id}
        name={data.name}
        className="position-absolute top-0 end-0"
      />
      <div className="card-body">
        {/* Title */}
        <BsGeoAlt />
        <h5 className="card-title">
          <Link title={`Link to address page "${data.name}"`} to={`/address/${data.id}`}>
            {data.name}
          </Link>
        </h5>
        {/* Count */}
        <ItemCounts data={data} />
      </div>
    </div>
  );
};
