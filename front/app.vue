<script setup>
const {init} = requestStore()
await init()
</script>
<template>
  <main>
    <NuxtPage />
  </main>
</template>
