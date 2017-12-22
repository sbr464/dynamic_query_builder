import { onError } from 'apollo-link-error'

const errorLink = onError(err => {
  console.log('apollo-link-error, err', err)
  // if (err.networkError.statusCode === 401) {
  //   Auth.logout()
  // }
})

export default errorLink
