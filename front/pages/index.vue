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
  console.log('blick')
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
        <h1>{{ loginid }}</h1>
        <pt-textbox v-model="loginid" label="FlyHalf"/>
      </v-col>
      <v-col cols="12">
        <pt-card width="16em">
          <v-container>
            <v-row>
              <v-col cols="12" class="px-0">
                <pt-textbox v-model="loginid" class="border-bottom-dash" label="ログイン"/>
              </v-col>
              <v-col cols="12">
                <pt-btn class="yellow-bg" @click="pushLogin">確定</pt-btn>
                <pt-btn class="yellow-bg py-1" @click="pushLogin">ログイン</pt-btn>
                <pt-btn class="yellow-bg py-2" @click="pushLogin">ログイン</pt-btn>
                <pt-btn class="yellow-bg py-3" @click="pushLogin">ログイン</pt-btn>
              </v-col>
            </v-row>
          </v-container>
        </pt-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style></style>