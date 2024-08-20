import Aura from "@primevue/themes/aura";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@primevue/nuxt-module", "@pinia/nuxt"],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    },
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      keycloakUrl: process.env.NUXT_PUBLIC_KEYCLOAK_URL,
      keycloakRealm: process.env.NUXT_PUBLIC_KEYCLOAK_REALM,
      keycloakClientId: process.env.NUXT_PUBLIC_KEYCLOAK_CLIENT_ID,
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
    },
  },
});
