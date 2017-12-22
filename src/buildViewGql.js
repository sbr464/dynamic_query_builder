import { GraphQlQuery } from './util/graphql-query-builder'

/**
 * GraphQL query for a single record id,
 * using a provided collection id and list of field ids.
 *
 * @example
 * buildViewGql(view, dict)
 *
 */
const buildViewGql = (record_id, collection_id, fieldIds, { r_collections, r_fields }) => {

  const typeName = r_collections[collection_id].gql.typeName

  const query = new GraphQlQuery(typeName, {_id: record_id})

  // Get the field names for each field._id in the array for the view
  const fieldNames = fieldIds.map(id => r_fields[id].name)

  query.select(...fieldNames)

  return `query ${query}`

}

export default buildViewGql
