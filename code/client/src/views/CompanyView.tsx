import { useQuery } from '@apollo/client';
import { type FC } from 'react';
import { useParams } from 'react-router-dom';

import { getCompanyById } from '../core/graphql';
import { PageLayout } from './layout';

export const CompanyView: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { loading, error, data } = useQuery(getCompanyById, { variables: { id: id || '' } });
  if (error) throw error;

  return (
    <PageLayout loading={loading}>
      <h1>Hello World</h1>
      {data?.companies[0].name}
    </PageLayout>
  );
};
