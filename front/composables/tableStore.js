import { version } from "vue"
import { defineStore } from "pinia";
/**
 * テーブルストア
 */
export const tableStore = defineStore(
    "tableStore",
    () => {
        const taskList = ref([
            {
                id: 1,
                teamKey:'',
                beforeId: null,
                deleteDate: '',
                title: '',
                tags:'',
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
        ])
        const versionList = ref([
            {
                id: 1,
                teamKey:'',
                beforeId: null,
                deleteDate: '',
                title: '',
                contents: [],
                startDate: '',
                endDate: '',
                kpt: [],
            }
        ])
        const userList = ref([
            { id: 1, key: 'hoge', name: 'ほげほげ' },
            { id: 2, key: 'fuga', name: 'ふが' }
        ])

        //#region タスク*****************************************************
        /************************************************************** */
        /**
         * タスクデータのテンプレート
         */
        const getTaskTemplate = () => {
            return  {
                id:null,
                teamKey:'',
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
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(taskList.value)
                }, 500);
            })
        }
        /**
         * タスク登録
         * @param {*} data 
         */
        const addTask = async (data) => {
            data['id'] = taskList.value.length + 1
            taskList.value.push(data)
        }
        /**
         * タスク修正
         * @param {*} data 
         */
        const editTask = async (data) => {
            const idx = taskList.value.findIndex(v=>v.id == data.id)
            if(idx!=undefined){
                taskList.value[idx]=data
            }
        }
        /************************************************************** */
        //#endregion *****************************************************
        const getVersionTemplate = () => {
            return {
                id:null,
                teamKey:'',
                beforeId: null,
                deleteDate: '',
                title: '',
                contents: [],
                startDate: '',
                endDate: '',
                kpt: [],
            }
        }
        const getVersionList = (query) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(versionList.value)
                }, 500);
            })
        }
        /**
         * 
         * @param {*} data 
         */
        const addVersion = async (data) => {
            data['id'] = versionList.value.length + 1
            versionList.value.push(data)
        }
        const editVersion = async (data) => {
            const idx = versionList.value.findIndex(v=>v.id == data.id)
            if(idx!=undefined){
                versionList.value[idx]=data
            }
        }
        /**
         * ユーザー一覧
         * @returns 
         */
        const getUserList = () => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    userList.value.push({ id: 3, key: 'piyo', name: 'ぴよ' })
                    resolve(userList.value)
                }, 500);
            })
        }
        return {
            taskList,
            getTaskTemplate,
            getTaskList,
            addTask,
            versionList,
            getVersionTemplate,
            getVersionList,
            addVersion,
            editVersion,
            userList,
            getUserList,
        }
    },
    {
        persist: {
            storage: sessionStorage,
        },
    },
)