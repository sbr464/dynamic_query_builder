import { createHttpLink } from 'apollo-link-http'

const BASE_URI = process.env.REACT_APP_GQL_BASE
const URI = `${BASE_URI}`

/*****
* Options object for HttpLink
* https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#options
  const linkOptions = {
    uri: URI,
    includeExtensions: false,
    fetch: fetch,
    headers: {},
    fetchOptions: {},
    credentials: undefined
  }
*****/

const httpLink = createHttpLink({uri: URI})

export default httpLink
