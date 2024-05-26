<script setup lang="ts">
  import { ref } from 'vue'
  
  /**
   * ログイン
   */
  const pushLogin = ()=>{
    navigateTo('/mainBoard');
  }
  /**
   * チーム作成
   */
   const pushNewTeam = ()=>{
    navigateTo('/newTeam/kintone');
  }
</script>
<template>
  <v-container class="pa-0 ma-0">
    <v-row>
      <v-col md=5 cols=12 class="pa-0 ma-0 pr-5">
        <v-container class="pa-0 ma-0">
          <v-row>
            <v-col class="pa-0 ma-0" cols=12><h>Fly Half</h></v-col>
            <v-col class="" cols=12>Enjoy Scrum Management</v-col>
            <v-col class="pa-0 ma-0" cols=12><input type="text" class="em2 wi-10em" placeholder="LoginId" size="4"/></v-col>
            <v-col class="pa-0 ma-0" cols=12><input type="password" class="em2  wi-10em" placeholder="Password" size="4"/></v-col>
            <v-col class="py-5 my-5" cols=12></v-col>
            <v-col class="pa-0 ma-0" md=5 cols=12>
              <button class="blue em3 " @click="pushLogin()">Login</button>
            </v-col>
            <v-col class="pa-0 ma-0" lg=5 cols=12>
              <button class="yellow em3" @click="pushNewTeam()">New Team</button>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    <v-col md=5 cols=12 class="pa-0 ma-0 pl-5">
      <p class="text-lg-right">NEWS</p></v-col>
  </v-row>
  </v-container>
</template>
<style scoped>
</style>