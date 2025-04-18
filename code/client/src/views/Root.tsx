import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import { FC, useCallback, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Error } from '../components/error';
import { EditionContext, EditionContextType } from '../core/edition.ts';
import { ApolloProvider } from '../core/graphql';
import { Explore } from './Explore.tsx';
import { ItemView } from './ItemView.tsx';

export const Root: FC = () => {
  const [editionState, setEditionState] = useState<Omit<EditionContextType, 'toggle'>>({
    enabled: false,
    cart: {},
  });
  const toggleEdition = useCallback(
    (value?: boolean) =>
      setEditionState((state) => ({
        ...state,
        enabled: typeof value === 'boolean' ? value : !state.enabled,
      })),
    [],
  );

  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider>
          <ModalProvider>
            <EditionContext.Provider value={{ ...editionState, toggle: toggleEdition }}>
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
