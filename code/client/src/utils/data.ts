import type { ItemType } from '../core/consts';
import {
  MessageInlineFragment,
  NodeItem,
  type Address,
  type Company,
  type Country,
  type Message,
  type Person,
} from '../core/graphql';

export function getMessageName(data: MessageInlineFragment): string {
  return `${data.year}, ${data.companies?.map((company) => company.name).join(', ')}`;
}

export function getItemName(data: NodeItem): string {
  switch (data.__typename) {
    case 'Message':
      return getMessageName(data);
    case 'Person':
    case 'Address':
    case 'Company':
    case 'Country':
      return data.name;
    default:
      throw new Error(`Unrecognized data __typename ${data.__typename}`);
  }
}

export const ITEM_CSV_FIELDS_BY_TYPE: Record<ItemType, Array<string>> = {
  message: ['id', 'year', 'filename', 'pageNumber', 'tags', 'verified', 'message'] as Array<
    keyof Message
  >,
  company: ['id', 'name', 'tags', 'verified'] as Array<keyof Company>,
  person: ['id', 'name', 'tags', 'verified'] as Array<keyof Person>,
  address: ['id', 'name', 'tags', 'verified'] as Array<keyof Address>,
  country: ['id', 'name', 'tags', 'verified'] as Array<keyof Country>,
};
