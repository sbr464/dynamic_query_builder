import { ApolloLink } from 'apollo-link'

const metaLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    start: performance.now()
  })
  return forward(operation)
})

export default metaLink
