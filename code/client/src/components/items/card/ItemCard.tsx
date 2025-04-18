import { FC, ReactNode } from 'react';

import { ITEM_TYPE_LABELS, ItemType } from '../../../core/consts.tsx';
import { useEditionContext } from '../../../core/edition.ts';
import {
  AddressInlineFragment,
  CompanyInlineFragment,
  CountryInlineFragment,
  MessageInlineFragment,
  NodeItem,
  PersonInlineFragment,
} from '../../../core/graphql';
import { getItemName } from '../../../utils/data.ts';
import { EditionActionsTooltip, QuickSwapTypeTooltip } from '../../edition/tooltips.tsx';
import { AddressCard } from './AddressCard.tsx';
import { CompanyCard } from './CompanyCard.tsx';
import { CountryCard } from './CountryCard.tsx';
import { MessageCard } from './MessageCard.tsx';
import { PersonCard } from './PersonCard.tsx';

export const ItemCard: FC<{ itemType: ItemType; data: NodeItem }> = ({ itemType, data }) => {
  const { enabled } = useEditionContext();

  if (data.__typename !== ITEM_TYPE_LABELS[itemType])
    throw new Error(
      `NodeItem __typename "${data.__typename}" should match page item type "${itemType}"`,
    );

  let content: ReactNode = null;
  switch (itemType) {
    case 'address':
      content = <AddressCard data={data as AddressInlineFragment} />;
      break;
    case 'company':
      content = <CompanyCard data={data as CompanyInlineFragment} />;
      break;
    case 'country':
      content = <CountryCard data={data as CountryInlineFragment} />;
      break;
    case 'people':
      content = <PersonCard data={data as PersonInlineFragment} />;
      break;
    case 'message':
      content = <MessageCard data={data as MessageInlineFragment} />;
      break;
  }

  return content ? (
    <article className="card">
      <div className="card-body">
        {/* Edition UI for non-message items */}
        {enabled && itemType !== 'message' && (
          <div className="d-flex flex-row-reverse align-items-center justify-content-between mb-2">
            {/* Edition actions */}
            <EditionActionsTooltip itemType={itemType} id={data.id} label={getItemName(data)} />

            {/* Quick-swap type */}
            <QuickSwapTypeTooltip itemType={itemType} id={data.id} />
          </div>
        )}

        {/* Actual item data display */}
        {content}
      </div>
    </article>
  ) : null;
};
