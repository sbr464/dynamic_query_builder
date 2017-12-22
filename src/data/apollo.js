import ApolloClient from 'apollo-client'
import cache from './cache'
import chainedLink from './links/chainedLink'

/*****
* Create Apollo client
*****/

const client = new ApolloClient({
  link: chainedLink,
  cache: cache.restore(window.__APOLLO_STATE__)
})

/*****
* TODO Potential SSR initial state 
*****/
// const state = client.cache.extract()
// console.log('state after client.cache.extract()', state)

export default client

/*****
* TODO / Review this will have to be updated in react-apollo
* client.initStore = () => {}
*****/
