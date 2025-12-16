// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@tresjs/nuxt'
  ],
  devtools: { enabled: true },
  tres: {
    devtools: true
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
})
