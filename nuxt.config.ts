export default defineNuxtConfig({
  app: { baseURL: process.env.NUXT_APP_BASE_URL || '/' },
  nitro: { prerender: { routes: ['/demo/empty-queue'] } },
  compatibilityDate: '2026-11-19',
})
