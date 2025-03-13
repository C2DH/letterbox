import { type FC } from 'react';
import { Link } from 'react-router-dom';

import type { MessageInlineFragment } from '../../core/graphql';
import { Collaspsable } from '../Collapsable';
import { ItemCounts } from './ItemCount';

type MessageCardProps = { data: MessageInlineFragment };
export const MessageCard: FC<MessageCardProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card-body">
        {/* Title */}
        <h5 className="card-title">
          <Link
            title={`Link to message page "${data.year}, ${data.companies.map((company) => company.name).join(', ')}"`}
            to={`/message/${data.id}`}
          >
            {data.year}, {data.companies.map((company) => company.name).join(', ')}
            {data.companiesCount > 3 && ` and ${data.companiesCount - 3} more`}
          </Link>
        </h5>
        {/* Count */}
        <ItemCounts data={data} />
        {/* Message content */}
        <Collaspsable title="Content">
          <div className="card card-body bg-light">{data.message}</div>
        </Collaspsable>
      </div>
    </div>
  );
};
