import { MessageInlineFragment } from '../core/graphql';

export function getMessageName(data: MessageInlineFragment): string {
  return `${data.year}, ${data.companies.map((company) => company.name).join(', ')}`;
}
