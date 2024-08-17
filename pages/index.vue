<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div v-if="isLoading" class="text-center">
      <ProgressSpinner />
      <p class="mt-4 text-gray-600">Loading...</p>
    </div>
    <div
      v-else-if="isAuthenticated"
      class="rounded-lg bg-white p-8 text-center text-gray-800 shadow-md"
    >
      <h1 class="mb-6 text-3xl font-bold text-indigo-600">Welcome</h1>
      <p class="mb-4 text-xl">
        Hello, <span class="font-semibold">{{ userProfile?.username }}</span>
      </p>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        class="p-button-danger"
        @click="logout"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { useKeycloak } from "~/composables/useKeycloak";

const { isAuthenticated, userProfile, logout } = useKeycloak();
const isLoading = ref(true);

onMounted(() => {
  // Set isLoading to false after a short delay to allow for authentication check
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>
