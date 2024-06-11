<script setup>
  import { ref } from 'vue'
  const props = defineProps({
  modelValue: {type:String,default:''},
})
const list = account().table.task.taskTypeList()
const name = ref("")
const colorClass = ref("")
let data = list.find(v=>v.key == props.modelValue)
if(data!=undefined){
  name.value=data.name
  colorClass.value = data.class
}
</script>
<template>
  <div class="type-outer">
  <div v-if="colorClass!=''" class="typeCycle" :class="colorClass">

  </div>
</div>
</template>
<style scoped>
.type-outer{
  display:inline-block;
}
.typeCycle{
  border-radius: 50%;
  width:2em;
  height:2em;
  display:flex;
  color:white;
  background:black;
  box-shadow: 0px 5px 3px;
}
.goal{
  color:black;
  background:white;
}
.pbl{
  color:black;
  background:red;
}
.sbl{
  color:black;
  background:rgb(246, 255, 0);
}
.task{
  color:black;
  background:rgb(0, 60, 255);
}
</style>