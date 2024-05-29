<script setup>
  import { ref } from 'vue'
  const taskList = ref([]);
  let one = {
        id:1,
        teamId:1,
        type:"product",
        name:"タスク2",
        user:"a-fujiu",
        status:"todo",
        planDate:"20240527",
        version:1,
        firstVersion:1,
        endVersion:1,
        point:5,
        parentId:null,
        compDate:"20240527",
        comments:[{date:"20240527",user:"afujiu",richText:"hogehoge"}]
    };
  taskList.value.push(one)
  taskList.value.push(one)
  taskList.value.push(one)
  taskList.value.push(one)
  const getTaskList = async ()=>{
    return 
  }
</script>
<template>
  <h2>List</h2>
  <v-container class="pa-0 ma-0">
    <v-row v-for="task in taskList">
        <v-col class="pa-0 ma-0">{{ task.name }}</v-col>
    </v-row>
</v-container>
</template>
<style scoped>

</style>