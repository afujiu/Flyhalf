import { ref } from 'vue'

export function access() {
  const list = ref([])
  const runtimeConfig = useRuntimeConfig();
  function add(val: object) {
    list.value.push(val);
  }
  function getAll() {
    console.log(runtimeConfig.public.apiUrl)
    return list.value;
  }
  function get() {
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