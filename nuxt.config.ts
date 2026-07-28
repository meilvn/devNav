// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  css: ['~/assets/css/main.css'],
  i18n: {
    locales: [
      { code: 'zh', name: '简体中文', file: 'zh.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ],
    defaultLocale: 'zh',
    strategy: 'prefix_except_default',
    langDir: 'i18n',
    restructureDir: 'app/', 
  },
  ui: {
    fonts: false
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
})
