<script setup>
import draggable from "vuedraggable";
const isLoading = ref(false)
onMounted(async () => {
  isLoading.value = true
})
</script>
<template>
  <span v-if="isLoading">
    <v-container>
      <v-row>  
        <v-col cols="12">
          リスト
        </v-col>
      </v-row>
    </v-container>
  </span>
</template>
<style></style>