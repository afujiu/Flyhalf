/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { session } from '~/composables/session';
import { kintone } from '~/composables/kintone';
import { defineStore } from "pinia";

export const account = defineStore(
  "account",
  () => {
    const table = ref({})

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
      const session = session().getObj()
      if (session != null) {
        // table情報がない場合は取得
        if (table.value == {}) {
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
      session().remove()
    };

    return {
      table,
      login,
      checkSession,
      logout,
    };
  });
