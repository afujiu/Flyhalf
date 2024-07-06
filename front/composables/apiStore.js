/**
 * 認証API機能
 */
import crypto from 'crypto-js'
import JSEncrypt from 'jsencrypt'
export const apiStore = () => {
    //#region session****************************************************
    /** session取得
     * 
     * @returns 
     */
    const getSession = () => {
        if (window.sessionStorage.getItem('flyhalf_session') == null) {
            return null
        }
        const decrypted = crypto.AES.decrypt(window.sessionStorage.getItem('flyhalf_session'), 'flyhalf')
        return JSON.parse(decrypted.toString(crypto.enc.Utf8))
    }
    /** sessionセット
     * 
     * @param {*} flyhalf_session 
     */
    const setSession = (flyhalf_session) => {
        let base64 = JSON.stringify(flyhalf_session)
        window.sessionStorage.setItem('flyhalf_session', crypto.AES.encrypt(base64, 'flyhalf').toString())
    }
    /** session暗号化データを取得
     * 
     * @returns 
     */
    const getSessionCypt = () => {
        if (window.sessionStorage.getItem('flyhalf_session') == null) {
            return null
        }
        return window.sessionStorage.getItem('flyhalf_session')
    }
    /** session削除
     * 
     */
    const removeSession = () => {
        window.sessionStorage.removeItem('flyhalf_session')
    }
    // #endregion
    /*******************************************************************/

    //#region ログイン****************************************************
    /** ログイン
     * 
     * @param {*} domain [type-domain-number]
     * @param {*} loginId 
     * @param {*} password 
     * @returns 
     */
    const login = async (domain, loginId, password) => {
        return new Promise(resolve => {
            const crypt = new JSEncrypt({ default_key_size: 512 })
            const publicKey = crypt.getPublicKey()
            const privateKey = crypt.getPrivateKey()
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ publicKey: publicKey, b: 2 })
            }).then(response => response.json())
                .then(data => {
                    crypt.setPrivateKey(privateKey)
                    let decypt = crypt.decrypt(data)
                    decypt = JSON.parse(decypt)
                    resolve(decypt)
                })
                .catch(error => {
                    resolve({ status: false, data: null, err: error })
                })
        })
    }
    /** チーム選択
     * 
     * @param {*} team
     * @returns 
     */
    const selectTeam = async (team) => {
        let result = true
        table.value = {}
        return result
    }
    /** 認証チェック
     * 
     * @returns 
     */
    const checkAuth = async () => {
        let result = true
        return result
    }
    /** ログアウト
     * 
     */
    const logout = async () => {
        removeSession()
        navigateTo(`/`)
    }
    /** ユーザー情報取得
     */
    const getUser = async () => {
    }
    //#endregion
    /*******************************************************************/

    //#region API***************************************************
    /** Post送信
     * @param {*} url 
     * @param {*} postData 
     */
    const post = (url, postData) => {

    }
    /**
     * 
     */
    const generateKey = () => {
        const key = new NodeRSA({ b: 512 })
        return key
    }

    //#endregion
    /*******************************************************************/

    return {
        login,
        selectTeam,
        checkAuth,
        logout,
        getUser,
        post
    }
}
