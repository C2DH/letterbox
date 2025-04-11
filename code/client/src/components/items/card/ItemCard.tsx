import { FC } from 'react';

import { ITEM_TYPE_LABELS, ItemType } from '../../../core/consts.tsx';
import {
  AddressInlineFragment,
  CompanyInlineFragment,
  CountryInlineFragment,
  MessageInlineFragment,
  NodeItem,
  PersonInlineFragment,
} from '../../../core/graphql';
import { AddressCard } from './AddressCard.tsx';
import { CompanyCard } from './CompanyCard.tsx';
import { CountryCard } from './CountryCard.tsx';
import { MessageCard } from './MessageCard.tsx';
import { PersonCard } from './PersonCard.tsx';

export const ItemCard: FC<{ itemType: ItemType; data: NodeItem }> = ({ itemType, data }) => {
  if (data.__typename !== ITEM_TYPE_LABELS[itemType])
    throw new Error(
      `NodeItem __typename "${data.__typename}" should match page item type "${itemType}"`,
    );

  switch (itemType) {
    case 'address':
      return <AddressCard data={data as AddressInlineFragment} />;
    case 'company':
      return <CompanyCard data={data as CompanyInlineFragment} />;
    case 'country':
      return <CountryCard data={data as CountryInlineFragment} />;
    case 'people':
      return <PersonCard data={data as PersonInlineFragment} />;
    case 'message':
      return <MessageCard data={data as MessageInlineFragment} />;
  }
};
