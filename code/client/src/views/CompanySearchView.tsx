import { useQuery } from '@apollo/client';
import { Loader } from '@ouestware/loaders';
import { useNotifications } from '@ouestware/notifications';
import { FC, useEffect } from 'react';

import { TopValues } from '../components/TopValues';
import { aggregateCompanies } from '../core/graphql';
import { Layout } from './layout';

export const CompanySearchView: FC = () => {
  const {
    loading,
    error,
    data: topData,
  } = useQuery(aggregateCompanies, { fetchPolicy: 'no-cache' });
  const { notify } = useNotifications();

  useEffect(() => {
    if (error) notify({ type: 'error', text: error?.message });
  }, [error, notify]);

  return (
    <Layout>
      <h1>Explore companies</h1>
      {loading && <Loader />}
      {!loading && topData && (
        <div className="row">
          <TopValues
            key="address"
            className="col-4"
            title="Addresses"
            aggregates={topData.addresses}
            linkPrefix="/address/"
            countUnit="companies"
          />
          <TopValues
            key="people"
            className="col-4"
            title="People"
            aggregates={topData.people}
            linkPrefix="/person/"
            countUnit="companies"
          />
          <TopValues
            key="countries"
            className="col-4"
            title="Countries"
            aggregates={topData.countries}
            linkPrefix="/country/"
            countUnit="companies"
          />
        </div>
      )}
    </Layout>
  );
};
