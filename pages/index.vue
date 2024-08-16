<template>
  <div class="flex min-h-screen flex-col items-center justify-center">
    <div class="rounded-lg bg-white p-8 text-center text-gray-800 shadow-md">
      <h1 class="mb-6 text-3xl font-bold text-indigo-600">Welcome</h1>
      <div v-if="isAuthenticated" class="space-y-4">
        <p class="text-xl">
          Hello, <span class="font-semibold">{{ userProfile?.username }}</span>
        </p>
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          class="p-button-danger"
          @click="logout"
        />
      </div>
      <div v-else>
        <Button
          label="Login"
          icon="pi pi-sign-in"
          class="p-button-primary"
          @click="login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useKeycloak } from "~/composables/useKeycloak";

const { isAuthenticated, userProfile, login, logout, initKeycloak } =
  useKeycloak();

onMounted(async () => {
  await initKeycloak();
});
</script>
