import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Error } from '../components/error';
import { ApolloProvider } from '../core/graphql';
import { Explore } from './Explore.tsx';
import { ItemView } from './ItemView.tsx';

export const Root: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider>
          <ModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/explore/:type" element={<Explore />} />
                <Route path="/:type/:id" element={<ItemView />} />
                <Route path="/" element={<Navigate to="/explore/company" replace />} />
              </Routes>
            </BrowserRouter>
          </ModalProvider>
        </NotificationProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};
