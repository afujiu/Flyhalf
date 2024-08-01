/******************************
 * フロントからのリクエストを受取、
 * アクセス制御したのちにDBタイプ別に制御を分配
 */
const NodeRSA = require('node-rsa')

/**
 * リクエストを複号
 * @param {*} req 
 * @returns 
 */
const decodeBody = (req) => {
    const body = req.body
    body
    return body
  }

/**
 * responseをフロントのsshキーで暗号化
 * @param {*} body 
 * @param {*} res 
 * @param {*} data 
 */
const encodeResponse = (body, res, data) => {
    let result = { status: true, result: data, err: null }
    const keyPublic = new NodeRSA()
    keyPublic.importKey(body.publicKey, 'public')
    keyPublic.setOptions({ encryptionScheme: 'pkcs1' })
    res.json(keyPublic.encrypt(JSON.stringify(result), 'base64'))
    res.end()
}

/**
 * apiの取得
 */
api = (exp) => {
    const key = new NodeRSA({ b: 512 })
    var privateKey = key.exportKey('private');
    var publicKey = key.exportKey('public');
    /**
     * サーバーの公開鍵を返す
     */
    exp.post(`/publickey`, async (req, res, next) => {
        let result = { status: true, result: {serverPublicKey:publicKey}, err: null }
        res.json(JSON.stringify(result))
        res.end()
        return
      })

    /**
     * テナント作成
     * request
     *  {
     *      key:テナント
     *      name:名前
     *      password:パスワード
     * }
     * return
     *  正常:{status:true,adminKey:管理者キー~~~,err:''}
     *  エラー：{status:false,err:～～}
     */
  }
  module.exports = {
    api
  }