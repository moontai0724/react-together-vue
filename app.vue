<template>
  <NuxtLayout>
    <nav class="bg-gray-800 p-4 text-white">
      <ul class="flex space-x-4">
        <li><NuxtLink to="/" class="hover:text-gray-300">Home</NuxtLink></li>
        <li>
          <NuxtLink to="/photos" class="hover:text-gray-300">Photos</NuxtLink>
        </li>
      </ul>
    </nav>
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
