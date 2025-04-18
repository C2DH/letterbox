import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import { cloneDeep } from 'lodash';
import { FC, useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Error } from '../components/error';
import { EditionContext, EditionDataType, EditionItem } from '../core/edition.ts';
import { ApolloProvider } from '../core/graphql';
import { loadEditionState, saveEditionState } from '../utils/edition.ts';
import { Explore } from './Explore.tsx';
import { ItemView } from './ItemView.tsx';

export const Root: FC = () => {
  const [editionState, setEditionState] = useState<EditionDataType>(loadEditionState());

  const toggleEdition = useCallback(
    (value?: boolean) =>
      setEditionState((state) => ({
        ...state,
        enabled: typeof value === 'boolean' ? value : !state.enabled,
      })),
    [],
  );
  const addToCart = useCallback(
    ({ type, ...item }: EditionItem) =>
      setEditionState((state) => {
        const cart = cloneDeep(state.cart);
        cart[type] = (cart[type] || []).filter(({ id }) => id !== item.id);
        cart[type]!.push(item);
        return {
          ...state,
          cart,
        };
      }),
    [],
  );
  const removeFromCart = useCallback(
    ({ type, id }: Omit<EditionItem, 'label'>) =>
      setEditionState((state) => {
        const cart = cloneDeep(state.cart);
        cart[type] = (cart[type] || []).filter((item) => id !== item.id);
        return {
          ...state,
          cart,
        };
      }),
    [],
  );

  useEffect(() => {
    console.log('SAVING', editionState);
    saveEditionState(editionState);
  }, [editionState]);

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider>
          <ModalProvider>
            <EditionContext.Provider
              value={{ ...editionState, toggle: toggleEdition, addToCart, removeFromCart }}
            >
              <BrowserRouter>
                <Routes>
                  <Route path="/explore/:type" element={<Explore />} />
                  <Route path="/:type/:id" element={<ItemView />} />
                  <Route path="/" element={<Navigate to="/explore/company" replace />} />
                </Routes>
              </BrowserRouter>
            </EditionContext.Provider>
          </ModalProvider>
        </NotificationProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
