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
      if (kintoneParam.length < 2) {
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
        body = (body != null) ? JSON.stringify(body) : body
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
     * キントーンのフォーマット修正
     * @param {*} results 
     * @returns 
     */
    const formatKintoneList = (results) => {
      let format = []
      for (let data of results) {
        let columns = {}
        for (const key in data) {
          //テーブルの場合
          if (data[key]['type'] != null) {
            if (data[key]['type'] == 'SUBTABLE') {
              data[key].value = getSubTable(data[key].value)
            }
          }
          switch (key) {
            case '$id':
              columns['id'] = data[key].value
              break
            case '作成日時':
              columns['createDate'] = data[key].value
              break
            case '更新日時':
              columns['updateDate'] = data[key].value
              break
            case '作成者':
              columns['createUser'] = data[key].value
              break
            case '更新者':
              columns['updateUser'] = data[key].value
              break
            default:
              columns[key] = data[key].value
              break
          }
        }
        format.push(columns)
      }
      return format
    }
    /**
     * サブテーブルのフォーマット
     */
    const getSubTable = (list) => {
      let ret = []
      for (let oneLine of list) {
        let formatValue = {}
        formatValue['id'] = oneLine.id
        let values = oneLine.value
        for (const valueName in values) {
          formatValue[valueName] = values[valueName].value
        }
        ret.push(formatValue)
      }
      return ret
    }

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
        user: {
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
            let data = await post(`kintone/getAll`, { auth: getBase64() }, {
              appId: session.team.taskAppId.value,
              query: ''
            })
            taskList.value = data
            return data
          },
          list: () => {
            console.log(taskList.value)
            return formatKintoneList(taskList.value)
          },
          add: async (data) => {

          },
          update: async (id, data) => {

          },
          delete: async (id) => {

          },
          template: () => {
            return {
              comments: {
                type: "SUBTABLE",
                value: []
              },
              type: {
                type: "SINGLE_LINE_TEXT",
                value: ""
              },
              version: {
                type: "NUMBER",
                value: ""
              },
              planDate: {
                type: "DATE",
                value: null
              },
              point: {
                type: "NUMBER",
                value: ""
              },
              parentId: {
                type: "NUMBER",
                value: ""
              },
              compDate: {
                type: "DATE",
                value: null
              },
              teamId: {
                type: "NUMBER",
                value: ""
              },
              name: {
                type: "SINGLE_LINE_TEXT",
                value: ""
              },
              user: {
                type: "USER_SELECT",
                value: []
              },
              status: {
                type: "SINGLE_LINE_TEXT",
                value: ""
              },
            }
          },
          templateTable: () => {
            return { id: "", date: "", comment_user: [], text: "" }
          },
          taskTypeList: () => {
            return [
              { key: 'goal', name:'ゴール', class: 'goal' },
              { key: 'pbl', name:'プロダクトBL', class: 'pbl' },
              { key: 'sbl', name:'スプリントBL', class: 'sbl' },
              { key: 'task', name:'タスク', class: 'task' },
            ]
          },
          taskStatusList: () => {
            return [
              { key: 'todo', name: 'TODO', class: 'todo' },
              { key: 'progress', name: 'PROGRESS', class: 'progress' },
              { key: 'complate', name: 'CO<PLATE', class: 'complate' },
            ]
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
            let data = await post(`kintone/getAll`, { auth: getBase64() }, {
              appId: session.team.sprintAppId.value,
              query: ''
            })
            sprintList.value = data
            return data
          },
          list: () => {
            return sprintList.value
          },
          add: async (data) => {

          },
          update: async (id, data) => {

          },
          delete: async (id) => {

          },

          template: () => {
            return {
              comments: {
                type: "SUBTABLE",
                value: []
              },
              type: {
                type: "SINGLE_LINE_TEXT",
                value: ""
              },
              version: {
                type: "NUMBER",
                value: ""
              },
              planDate: {
                type: "DATE",
                value: null
              },
              point: {
                type: "NUMBER",
                value: ""
              },
              parentId: {
                type: "NUMBER",
                value: ""
              },
              compDate: {
                type: "DATE",
                value: null
              },
              teamId: {
                type: "NUMBER",
                value: ""
              },
              name: {
                type: "SINGLE_LINE_TEXT",
                value: ""
              },
              user: {
                type: "USER_SELECT",
                value: []
              },
              status: {
                type: "SINGLE_LINE_TEXT",
                value: ""
              },
              $id: {
                type: "__ID__",
                value: ""
              }
            }
          },
          templateTable: () => {
            return { id: "", type: "", date: "", comment_user: [], text: "" }
          },
          commentTypeList: () => {
            return [
              { key: 'keep', name: 'KEEP', color: '#00FF00' },
              { key: 'problem', name: 'PROBLEM', color: '#FF0000' },
              { key: 'try', name: 'TRY', color: '#0000FF' },
            ]
          }
        },
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
