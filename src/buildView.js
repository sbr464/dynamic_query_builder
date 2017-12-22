import rCall from '../../util/rCall'
import buildViewGql from './buildViewGql'

const buildView = (record_id, collection_id, fieldIds) =>
  new Promise(async(resolve, reject) => {
    try {
      const { res } = await rCall('buildView', record_id, collection_id, fieldIds)

      // Add GraphQL query string to the result
      res.query = buildViewGql(record_id, collection_id, fieldIds, res)

      return resolve(res)

    } catch (e) {
      return reject(e)
    }
  })

export default buildView
