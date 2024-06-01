/**
 * kintoneでのアクセス
 */
import { ref } from 'vue';
import { kintone } from '~/composables/kintone';
export function account() {
  const table = ref({})
  const login = async (type, param, loginId, password) => {
    let result = true
    table.value = {}
    switch (type) {
      case 'kintone':
        result = table.value = await kintone().login(type, loginId, password, param)
        break
    }
    return result
  }
  const logout = () => {

  };
  const getAll = (postData = null) => {
  };
  return {
    login,
    logout,
    getAll
  };
};
