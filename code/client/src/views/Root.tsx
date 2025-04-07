import { ModalProvider } from '@ouestware/modals';
import { NotificationProvider } from '@ouestware/notifications';
import { FC } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Error } from '../components/error';
import { ApolloProvider } from '../core/graphql';
import { AddressView } from './AddressView.tsx';
import { CompanyExploreView } from './CompanyExploreView.tsx';
import { CompanyView } from './CompanyView.tsx';
import { CountryView } from './CountryView.tsx';
import { Explore } from './Explore.tsx';
import { MessageView } from './MessageView.tsx';
import { PersonView } from './PersonView.tsx';

export const Root: FC = () => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <ApolloProvider>
        <NotificationProvider>
          <ModalProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/explore/:type" element={<Explore />} />
                <Route path="/address/:id" element={<AddressView />} />
                <Route path="/company/" element={<CompanyExploreView />} />
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
  );
};
