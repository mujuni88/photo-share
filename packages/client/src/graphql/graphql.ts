import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

export const APP_KEY = 'photo-share';

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: localStorage.getItem('token') || null,
    },
  });

  return forward(operation);
});

const cache = new InMemoryCache();
persistCache({
  cache,
  storage: window.localStorage as PersistentStorage<
    PersistedData<NormalizedCacheObject>
  >,
  key: APP_KEY,
  debug: true,
});

if (localStorage.getItem(APP_KEY)) {
  try {
    const cacheData = JSON.parse(localStorage.getItem(APP_KEY) || '');
    console.log('CACHE DATA', cacheData);
    cache.restore(cacheData);
  } catch (e) {
    console.error(e);
  }
}

export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
