const express = require(`express`)
const app = express()
const cors = require(`cors`)
const request = require(`request`)
app.listen(8080, () => {
  console.log("test")
})
app.use(express.static(`./front`));
app.use(express.urlencoded({ extended: true, limit: `1000mb` }))
app.use(express.json({ extended: true, limit: `1000mb` }))
app.use(cors())
/**
 * kintone
 * 全データ取得
 */
app.post(`/kintone/getAll`, async (req, res, next) => {
  const domain = req.body.domain
  const appId = req.body.appId
  const logindId = req.body.loginId
  const password = req.body.password
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
/**/
