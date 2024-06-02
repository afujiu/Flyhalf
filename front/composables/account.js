/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { session } from '~/composables/session';
import { kintone } from '~/composables/kintone';
export function account() {
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
        if(result){
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
  const checkSession = ()=>{
    const session = session().get()
    if(session!=null){
      if(table.value=={}){

      }
      switch (session.type) {
        case 'kintone':
          table.value = kintone().getTable()
        break
      }
      return true
    }else{
      return false
    }
  }
  /**
   * ログアウト
   */
  const logout = () => {
    session().remove()
  };
  /**
   * チーム一覧を取得
   */
  const getTeams = () => {
  };
  /**
   * チームを選択
   */
  const selectTeam = (id) => {

  };

  return {
    login,
    checkSession,
    logout,
  };
};
