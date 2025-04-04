import { ApolloProvider as AP, ApolloClient, InMemoryCache } from '@apollo/client';
import { useMemo, type FC, type PropsWithChildren } from 'react';

/**
 * Build an instance of the apollo client.
 */
function getApolloCLient() {
  const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
  });
  return client;
}

/**
 * Apollo  client provider.
 */
export const ApolloProvider: FC<PropsWithChildren> = ({ children }) => {
  const apolloClient = useMemo(() => getApolloCLient(), []);
  return <AP client={apolloClient}>{children}</AP>;
};
