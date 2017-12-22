import rCall from '../../util/rCall'

const getFieldList = (collection_id) =>
  new Promise(async(resolve, reject) => {
    try {
      const { res } = await rCall('getFieldList', collection_id)
      return resolve(res)
    } catch (e) {
      return reject(e)
    }
  })

export default getFieldList
