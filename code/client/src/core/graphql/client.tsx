import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider as AP } from '@apollo/client/react';
import { type FC, type PropsWithChildren, useMemo } from 'react';

/**
 * Build an instance of the apollo client.
 */
function getApolloCLient() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: '/graphql' }),
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
