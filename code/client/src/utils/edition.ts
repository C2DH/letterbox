import { sumBy, values } from 'lodash';

import { EditionContextType } from '../core/edition.ts';

export function getCartSize(cart: EditionContextType['cart']): number {
  if (cart === undefined) return 0;

  return sumBy(values(cart), (arr: unknown[]) => arr.length);
}
