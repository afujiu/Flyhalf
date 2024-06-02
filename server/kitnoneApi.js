const request = require(`request`)

const formatKintoneObject = (results) => {
  let format = []
  for (let data of results) {
    let columns = {}
    for (const key in data) {
      switch(key){
        case '$id':
          columns['id'] = data[key].value
        break
        case '作成日時':
          columns['createDate'] = data[key].value
        break
        case '更新日時':
          columns['updateDate'] = data[key].value
        break
        case '作成者':
          columns['createUser'] = data[key].value
        break
        case '更新者':
          columns['updateUser'] = data[key].value
        break
        
        default:
          columns[key] = data[key].value
        break
      }
    }
    format.push(columns)
  }
  return format
}
/**
 * kintone用のAPI
 */
expressKintone = (app) => {
  /**
   * kintone
   * チームを取得
   */
  app.post(`/kintone/team`, async (req, res, next) => {
    const auth = JSON.parse(atob(req.headers.auth))
    const domain = auth.domain
    const logindId = auth.loginId
    const password = auth.password
    const teamAppId = auth.teamAppId

    let limit = 500
    request(
      {
        url: `https://${domain}.cybozu.com/k/v1/records.json`,
        method: 'GET',
        headers: {
          'Content-type': `application/json`,
          'X-Cybozu-Authorization': Buffer.from(`${logindId}:${password}`).toString('base64'),
        },
        json: true,
        body: {
          'query': `limit ${limit}`,
          'app': teamAppId,
        }
      }, (err, req, data) => {
        if (err == null) {
          if (data['records'] != undefined) {
            res.json({ state: "suc", result: formatKintoneObject(data.records) })
            res.end()
            return
          }
        }
        res.json({ state: "err", result: null })
      }
    )
  })

}
module.exports = {
  expressKintone
}