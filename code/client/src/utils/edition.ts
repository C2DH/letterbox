import { isArray, isPlainObject, mapValues, pickBy, sumBy, values } from 'lodash';

import { ITEM_TYPES_SET } from '../core/consts.tsx';
import {
  DEFAULT_EDITION_DATA,
  EditionContextType,
  EditionDataType,
  EditionItem,
} from '../core/edition.ts';

const EDITION_STATE_KEY = 'edition-state';

export function loadEditionState(): EditionDataType {
  const val = sessionStorage.getItem(EDITION_STATE_KEY);
  if (!val) return DEFAULT_EDITION_DATA;

  try {
    const parsed = JSON.parse(val);
    return {
      enabled: !!parsed.enabled,
      cart: pickBy(
        mapValues(parsed.cart, (items) =>
          isArray(items)
            ? items.filter(
                (item) =>
                  isPlainObject(item) &&
                  typeof item.id === 'string' &&
                  typeof item.label === 'string',
              )
            : [],
        ),
        (items, type) => ITEM_TYPES_SET.has(type) && !!items.length,
      ),
    };
  } catch (error) {
    console.error(error);
    return DEFAULT_EDITION_DATA;
  }
}
export function saveEditionState(editionState: EditionDataType) {
  sessionStorage.setItem(EDITION_STATE_KEY, JSON.stringify(editionState));
}

export function getCartSize(cart: EditionContextType['cart']): number {
  if (cart === undefined) return 0;

  return sumBy(values(cart), (arr: unknown[]) => arr.length);
}

export function isInCart(
  cart: EditionContextType['cart'],
  { type, id }: Omit<EditionItem, 'label'>,
): boolean {
  return !!cart[type]?.find((item) => item.id === id);
}
