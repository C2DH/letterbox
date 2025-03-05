export type ItemType = 'message' | 'company' | 'person' | 'address' | 'country';
export const itemTypes: ItemType[] = ['message', 'company', 'person', 'address', 'country'];

export type ImportReport = { count: number; errors: string[] };
