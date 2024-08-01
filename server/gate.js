/******************************
 * フロントからのリクエストを受取、
 * アクセス制御したのちにDBタイプ別に制御を分配
 */
const crypto = require(`crypto-js`)
const NodeRSA = require('node-rsa')

/**
 * responseをフロントのsshキーで暗号化
 * @param {*} body 
 * @param {*} res 
 * @param {*} data 
 */
const encodeResponse = (body, res, data,publickey) => {
  const cryptKeyOrigin="hontoharansutoka"
  //暗号キーを公開鍵で暗号化
  const rsa = NodeRSA({ b: 512 })
  rsa.importKey(publickey, 'public')
  rsa.setOptions({ encryptionScheme: 'pkcs1' })
  const cryptKey = rsa.encrypt(cryptKeyOrigin, 'base64')
  const dataCrypt = crypto.AES.encrypt(JSON.stringify(data),cryptKeyOrigin)
  let resultObj = { status: true, result: dataCrypt.toString(), err: null,cryptkey:cryptKey }
  res.json(resultObj)
  res.end()
}

/**
 * apiの取得
 */
api = (exp) => {
    const key = new NodeRSA({ b: 512 })
    const privateKey = key.exportKey('pkcs1-private-pem');
    const publicKey =key.exportKey('pkcs1-public-pem');
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
    exp.post(`/api`, async (req, res, next) => {
      const header =  req.headers
      const data= req.body
      const encrypteData = data.encrypte
      // 鍵を複号
      const rsa = new NodeRSA({ b: 512 })
      rsa.importKey(privateKey, 'pkcs1-private-pem');
      rsa.setOptions({ encryptionScheme: 'pkcs1' });
      const cryptKeyOrigin = rsa.decrypt(header.cryptkey,'utf8')
      const bytes = crypto.AES.decrypt(encrypteData,cryptKeyOrigin)
      let body = JSON.parse(bytes.toString(crypto.enc.Utf8))
      const localPublic = body.localPublic
      let respData={'calc':0}
      switch(body.tenantMode){
        case 'onpremiss':
          respData.calc+=10
          break
      }
      encodeResponse(body, res, respData,localPublic)
      return
    })
  }
  module.exports = {
    api
  }