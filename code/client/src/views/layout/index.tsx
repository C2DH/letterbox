import { LoaderFill } from '@ouestware/loaders';
import { FC, PropsWithChildren } from 'react';

import { Error } from '../../components/error';
import { Header } from './Header';

interface LayoutProps {
  loading?: boolean;
  error?: unknown;
}
export const Layout: FC<PropsWithChildren<LayoutProps>> = ({ children, loading, error }) => {
  return (
    <>
      <Header className="container" />
      <main className="container">
        {error ? <Error error={error} /> : children}
        {loading && <LoaderFill />}
      </main>
    </>
  );
};
