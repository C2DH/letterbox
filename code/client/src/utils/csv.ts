import { isNil } from 'lodash';

export function escapeToCSVValue(value: unknown, surroundWithQuotes = true): string {
  const content = Array.isArray(value)
    ? `${value.map((v) => escapeToCSVValue(v, false)).join('|')}`
    : `${value}`.replace(/"/g, '""');
  if (surroundWithQuotes) return `"${content}"`;
  return content;
}

/**
 * Converts an object to a CSV string.
 * @param data - The NodeItem to convert.
 * @param hearder - The header row for the CSV (not used in this function).
 * @returns A CSV string representation of the NodeItem.
 * @throws Error if the type is not supported for CSV export.
 */
export function objectToCSV(data: unknown, hearders: string[]): string {
  if (typeof data !== 'object' || data === null) throw new Error('Data must be a non-null object');
  return hearders
    .map((field) => {
      const value = field in data ? (data as Record<string, unknown>)[field] : undefined;
      return isNil(value) ? '' : escapeToCSVValue(value);
    })
    .join(',');
}
