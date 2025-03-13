import { type FC } from 'react';
import { BsBuildings } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import type { CompanyInlineFragment } from '../../core/graphql';
import { ItemCounts } from './ItemCount';

type CompanyCardProps = { data: CompanyInlineFragment };
export const CompanyCard: FC<CompanyCardProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        {/* Title */}
        <BsBuildings />
        <h5 className="card-title">
          <Link title={`Link to company page "${data.name}"`} to={`/company/${data.id}`}>
            {data.name}
          </Link>
        </h5>
        {/* Count */}
        <ItemCounts data={data} />
      </div>
    </div>
  );
};
