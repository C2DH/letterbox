import { noop } from 'lodash';
import { createContext, useContext } from 'react';

import { ItemType } from './consts.tsx';

export type EditionContextType = {
  enabled: boolean;
  cart: Partial<Record<ItemType, { id: string; label: string }[]>>;
  toggle: (value?: boolean) => void;
};

export const EditionContext = createContext<EditionContextType>({
  enabled: false,
  cart: {},
  toggle: noop,
});

export const useEditionContext = () => useContext(EditionContext);
