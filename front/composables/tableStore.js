import { version } from "vue"

/**
 * テーブルストア
 */
export const tableStore = defineStore(
    "tableStore",
    () => {
        const taskList = [
            {
                id: 1,
                beforeId: null,
                deleteDate: '',
                title: '',
                version: 1,
                contents: [],
                type: 'goal',
                status: 'todo',
                user: 'hoge',
                parentId: null,
                point: 1,
                priority: 1,
                startPlanDate: '2024-07-07T12:00:00Z',
                endPlanDate: '2024-07-07T12:00:00Z',
                histories: []
            }
        ]
        const versionList = [
            {
                id: 1,
                beforeId: null,
                deleteDate: '',
                title: '',
                contents: [],
                startDate: '',
                endDate: '',
                kpt: [],
            }
        ]
        const userList = [
            { id: 1, key: 'hoge', name: 'ほげほげ' },
            { id: 2, key: 'fuga', name: 'ふが' }
        ]

        //#region タスク*****************************************************
        /************************************************************** */
        /**
         * タスクデータのテンプレート
         */
        const getTaskTemplate = () => {
            return new {
                beforeId: null,
                deleteDate: '',
                title: '',
                version: 1,
                contents: [],
                type: 'goal',
                status: 'todo',
                user: '',
                parentId: null,
                point: 1,
                priority: 1,
                startPlanDate: '',
                endPlanDate: '',
                histories: []
            }
        }
        /**
         * タスク一覧
         * @param {*} query 
         */
        const getTaskList = (query) => {
            console.log('aa')
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(taskList)
                }, 500);
            })
        }
        /**
         * タスク登録
         * @param {*} data 
         */
        const addTask = async (data) => {
            data['id'] = taskList.length + 1
            taskList.put(data)
        }
        /************************************************************** */
        //#endregion *****************************************************

        const getVersionList = (query) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(versionList)
                }, 500);
            })
        }
        /**
         * ユーザー一覧
         * @returns 
         */
        const getUserList = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    userList.push({ id: 3, key: 'piyo', name: 'ぴよ' })
                    resolve(userList)
                }, 500);
            })
        }
        return {
            taskList,
            getTaskTemplate,
            getTaskList,
            addTask,
            versionList,
            getVersionList,
            userList,
            getUserList,
        }
    }
)