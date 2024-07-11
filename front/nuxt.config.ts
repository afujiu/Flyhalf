// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify'
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
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
  modules: [
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
  ],
  pwa: {
    registerType: "autoUpdate", // 多分なくてもよい
    manifest: {
      name: 'アプリ名',
      description: "アプリ説明",
      theme_color: "#326CB3", // テーマカラー
      lang: "ja",
      short_name: "アプリ短縮名",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      icons: [
        {
          "src": "pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          "src": "maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
    }
  },
  workbox: { // なんか必要
    navigateFallback: null
  },
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
  css: [
    'vuetify/styles', // Vuetifyのスタイルをインポート
    '@mdi/font/css/materialdesignicons.css', // アイコンフォントをインポート
    "assets/css/base.css",
  ],
})
