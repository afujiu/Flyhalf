<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const { login } = apiStore()
const loginid = ref('')
const password = ref('')
const isLoading = ref(false)
const created = async () => {
  //const result = await login(null, null, null)
  isLoading.value = true
}
created()

/**
 * ログイン
 */
const pushLogin = async () => {
  alert('blick')
  //router.push('/board')
}

</script>
<template>
  <v-container align="center" justify="center" v-if="isLoading">
    <v-row>
      <v-col cols="12">
        <h1 style="font-size:64px;">FlyHalf</h1>
      </v-col>
      <v-col cols="12">
        <pt-btn
        color="yellow-bg"
        @click="pushLogin">テスト</pt-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
</style>