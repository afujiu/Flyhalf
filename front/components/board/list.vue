<script setup>
import { ref } from 'vue'
const taskList = ref([]);

const create =async()=>{
  taskList.value = account().table.task.list()
}
create()
</script>
<template>
  <h2 class="font-impact">List</h2>
  <v-container class="pa-0 ma-0">
    <v-row v-for="task in taskList">
      <v-col class="pa-0 ma-0">{{ task }}</v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>