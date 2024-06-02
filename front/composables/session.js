/**
 * kintoneでのアクセス
 */
import crypto from 'crypto-js'
export function session() {
  /**
   * 取得
   * @returns 
   */
  const getObj = () => {
    if (window.sessionStorage.getItem('flyhalf_session') == null) {
      return null
    }
    const decrypted = crypto.AES.decrypt(window.sessionStorage.getItem('flyhalf_session'), 'flyhalf')
    return JSON.parse(decrypted.toString(crypto.enc.Utf8))
  };
  /**
   * セット
   * @param {*} flyhalf_session 
   */
  const setObj = (flyhalf_session) => {
    let base64 = JSON.stringify(flyhalf_session)
    window.sessionStorage.setItem('flyhalf_session', crypto.AES.encrypt(base64, 'flyhalf').toString())
  };
  /**
   * base64で取得
   * @returns 
   */
  const getBase64 = () => {
    if (window.sessionStorage.getItem('flyhalf_session') == null) {
      return null
    }
    return window.sessionStorage.getItem('flyhalf_session')
  };
  const remove = () => {
    window.sessionStorage.removeItem('flyhalf_session')
  };
  return {
    getObj,
    setObj,
    getBase64,
    remove,
  };
}
