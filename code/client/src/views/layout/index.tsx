import { FC, PropsWithChildren } from 'react';

import { Header } from './Header';

export const PageLayout: FC<PropsWithChildren<{ loading?: boolean }>> = ({ children, loading }) => {
  return (
    <>
      <Header />
      <main className={'container-fluid'}>{children}</main>
      {loading && <div className="loading-overlay"></div>}
    </>
  );
};
