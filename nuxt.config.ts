// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  devServer: {
    port: 3333
  },
  modules: ['@nuxt/content', '@tresjs/nuxt', 'nuxt-og-image', 'shadcn-nuxt'],
  vite: {
    plugins: [tailwindcss()]
  },
  ogImage: {
    fonts: ['Space+Grotesk:700', 'Space+Mono:400']
  },
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
        // Open Graph (image handled by nuxt-og-image)
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Component-level SEO via useSeoMeta is preferred, but these are good defaults
        { property: 'og:title', content: 'Joe Czarnecki' },
        { property: 'og:description', content: 'Musician · Maker · Developer' },
        { property: 'og:image', content: 'https://joeczarnecki.com/pwa-512x512.png' }, // Placeholder domain
        { name: 'twitter:card', content: 'summary_large_image' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/pwa-192x192.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap' }
      ]
    }
  }
})