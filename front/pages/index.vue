<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const { login } = apiStore()
const loginid = ref('')
const mode = ref('')
const modeList = ref([{ key: 'sqlite', value: 'SQlite' }, { key: 'kintone', value: 'kintone' },])
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
        <span class="maru">テスト手Ⓢ津男t</span>
        <h1>{{ mode }}</h1>
        <pt-textbox v-model="loginid" label="FlyHalf" />
        <pt-selectbox v-model="mode" label="モード" :items="modeList"></pt-selectbox>
      </v-col>
      <v-col cols="12">
        <pt-card width="16em">
          <v-container>
            <v-row>
              <v-col cols="12" class="px-0">
                <pt-textbox v-model="loginid" class="border-bottom-dash" label="ログイン" />
                <pt-selectbox v-model="mode" label="モード" class="border-bottom-dash" :items="modeList"></pt-selectbox>
              </v-col>
              <v-col cols="12">
                <pt-btn class="yellow-bg" @click="pushLogin">確定</pt-btn>
                <pt-btn class="yellow-bg py-1" @click="pushLogin">ログイン</pt-btn>
              </v-col>
              <v-col>
                <pt-card width="5em">
                  <v-container>
                    <v-row>
                      <v-col>
                        <pt-card width="2em">
                          <v-container>
                            <v-row>
                              <v-col></v-col>
                            </v-row>
                          </v-container>
                        </pt-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </pt-card>
              </v-col>
            </v-row>
          </v-container>
        </pt-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.maru {
  background: transparent;
  border-radius: 100%;
  border: solid 1.5px;
  border-color: white;
  padding: 0.5em;
  box-shadow: 0px 0px 3px 1px rgba(255, 255, 255, 1);
}
</style>