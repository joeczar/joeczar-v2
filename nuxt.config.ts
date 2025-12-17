// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 3333
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/tailwindcss',
    '@tresjs/nuxt'
  ],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  tres: {
    devtools: true
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2024-04-03',
  app: {
    head: {
      title: 'Joe Czarnecki',
      meta: [
        { name: 'description', content: 'Musician · Maker · Developer' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap' }
      ]
    }
  }
})
