import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/index.scss';

import { Error } from './components/error';
import { ApolloProvider } from './core/graphql';
import { AddressView } from './views/AddressView';
import { CompanySearchView } from './views/CompanySearchView';
import { CompanyView } from './views/CompanyView';
import { CountryView } from './views/CountryView';
import { HomeView } from './views/HomeView';
import { MessageView } from './views/MessageView';
import { PersonView } from './views/PersonView';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider>
          <ModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomeView />} />
                <Route path="/address/:id" element={<AddressView />} />
                <Route path="/company/" element={<CompanySearchView />} />
                <Route path="/company/:id" element={<CompanyView />} />
                <Route path="/country/:id" element={<CountryView />} />
                <Route path="/message/:id" element={<MessageView />} />
                <Route path="/person/:id" element={<PersonView />} />
              </Routes>
            </BrowserRouter>
          </ModalProvider>
        </NotificationProvider>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
