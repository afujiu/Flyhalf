import { ref } from 'vue'

export function access() {
  const list = ref([])
  function add(val:object) {
    list.value.push(val);
  }
  function getAll(){
    return list.value;
  }
  function get() {
    return list.value;
  }
  function edit(key:number,val:object) {
    list.value[key]=val;
  }
  function del(key:number) {
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