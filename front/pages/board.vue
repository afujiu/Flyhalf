<script setup>
const { login } = apiStore()
const isLoading = ref(false)
const mode = ref('list')

const created = async () => {
  isLoading.value = true
}
created()


/**
 * ログイン
 */
const pushLogin = async () => {
  router.push('/board')
}

</script>
<template>
  <v-container v-if="isLoading" class="pa-0 ma-0">
    <v-row>
      <v-col cols="12" align="center" justify="center" class="pa-0 ma-0">
        <h1 style="font-size:4em;">FlyHalf</h1>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0">
        <div class="card menu">
          <button class="menu-select" @click="mode = 'list'" :class="[mode == 'list' ? 'selected' : '']">リスト</button>
          <button class="menu-select" @click="mode = 'kanban'"
            :class="[mode == 'kanban' ? 'selected' : '']">カンバン</button>
          <button class="menu-select" @click="mode = 'map'" :class="[mode == 'map' ? 'selected' : '']">マップ</button>
          <button class="menu-select" @click="mode = 'sprint'"
            :class="[mode == 'sprint' ? 'selected' : '']">スプリント</button>
        </div>
      </v-col>
      <v-col cols="10" class="pa-0 pl-5 ma-0">
        <List v-if="mode == 'list'"></List>
        <Kanban v-if="mode == 'kanban'"></Kanban>
        <Map v-if="mode == 'map'"></Map>
        <Sprint v-if="mode == 'sprint'"></Sprint>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.menu {
  position: fixed;
  left: 1em;
  top: 10em;
  max-width: 15em;
  padding: 0.2em;
  transform: rotate(0deg);
  transform-origin: top center;
  animation: slide-left 800ms;
}

@keyframes slide-left {
  0% {
    left: -100px;
    transform: rotate(5deg);
  }

  40% {
    left: 1em;
    transform: rotate(-5deg);
  }

  75% {
    transform: rotate(3deg);
  }

  100% {
    transform: rotate(0deg);
    left: 1em;
  }
}
</style>