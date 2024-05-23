<script setup lang="ts">
    import { access } from '~/composables/access'
    const { add, getAll, get, edit,del } = access()
</script>
<template>
    <div>
      <p>Count: {{ getAll() }}</p>
      <v-btn @click="add({key:1,value:'hoge'})">add</v-btn>
    </div>
  </template>