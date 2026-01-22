import { useStorage } from '@ouestware/hooks';
import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import { cloneDeep } from 'lodash';
import { FC, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BsXOctagonFill } from 'react-icons/bs';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Error } from '../components/error';
import { DEFAULT_EDITION_DATA, EditionContext, EditionItem } from '../core/edition.ts';
import { ApolloProvider } from '../core/graphql';
import { deserializeEditionState, EDITION_STATE_KEY } from '../utils/edition.ts';
import { Explore } from './Explore.tsx';
import { ItemView } from './ItemView.tsx';

export const Root: FC = () => {
  const [editionState, setEditionState] = useStorage('localStorage', EDITION_STATE_KEY, {
    defaultValue: DEFAULT_EDITION_DATA,
    deserialize: deserializeEditionState,
  });

  const toggleEdition = useCallback(
    (value?: boolean) =>
      setEditionState((state) => ({
        ...(state || DEFAULT_EDITION_DATA),
        enabled: typeof value === 'boolean' ? value : !state.enabled,
      })),
    [setEditionState],
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
    [setEditionState],
  );
  const removeFromCart = useCallback(
    ({ type, id }: Pick<EditionItem, 'type' | 'id'>) =>
      setEditionState((state) => {
        const cart = cloneDeep(state.cart);
        cart[type] = (cart[type] || []).filter((item) => id !== item.id);
        return {
          ...state,
          cart,
        };
      }),
    [setEditionState],
  );

  const nofiticationIcons = useMemo(
    () => ({
      error: <BsXOctagonFill className="text-danger" />,
      warning: <FaExclamationTriangle className="text-warning" />,
      success: <FaCheckCircle className="text-success" />,
      info: <FaInfoCircle className="text-info" />,
    }),
    [],
  );

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider icons={nofiticationIcons}>
          <EditionContext.Provider
            value={{ ...editionState, toggle: toggleEdition, addToCart, removeFromCart }}
          >
            <BrowserRouter>
              <ModalProvider>
                <Routes>
                  <Route path="/explore/:type" element={<Explore />} />
                  <Route path="/:type/:id" element={<ItemView />} />
                  <Route path="/" element={<Navigate to="/explore/company" replace />} />
                </Routes>
              </ModalProvider>
            </BrowserRouter>
          </EditionContext.Provider>
        </NotificationProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
