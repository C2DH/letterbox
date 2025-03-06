import config from './config';

// This interface MUST be compatible with the "Message" defined in code/server/src/graphql/schema.ts
export type DataMessage = {
  fingerprint: string;
  year: number;
  filename: string;
  pageNumber: number;
  message: string;

  raw_company: string;
  raw_company_spare: string;
  raw_address?: string;
  raw_address_spare?: string;
  raw_people?: string[];
  raw_people_abbr?: string[];
  raw_countries?: string[];
  raw_message: string;
};

export type ItemType = 'message' | 'company' | 'person' | 'address' | 'country';
export const itemTypes: ItemType[] = ['message', 'company', 'person', 'address', 'country'];

export type ImportReport = { count: number; errors: string[] };

export const EsIndices: Record<ItemType, string> = {
  message: `${config.elastic.index_prefix}messages`,
  company: `${config.elastic.index_prefix}companies`,
  person: `${config.elastic.index_prefix}people`,
  address: `${config.elastic.index_prefix}addresses`,
  country: `${config.elastic.index_prefix}countries`,
};
