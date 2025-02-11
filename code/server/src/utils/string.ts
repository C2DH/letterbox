import { isNil } from 'lodash';

export function checkNilOREmptyString(value: unknown | undefined): boolean {
  if (isNil(value)) return true;
  if (typeof value === 'string' || value instanceof String) {
    return value.trim() === '';
  }
  return false;
}
