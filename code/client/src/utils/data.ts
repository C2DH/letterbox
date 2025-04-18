import { MessageInlineFragment, NodeItem } from '../core/graphql';

export function getMessageName(data: MessageInlineFragment): string {
  return `${data.year}, ${data.companies.map((company) => company.name).join(', ')}`;
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
