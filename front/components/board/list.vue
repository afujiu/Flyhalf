<script setup>
import { ref } from 'vue'
const taskList = ref([]);
const sprintList = ref([])
const create = async () => {
  taskList.value = account().table.task.list()
  sprintList.value = account().table.sprint.list()
}
create()
/**
 * リスト追加
 */
const add=()=>{
  const template = account().table.task.template()
  taskList.value.push(template)
}
</script>
<template>
  <h2 class="font-impact">List</h2>
  <v-container class="pa-0 ma-0">
    <v-row>
      <v-col class="pa-0 ma-0">
        <div v-for="(task,idx) in taskList"
        :key="idx">
        <task-line v-model="taskList[idx]" />
      </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="add">追加</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>