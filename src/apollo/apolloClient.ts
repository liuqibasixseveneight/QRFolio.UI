import { ApolloClient, InMemoryCache } from '@apollo/client';

import { APOLLO_CLIENT_URL } from '@/config';

const apolloClient = new ApolloClient({
  uri: APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
});

export { apolloClient };
