<script setup lang="ts">
  import { ref } from "vue"
  const menus =ref(["List","Map","Kanban","Sprint","MyTask"])
</script>
<template>
  <v-card class="menu-card">
    <v-list>
      <v-list-item v-for="(item, index) in menus">
        <button>{{menus[index]}}</button>
        </v-list-item>
      </v-list>
  </v-card>
</template>
<style scoped>
  .menu-card{
    
    position:fixed;
    left:1em;
    top:25%;
    padding:0.5m;
    overflow:hidden;
  }
  .menu-card * {
    overflow:hidden;
  }
  .menu-card button{
    font-size:1.5em;
    width:100%;
    cursor:pointer;
    color:black;
  }
  .menu-card button:hover{
    opacity:0.5;
  }
  .menu-card button:active{
    opacity:0.3;
  }
</style>