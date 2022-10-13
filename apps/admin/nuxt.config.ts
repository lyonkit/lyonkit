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
  lyonkit: {
    readOnly: false,
  },
  css: ['assets/css/main.css', 'vuetify/lib/styles/main.sass'],
  ssr: false,
  runtimeConfig: {
    public: {
      lyonkitApiKey: process.env.LYONKIT_API_KEY ?? '',
    },
  },
  modules: [
    '@vueuse/nuxt',
    '@lyonkit/nuxt',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false,
    },
  },
})
