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
  router.push('/board')
}

</script>
<template>
  <v-container align="center" justify="center" v-if="isLoading">
    <v-row>
      <v-col cols="12">
        <h1 style="font-size:4em;">FlyHalf</h1>
      </v-col>
      <v-col cols="12">
        <div class="card login-card">
          <v-container class="px-0 mx-0">
            <v-row>
              <v-col cols="12" class="px-0 mx-0 py-0 my-0  pl-5 text-left">
                テナントID
              </v-col>
              <v-col cols="12">
                <input type="text" name="domain" />
              </v-col>
              <v-col cols="12" class="px-0 mx-0 py-0 my-0  pl-5 text-left">
                ログインID
              </v-col>
              <v-col cols="12">
                <input type="text" v-model="loginid" name="loginid" />
              </v-col>
              <v-col cols="12" class="px-0 mx-0 py-0 my-0  pl-5 text-left">
                パスワード
              </v-col>
              <v-col cols="12">
                <input type="password" v-model="password" name="password" id="password-input" />
              </v-col>
              <v-col cols="12">
                <button class="btn yellow" @click="pushLogin">ログイン</button>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.login-card {
  min-width: 300px;
  min-height: 300px;
  max-width: 30vw;
}

.login-card input {
  padding-left: 1em;
  padding-right: 1em;
  font-size: 1.5em;
  width: 100%;
}
</style>