<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const {fetchServer} = requestStore()
const isLoading = ref(false)

const loginid = ref('')
const password=ref('')
const mode = ref('')
const modeList = ref([{ key: 'sqlite', value: 'SQlite' }, { key: 'kintone', value: 'kintone' },])
const created = async () => {
  isLoading.value = true
}
created()

/**
 * ログイン
 */
const pushLogin = async () => {
console.log(await fetchServer('hoge',{fuga:'piyo'}))
}

</script>
<template>
  <v-container align="center" justify="center" v-if="isLoading">
    <v-row>
      <v-col cols="12">
        <h1 style="font-size:64px;">FlyHalf</h1>
      </v-col>
      <v-col cols="12">
        <pt-card width="30em">
          <v-container>
            <v-row>
              <v-col cols="12" class="px-0">
                
                <pt-selectbox v-model="mode" label="モード" class="border-bottom-dash" :items="modeList"></pt-selectbox>
                <pt-textbox v-model="loginid" type="text" class="border-bottom-dash" label="ログイン" />
                <pt-textbox v-model="password" type="password" class="border-bottom-dash" label="パスワード" />
              </v-col>
              <v-col cols="12">
                <pt-btn class="yellow-bg py-1" @click="pushLogin">ログイン</pt-btn>
              </v-col>
            </v-row>
          </v-container>
        </pt-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
</style>