<script setup>
import { ref } from 'vue'
const taskList = ref([]);
const sprintList = ref([]);

const create = async () => {
  taskList.value = account().table.task.list()
  sprintList.value = account().table.sprint.list()
}
create()
</script>
<template>
  <h2 class="font-impact">List</h2>
  <v-container class="pa-0 ma-0">
    <v-row v-for="task in taskList">
      <v-col class="pa-0 ma-0">{{ task }}</v-col>
    </v-row>
    <v-row>
      <v-col>あいうえお</v-col>
    </v-row>
    <v-row v-for="sprint in sprintList">
      <v-col class="pa-0 ma-0">{{ sprint }}</v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>