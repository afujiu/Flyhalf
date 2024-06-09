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
    } = session()
    const taskList = ref([])
    const sprintList = ref([])
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
      let kintoneParam = param.domain.split('-')
      if(kintoneParam.length<2){
        return false
      }
      setObj({
        type: type,
        domain: kintoneParam[0],
        loginId: loginId,
        password: password,
        teamAppId: kintoneParam[1]
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
        headers['Content-Type'] = 'application/json'
        const url = `${endPoint.value}/${api}`
        body = (body!=null)?JSON.stringify(body):body
        fetch(url, {
          method: 'POST',
          headers: headers,
          body: body
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
        /**
         * ユーザー一覧取得
         */
        user:{
          getList: () => {
          },
        },
        task: {
          /**
           * タスク取得
           * @param {*} query 
           * @returns 
           */
          get: async (query) => {
            let session = getObj()
            let data = await post(`kintone/getAll`,{ auth: getBase64() }, {
              appId:session.team.taskAppId,
              query:''
            })
            taskList.value = data
            return data
          },
          list: ()=>{
            console.log(taskList.value)
            return taskList.value
          },
          add: async (data) => {

          },
          update: async (id, data) => {

          },
          delete: async (id) => {

          }
        },
        sprint: {
          /**
           * スプリント取得
           * @param {*} query 
           * @returns 
           */
          get: async (query) => {
            let session = getObj()
            let data = await post(`kintone/getAll`,{ auth: getBase64() }, {
              appId:session.team.sprintAppId,
              query:''
            })
            sprintList.value = data
            return data
          },
          list: ()=>{
            return sprintList.value
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
