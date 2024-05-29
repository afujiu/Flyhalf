import { ref } from 'vue'
/**
 * 
 * @returns 
 */
export function access() {
  const list = ref([])
  const runtimeConfig = useRuntimeConfig();
  function add(val: object) {
    list.value.push(val);
  }
  function getAll() {
    return list.value;
  }
  function get() {
    await fetch(url, {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {//例
        'Content-Type': 'application/json',
      },
    });



    return list.value;
  }
  function edit(key: number, val: object) {
    list.value[key] = val;
  }
  function del(key: number) {
    delete list.value[key];
  }

  return {
    add,
    getAll,
    get,
    edit,
    del,
  }
}