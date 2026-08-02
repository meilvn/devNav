// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@nuxtjs/i18n', '@nuxtjs/turnstile', '@vueuse/nuxt'],
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
  nitro: {
    storage: {
      // 'uploads' 是存储桶的名称，可以自定义
      uploads: {
        driver: 'fs',
        base: './public/uploads', // 文件将保存在 public 目录下
      },
    },
  },
  // turnstile: {
  //   siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY, // 你的 Site Key
  // },
  // runtimeConfig: {
  //   turnstile: {
  //     secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY, // 你的 Secret Key
  //   },
  // },
})