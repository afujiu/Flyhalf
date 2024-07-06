<script setup>
import draggable from "vuedraggable";
const { login } = apiStore()
const isLoading = ref(false)
const list = ref([])
onMounted(() => {
  list.value = [
    { id: 1, orderId: 1, deleteDate: '', title: '', version: 1, contents: [], type: 'goal', status: 'todo', user: '', parentId: null, point: 1, priority: 1, startPlanDate: '20240705', endPlanDate: '20240705', history: [] },
    { id: 2, orderId: 2, deleteDate: '', title: '', version: 1, contents: [], type: 'pbl', status: 'todo', user: '', parentId: null, point: 1, priority: 1, startPlanDate: '20240705', endPlanDate: '20240705', history: [] },
  ]
  isLoading.value = true
})
onMounted
</script>
<template>
  <span v-if="isLoading">
    <v-container>
      <h2>目標を決めよう</h2>
      <v-row>
        <v-col cols="12">
          <template v-for="(item, idx) in list" :key="idx">
            <ListOneLine v-model="list[idx]" />
          </template>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<style></style>