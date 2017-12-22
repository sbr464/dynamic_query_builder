import { ApolloLink } from 'apollo-link'
import metaLink from './metaLink'
import authLink from './authLink'
import httpLink from './httpLink'
import persistedQueryLink from './persistedQueryLink.js'
import errorLink from './errorLink'

/*****
* Create chained link
*****/

const chainedLink = ApolloLink.from([
  metaLink,
  errorLink,
  persistedQueryLink,
  authLink,
  httpLink
])

export default chainedLink
