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
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Joe Czarnecki',
      meta: [
        { name: 'description', content: 'Musician · Maker · Developer' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Joe Czarnecki' },
        { property: 'og:description', content: 'Musician · Maker · Developer' },
        { property: 'og:image', content: '/og-image.png' },
        { property: 'og:url', content: 'https://joeczarnecki.com' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Joe Czarnecki' },
        { name: 'twitter:description', content: 'Musician · Maker · Developer' },
        { name: 'twitter:image', content: '/og-image.png' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap' }
      ]
    }
  }
})
