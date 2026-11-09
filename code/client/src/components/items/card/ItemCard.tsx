import { FC, ReactNode } from 'react';

import { ITEM_TYPE_LABELS, ItemType } from '../../../core/consts';
import { useEditionContext } from '../../../core/edition';
import {
  AddressInlineFragment,
  CompanyInlineFragment,
  CountryInlineFragment,
  MessageInlineFragment,
  NodeItem,
  PersonInlineFragment,
} from '../../../core/graphql';
import { getItemName } from '../../../utils/data';
import { InCartButton } from '../../edition/InCartButton';
import { EditionActionsTooltip } from '../../edition/tooltips';
import { AddressCard } from './AddressCard';
import { CompanyCard } from './CompanyCard';
import { CountryCard } from './CountryCard';
import { MessageCard } from './MessageCard';
import { PersonCard } from './PersonCard';

export const ItemCard: FC<{
  itemType: ItemType;
  data: NodeItem;
  from?: { type: ItemType; id: string };
}> = ({ itemType, data, from }) => {
  const { enabled } = useEditionContext();

  if (data.__typename !== ITEM_TYPE_LABELS[itemType])
    throw new Error(
      `NodeItem __typename "${data.__typename}" should match page item type "${itemType}"`,
    );

  let content: ReactNode = null;
  switch (itemType) {
    case 'address':
      content = <AddressCard data={data as AddressInlineFragment} from={from} />;
      break;
    case 'company':
      content = <CompanyCard data={data as CompanyInlineFragment} from={from} />;
      break;
    case 'country':
      content = <CountryCard data={data as CountryInlineFragment} from={from} />;
      break;
    case 'person':
      content = <PersonCard data={data as PersonInlineFragment} from={from} />;
      break;
    case 'message':
      content = <MessageCard data={data as MessageInlineFragment} />;
      break;
  }

  return content ? (
    <article className="card">
      <div className="card-body">
        {/* Edition UI for non-message items */}
        {enabled && itemType !== 'message' && 'name' in data && (
          <div className="d-flex align-items-center justify-content-end mb-2 w-100 gap-1">
            {/* cart action */}
            <InCartButton label={getItemName(data)} type={itemType} id={data.id} />
            {/* Edition actions */}
            <EditionActionsTooltip
              itemType={itemType}
              id={data.id}
              label={getItemName(data)}
              fromMessageId={from && from.type === 'message' ? from.id : undefined}
            />
          </div>
        )}

        {/* Actual item data display */}
        {content}
      </div>
    </article>
  ) : null;
};
