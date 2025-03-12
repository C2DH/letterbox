import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/index.scss';

import { Error } from './components/error';
import { ApolloProvider } from './core/graphql';
import { CompanyView } from './views/CompanyView';
import { HomeView } from './views/HomeView';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider>
          <ModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/company/:id" element={<CompanyView />} />
              </Routes>
            </BrowserRouter>
          </ModalProvider>
        </NotificationProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
