// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: [
    "assets/css/main.css",
    "assets/css/color.css",
    "assets/css/pc.css",
    "assets/css/tablet.css",
    "assets/css/phone.css"
  ],
  runtimeConfig: {
    public: {
      apiUrl: 'http://localhost:8080',
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify())
    },
  },
  modules: ['@pinia/nuxt'],
  app: {
    head: {
      meta: [
        { name: "theme-color", content: "#326CB3" },
      ],
      link: [
      ],
      script: [
      ]
    }
  },
})
