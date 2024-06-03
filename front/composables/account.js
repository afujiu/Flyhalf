/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { kintone } from '~/composables/kintone';
import { session } from '~/composables/session';
import { defineStore } from "pinia";
export const account = defineStore(
  "account",
  () => {
    const {
      getObj,
      setObj,
      getBase64,
      remove
    }=session()

    const table = ref(null)
    /**
     * ログイン
     * @param {*} type 
     * @param {*} param 
     * @param {*} loginId 
     * @param {*} password 
     * @returns 
     */
    const login = async (type, param, loginId, password) => {
      let result = true
      table.value = {}
      switch (type) {
        case 'kintone':
          result = table.value = await kintone().login(type, loginId, password, param)
          if (result) {
            table.value = kintone().getTable()
          }
          break
      }
      return result
    }

    /**
     * セッションをチェック
     * 存在しない場合はfalse、
     * ある場合はtrue,タイプでtableをセット
     */
    const checkSession = () => {
      const session = getObj()
      if (session != null) {
        // table情報がない場合は取得
        if (table.value == null) {
          switch (session.type) {
            case 'kintone':
              table.value = kintone().getTable()
              break
          }
        }
        return true
      } else {
        return false
      }
    }
    /**
     * ログアウト
     */
    const logout = () => {
      remove()
    };

    return {
      table,
      login,
      checkSession,
      logout,
    };
  });
