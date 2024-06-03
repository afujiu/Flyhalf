/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { session } from '~/composables/session';
import { defineStore } from "pinia";
export const kintone = defineStore(
  "kintone",
  () => {
    const {
      getObj,
      setObj,
      getBase64,
      remove
    }=session()
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
      setObj({
        type: type,
        domain: param.domain,
        loginId: loginId,
        password: password,
        teamAppId: param.teamAppId
      })
      const data = await post('kintone/team', { auth: getBase64() }, null)
      /**
       * 成功した場合
       */
      let session = getObj()
      if (data.state == 'suc') {
        let teams = []
        for (let one of data.result) {
          teams.push({
            id: one.id,
            name: one.name,
            taskAppId: one.taskAppId,
            sprintAppId: one.sprintAppId,
          })
        }
        session['teams'] = teams
        setObj(session)
        return true
      } else {
        return false
      }
    };
    /**
     * ログアウト
     */
    const logout = () => {
      remove();
    };
    /**
     * 単一post
     * @param {*} url 
     * @param {*} headers 
     * @param {*} body 
     * @returns 
     */
    const post = async (api, headers, body) => {
      return new Promise(resolve => {
        headers['content-Type'] = 'application/json'
        const url = `${endPoint.value}/${api}`
        fetch(url, {
          method: 'POST',
          headers: headers,
          body: body,
        }).then(response => response.json())
          .then(data => resolve(data))
          .catch(error => console.error('Error:', error));
      })
    };

    /**
     * kintoneでのデータ管理関数を返す
     */
    const getTable = () => {
      return {
        team: {
          getList: () => {
            let session = getObj()
            return session.teams
          },
          set: (idx) => {
            let session = getObj()
            session['team'] = session.teams[idx]
            setObj(session)
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
  })
