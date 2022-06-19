import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  srcDir: 'src/',
  meta: {
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
      { name: 'msapplication-TileColor', content: '#99c53e' },
      { name: 'theme-color', content: '#99c53e' },
      { name: 'googlebot', content: 'noindex' },
    ],
  },
  css: ['assets/css/main.css'],
  ssr: false,
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@lyonkit/nuxt',
  ],
  runtimeConfig: {
    public: {
      lyonkitApiKey: '',
    },
  },
})
