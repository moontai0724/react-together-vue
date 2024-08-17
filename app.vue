<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";

import { useKeycloak } from "~/composables/useKeycloak";

const { checkAuthAndRedirect } = useKeycloak();

// Check authentication when the app starts
onMounted(() => {
  checkAuthAndRedirect();
});
</script>

<style>
/* Any global styles can go here */
</style>
