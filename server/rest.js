const crypto = require(`crypto-js`)
const NodeRSA = require('node-rsa')
/**
 * ヘッダーデコード
 * @param {*} req 
 */
const decodeHeader = (req) => {
  return req.headers
}
/**
 * ボディーデコード
 * @param {*} req 
 */
const decodeBody = (req) => {
  const body = req.body
  return body
}
/**
 * 
 * @param {*} key 暗号化キー
 * @param {*} res 
 * @param {*} data 
 */
const success = (body, res, data) => {
  let result = { status: true, result: data, err: null }
  const keyPublic = new NodeRSA()
  keyPublic.importKey(body.publicKey, 'public')
  keyPublic.setOptions({ encryptionScheme: 'pkcs1' })
  res.json(keyPublic.encrypt(JSON.stringify(result), 'base64'))
  res.end()
}

/**
 * 
 * @param {*} key 暗号化キー
 * @param {*} res 
 * @param {*} err 
 */
const error = (body, res, err) => {
  let result = { status: false, result: data, err: null }
  const keyPublic = new NodeRSA()
  keyPublic.importKey(body.publicKey, 'public')
  keyPublic.setOptions({ encryptionScheme: 'pkcs1' })
  res.json(keyPublic.encrypt(JSON.stringify(result), 'base64'))
  res.end()
}

/**
 * api
 */
api = (app) => {

  /**
   * ログイン
   */
  app.post(`/login`, async (req, res, next) => {
    const header = decodeHeader(req)
    const body = decodeBody(req)
    const data = { one: 'aiueo' }
    success(body, res, data)
    return
  })
}
module.exports = {
  api
}