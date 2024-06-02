<script setup>
import { ref } from 'vue'
import { account } from '~/composables/account';
const route = useRoute();
</script>
<template>
  <v-container class="pa-0 ma-0">
    <v-row>
      <v-col cols=12 class="pa-0 ma-0 pr-5">
        <v-container class="pa-0 ma-0">
          <v-row>
            <v-col class="pa-0 ma-0" cols=12>
              <h>SELECT TEAM</h>
            </v-col>1
            <v-col class="pa-0 ma-0" cols=12>
              {{ account().table.team.getList() }}
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped></style>