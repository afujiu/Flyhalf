<script setup>
import { ref } from "vue"
const menus = ref(["List", "Map", "Kanban", "Sprint", "MyTask"])
const selectMenuKey = ref("List");
const route = useRoute();
const isLoading = ref(false)
const created = async () => {
  if(!account().checkSession()){
    account().next('')
    return
  }
  await account().table.task.get(null)
  await account().table.sprint.get(null)
  isLoading.value = true
}
await created()
</script>
<template>
  <span v-if="isLoading">
    <v-card class="menu-card">
      <v-list class="px-0 mx-0">
        <v-list-item v-for="(item, index) in menus">
          <button @click="selectMenuKey = menus[index]" class="font-impact"
            :class="{ 'selected': selectMenuKey == menus[index] }">{{
          menus[index] }}</button>
        </v-list-item>
      </v-list>
    </v-card>

    <v-card class="user-card">
      <v-container>
        <v-row>
          <v-col></v-col>
          <v-col>
            <v-btn color="primary" x-small flat icon="mdi-logout"></v-btn>
          </v-col>
          <v-col></v-col>
        </v-row>
      </v-container>
    </v-card>
    <v-continer class="sub-board">
      <v-row>
        <v-col>
          <board-list v-if="selectMenuKey == 'List'"></board-list>
          <board-map v-if="selectMenuKey == 'Map'"></board-map>
          <board-kanban v-if="selectMenuKey == 'Kanban'"></board-kanban>
          <board-sprint v-if="selectMenuKey == 'Sprint'"></board-sprint>
          <board-my-task v-if="selectMenuKey == 'MyTask'"></board-my-task>
        </v-col>
      </v-row>
    </v-continer>
  </span>
</template>
<style scoped>
.menu-card {
  position: fixed;
  left: 1em;
  top: 25%;
  padding: 0;
  overflow: hidden;
}

.menu-card * {
  overflow: hidden;
  padding: 0;
}

.menu-card button {
  font-size: 1.5em;
  width: 100%;
  margin: 0;
  cursor: pointer;
  color: black;
}

.menu-card button:hover {
  opacity: 0.5;
}

.menu-card button:active {
  opacity: 0.3;
}

.selected {
  color: white;
  background: #CCCCCC;
}

.user-card {
  position: fixed;
  right: 1em;
  top: 1em;
}

.sub-board {
  position: fixed;
  left: 20%;
  top: 10%;
}
</style>