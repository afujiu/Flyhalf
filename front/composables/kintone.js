/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { session } from '~/composables/session';
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
    session().set({
      type: type,
      domain: param.domain,
      loginId: loginId,
      password: password,
      teamAppId: param.teamAppId
    })
    const result = await post('kintone/team', { auth: session().getBase64() }, null)
    /**
     * 成功した場合
     */
    if (result.state == 'suc') {
      result.resutl
      session().set(flyhalf_session.value)
      return true
    } else {
      return false
    }
  };
  /**
   * ログアウト
   */
  const logout = () => {
    session().remove();
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

  /**
   * kintoneでのデータ管理関数を返す
   */
  const getTable = () => {
    return {
      team:{
        getLists: async () => {

        },
        set: async (id) => {

        },
      },
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
   * kintoneのobjetの形式をkey:valueに変換
   */


  return {
    login,
    logout,
    getTable
  };
}
