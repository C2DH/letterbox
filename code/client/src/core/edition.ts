import { noop } from 'lodash';
import { createContext, useContext } from 'react';

import { ItemType } from './consts.tsx';

export type EditionItem = { id: string; label: string; type: ItemType };

export type EditionContextType = {
  enabled: boolean;
  cart: Partial<Record<ItemType, Omit<EditionItem, 'type'>[]>>;
  toggle: (value?: boolean) => void;
  addToCart: (item: EditionItem) => void;
  removeFromCart: (item: Omit<EditionItem, 'label'>) => void;
};

export type EditionDataType = Omit<EditionContextType, 'toggle' | 'addToCart' | 'removeFromCart'>;

export const DEFAULT_EDITION_DATA: EditionDataType = {
  enabled: false,
  cart: {},
};

export const EditionContext = createContext<EditionContextType>({
  ...DEFAULT_EDITION_DATA,
  toggle: noop,
  addToCart: noop,
  removeFromCart: noop,
});

export const useEditionContext = () => useContext(EditionContext);
