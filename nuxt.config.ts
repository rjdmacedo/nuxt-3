import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ["~/assets/main.css"],

  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],

  buildModules: ["@pinia/nuxt"],

  colorMode: {
    dataValue: "theme", // activate data-theme in <html> tag
    preference: "light", // default theme
  },
})
