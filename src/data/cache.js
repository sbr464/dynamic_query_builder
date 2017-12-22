import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

/*****
* Define custom cache config
* https://github.com/apollographql/apollo-client/blob/master/Upgrade.md#apollo-cache-inmemory
*****/

const cache = new InMemoryCache({
  // fragmentMatcher: // matcher,
  // dataIdFromObject: // custom function,
  // cacheResolvers: // cache resolvers
  addTypename: true
})


/**
 * Client side cache persistence
 * https://github.com/apollographql/apollo-cache-persist
 */
persistCache({
  cache,
  storage: window.localStorage,
  key: 'reactual_persist',
  maxSize: 31457280,
  debug: false,
  // debug: !isProduction,
})

export default cache
