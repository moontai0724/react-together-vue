<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";

import { useKeycloak } from "~/composables/useKeycloak";

const { initKeycloak } = useKeycloak();

// Initialize Keycloak when the app starts
onMounted(() => {
  initKeycloak();
});
</script>

<style>
/* Any global styles can go here */
</style>
