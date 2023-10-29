// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', 'nuxt-lodash'],
  nitro: {
    preset: 'vercel-edge', // you can use 'vercel' or other providers here
  },
  runtimeConfig: {
    openaiApiKey: process.env.OPENAI_API_KEY,
    serpApiKey: process.env.SERPAPI_API_KEY,
  },
  tailwindcss: {
    config: {
      plugins: [require('daisyui')],
    },
  },
});
