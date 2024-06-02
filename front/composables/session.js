/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
export function session() {
  const get = () => {
    if(window.sessionStorage.getItem('flyhalf_session')==null){
      return null
    }
    return JSON.parse(atob(window.sessionStorage.getItem('flyhalf_session')))
  }
  const set = ()=>{
    return window.sessionStorage.getItem('flyhalf_session')
  }
  const getBase64 = (flyhalf_session) => {
    if(window.sessionStorage.getItem('flyhalf_session')==null){
      return null
    }
    window.sessionStorage.setItem('flyhalf_session', btoa(JSON.stringify(flyhalf_session)))
  }
  const remove = (flyhalf_session) => {
    window.sessionStorage.removeItem('flyhalf_session')
  }
  return {
    get,
    set,
    getBase64,
    remove,
  };
}
