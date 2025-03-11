import config from './config';

// This interface MUST be compatible with the "Message" defined in code/server/src/graphql/schema.ts
export type DataMessage<T = string> = {
  id: string;
  year: number;
  filename: string;
  pageNumber: number;
  message: string;

  raw_company: T;
  raw_address?: T;
  raw_people?: T[];
  raw_countries?: T[];
  raw_message: string;
};

export type ItemType = 'message' | 'company' | 'person' | 'address' | 'country';
export const itemTypes: ItemType[] = ['message', 'company', 'person', 'address', 'country'];

export type ImportReport = { count: number; errors: string[] };
export type NodeItemDefinition = { type: ItemType; id: string };

/**
 * List of the ES indices.
 */
export const EsIndices: Record<ItemType, string> = {
  message: `${config.elastic.index_prefix}messages`,
  company: `${config.elastic.index_prefix}companies`,
  person: `${config.elastic.index_prefix}people`,
  address: `${config.elastic.index_prefix}addresses`,
  country: `${config.elastic.index_prefix}countries`,
};

/**
 * Labels of Neo4j nodes.
 */
export const Neo4jLabels: Record<ItemType, string> = {
  message: `Message`,
  company: `Company`,
  person: `Person`,
  address: `Address`,
  country: `Country`,
};
