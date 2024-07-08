<script setup>
import draggable from "vuedraggable";
const isLoading = ref(false)
const list = ref([])
const userList = ref([])
onMounted(async () => {
  list.value = await tableStore().getTaskList('')
  isLoading.value = true
})
</script>
<template>
  <span v-if="isLoading">
    <v-container>
      <v-row>
        <v-col cols="12">
          <template v-for="(item, idx) in list" :key="idx">
            <ListOneLine v-model="list[idx]" />
          </template>
        </v-col>
        <v-col>
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<style></style>