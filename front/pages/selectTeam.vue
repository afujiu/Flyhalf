<script setup>
import { ref } from 'vue'
import { account } from '~/composables/account';
const {checkSession,table} = account();
const route = useRoute();
const isLoading = ref(false)
const list = ref([])
const created =async()=>{
  account().checkSession()
  list.value = await account().table.team.getList()
  isLoading.value = true
}

await created()
</script>
<template>
  <v-container class="pa-0 ma-0" v-if="isLoading">
    <v-row>
      <v-col cols=12 class="pa-0 ma-0 pr-5">
        <v-container class="pa-0 ma-0">
          <v-row>
            <v-col class="pa-0 ma-0" cols=12>
              <h1>SelectTeam</h1>
            </v-col>
            <v-col class="pa-0 ma-0" cols=12>
              <v-container>
                <v-row>
                  <v-col v-for="item in list" cols="4">
                    <v-card class="ma-5 pa-5">{{ item.name }}</v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>