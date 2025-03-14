import { type FC } from 'react';
import { BsPerson } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { DataItemType, type PersonInlineFragment } from '../../../core/graphql';
import { ItemActionMenu } from '../actions/ItemActions';
import { ItemCounts } from '../ItemCount';

type PersonCardProps = { data: PersonInlineFragment };
export const PersonCard: FC<PersonCardProps> = ({ data }) => {
  return (
    <div className="card">
      {/* Action menu */}
      <ItemActionMenu
        type={DataItemType.Person}
        id={data.id}
        name={data.name}
        className="position-absolute top-0 end-0"
      />
      <div className="card-body">
        {/* Title */}
        <BsPerson />
        <h5 className="card-title">
          <Link title={`Link to person page "${data.name}"`} to={`/person/${data.id}`}>
            {data.name}
          </Link>
        </h5>
        {/* Count */}
        <ItemCounts data={data} />
      </div>
    </div>
  );
};
