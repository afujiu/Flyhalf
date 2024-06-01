/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
export function kintone() {
  const flyhalf_session = ref('')
  const teams = ref([])
  const endPoint = ref('http://localhost:8080')
  /**
   * kintoneでのログイン
   * 成功 tableオブジェクト
   * 失敗 null
   * @param {*} domain 
   * @param {*} loginId 
   * @param {*} password 
   * @param {*} teamId 
   * @returns
   */
  const login = async (type, loginId, password, param) => {
    flyhalf_session.value = btoa(JSON.stringify({
      type: type,
      domain: param.domain,
      loginId: loginId,
      password: password,
      teamAppId: param.teamAppId
    }))
    const result = await post('kintone/team', { auth: flyhalf_session.value }, null)
    /**
     * 成功した場合
     */
    if (result.state == 'suc') {
      result.resutl
      setSession(flyhalf_session.value)
      return true
    } else {
      return false
    }
  };
  /**
   * ログアウト
   */
  const logout = () => {
    window.sessionStorage.removeItem('flyhalf_session');
  };
  /**
   * 単一post
   * @param {*} url 
   * @param {*} headers 
   * @param {*} body 
   * @returns 
   */
  const post = async (api, headers, body) => {
    headers['content-Type'] = 'application/json'
    const url = `${endPoint.value}/${api}`
    const data = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body,
    });
    return data
  };

  const getAll = (api, postData = null) => {
    flyhalf_session.value = window.sessionStorage.getItem('flyhalf_session');
    const url = `${endPoint.value}/${api}`
    return new Promise(async (resolve) => {
      const data = await useFetch(url, {
        method: 'POST',
        headers: {
          auth: flyhalf_session.value
        },
        body: postData,
      });
      resolve(data)
    })
  };
  /**
   * kintoneでのデータ管理関数を返す
   */
  const getFuncs = () => {
    return {
      task: {
        get: async (query) => {

        },
        add: async (data) => {

        },
        update: async (id, data) => {

        },
        delete: async (id) => {

        }
      },
      sprint: {
        get: async (query) => {

        },
        add: async (data) => {

        },
        update: async (id, data) => {

        },
        delete: async (id) => {

        }
      }
    }
  }

  /***********************************************************************
   * セッションgetter,setter
   */
  const getSession = () => {
    JSON.parse(atob(window.sessionStorage.getItem('flyhalf_session')))
  }
  const setSession = (flyhalf_session) => {
    window.sessionStorage.setItem('flyhalf_session', btoa(JSON.stringify(flyhalf_session)))
  }
  /********************************************************************** */


  /***********************************************************************
   * kintoneのobjetの形式をkey:valueに変換
   */


  return {
    login,
    logout,
    getAll
  };
}
