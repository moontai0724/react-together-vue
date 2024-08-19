<template>
  <NuxtLayout>
    <nav class="bg-gray-800 p-4 text-white">
      <div class="container mx-auto flex items-center justify-between">
        <ul class="flex space-x-4">
          <li>
            <NuxtLink to="/photos" class="hover:text-gray-300">Photos</NuxtLink>
          </li>
        </ul>
        <div v-if="isAuthenticated" class="flex items-center space-x-4">
          <span>{{ userProfile?.username }}</span>
          <Button
            label="Logout"
            icon="pi pi-sign-out"
            class="p-button-sm p-button-danger"
            @click="logout"
          />
        </div>
      </div>
    </nav>
    <div
      v-if="isLoading"
      class="flex min-h-screen flex-col items-center justify-center"
    >
      <div class="text-center">
        <ProgressSpinner />
        <p class="mt-4 text-gray-600">Loading...</p>
      </div>
    </div>
    <NuxtPage v-else />
  </NuxtLayout>
</template>

<script setup lang="ts">
import "primeicons/primeicons.css";

import { useKeycloak } from "~/composables/useKeycloak";

const { checkAuthAndRedirect, isAuthenticated, userProfile, logout } =
  useKeycloak();
const isLoading = ref(true);

// Check authentication when the app starts
onMounted(async () => {
  await checkAuthAndRedirect();
  isLoading.value = false;
});
</script>

<style>
/* Any global styles can go here */
</style>
