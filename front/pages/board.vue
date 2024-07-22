<script setup>
import menusDashboard from '~/pages/menus/dashboard.vue'
import menusKanban from '~/pages/menus/kanban.vue'
import menusList from '~/pages/menus/list.vue'
import menusMap from '~/pages/menus/map.vue'
import menusSprint from '~/pages/menus/sprint.vue'
const { login } = apiStore()
const isLoading = ref(false)
const mode = ref('dashboard')


const created = async () => {
  await tableStore().getUserList()
  isLoading.value = true
}
created()

</script>
<template>
  <v-container v-if="isLoading" class="pa-0 ma-0">
    <v-row>
      <v-col cols="12" align="center" justify="center" class="pa-0 ma-0">
        <h1 style="font-size:64px;">FlyHalf</h1>
      </v-col>
      <v-col cols="2" class="pa-0 ma-0">
        <pt-card class="menu">
          <button class="menu-select" @click="mode = 'dashboard'"
            :class="[mode == 'dashboard' ? 'selected' : '']">ダッシュボード</button>
          <button class="menu-select" @click="mode = 'list'" :class="[mode == 'list' ? 'selected' : '']">リスト</button>
          <button class="menu-select" @click="mode = 'kanban'"
            :class="[mode == 'kanban' ? 'selected' : '']">カンバン</button>
          <button class="menu-select" @click="mode = 'map'" :class="[mode == 'map' ? 'selected' : '']">マップ</button>
          <button class="menu-select" @click="mode = 'sprint'"
            :class="[mode == 'sprint' ? 'selected' : '']">スプリント</button>
        </pt-card>
      </v-col>
      <v-col cols="10" class="pa-0 pl-5 ma-0">
        <menus-dashboard v-if="mode == 'dashboard'"></menus-dashboard>
        <menus-list v-if="mode == 'list'"></menus-list>
        <menus-kanban v-if="mode == 'kanban'"></menus-kanban>
        <menus-map v-if="mode == 'map'"></menus-map>
        <menus-sprint v-if="mode == 'sprint'"></menus-sprint>
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
  animation: slide-left 500ms;
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

/*******************
メニューセレクト
********************/
.menu-select {
    border: none;
    border-bottom: 2px dashed;
    border-color: black;
    color: black;
    background: transparent;
    display: block;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    text-align: center;
    width: 100%;
}

.menu-select:hover,
.menu-select:focus {
    z-index: 999;
    color: white;
    background: rgba(0, 0, 0, 0.5);
    outline: none;
}

.menu-select.selected {
    transform: rotate(-7deg);
    z-index: 999;
    color: black;
    transition: transform 100ms;
    box-shadow: 4px 1px 0px 1px rgba(0, 0, 0, 0.5);
    border-color: transparent;
    background: yellow;
}
</style>