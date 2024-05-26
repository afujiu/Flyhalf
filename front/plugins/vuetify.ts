import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
const myCustomTheme = {
  dark: false,
  colors: {
    primary: '#00FF00',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    focus: '#ff0000',  // フォーカス時の色を赤に設定
  },
}
export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
  })

  // Vue.js で Vuetify を使用する
  nuxtApp.vueApp.use(vuetify)
})