const request = require(`request`)
const crypto = require(`crypto-js`)
const formatKintoneObject = (results) => {
  let format = []
  for (let data of results) {
    let columns = {}
    for (const key in data) {
      switch (key) {
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
    const base64 = crypto.AES.decrypt(req.headers.auth, 'flyhalf')
    const auth = JSON.parse(base64.toString(crypto.enc.Utf8))
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

  /**
   * kintone
   * ユーザー取得
   */
  app.post(`/kintone/user`, async (req, res, next) => {
    const base64 = crypto.AES.decrypt(req.headers.auth, 'flyhalf')
    const auth = JSON.parse(base64.toString(crypto.enc.Utf8))
    const domain = auth.domain
    const logindId = auth.loginId
    const password = auth.password
    const appId = req.body.appId
    const query = req.body.query

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
          'app': appId,
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

  /**
   * kintone
   * 全データ取得
   */
  app.post(`/kintone/getAll`, async (req, res, next) => {
    const base64 = crypto.AES.decrypt(req.headers.auth, 'flyhalf')
    const auth = JSON.parse(base64.toString(crypto.enc.Utf8))
    const domain = auth.domain
    const logindId = auth.loginId
    const password = auth.password
    const appId = req.body.appId
    const query = req.body.query
    let limit = 500
    list = []
    
    let func = (res, offset, list) => {
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
            'query': `${query} limit ${limit} offset ${(offset * limit)}`,
            'app': appId,
          }
        }, (err, req, data) => {
          list = list.concat(data.records)
          if (data.records.length != limit || offset > 20) {
            res.json(list)
            res.end()
          } else {
            func(res, offset + 1, list)
          }
        }
      )
    }
    func(res, 0, list)
  })
}
module.exports = {
  expressKintone
}