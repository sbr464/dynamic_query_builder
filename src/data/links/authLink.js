import { ApolloLink } from 'apollo-link'
import getToken from '../../auth/getToken'

/*****
* Auth Middleware
* https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#middleware
*****/

const authLink = new ApolloLink((operation, forward) => {
  const tokenResult = getToken()
  operation.setContext((ctx) => ({
    headers: {
      Authorization: tokenResult || null
    },
    ...ctx
  }))
  // console.log('authLink ran, time (ms)', (performance.now() - operation.getContext().start).toFixed(4))
  return forward(operation)
})

export default authLink
