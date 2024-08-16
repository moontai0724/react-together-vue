<template>
  <div>
    <h1>Welcome to the App</h1>
    <div v-if="isAuthenticated">
      <p>Hello, {{ userProfile?.username }}</p>
      <Button label="Logout" icon="pi pi-sign-out" @click="logout" />
    </div>
    <div v-else>
      <Button label="Login" icon="pi pi-sign-in" @click="login" />
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

<style scoped>
/* Scoped styles for this component */
div {
  text-align: center;
  padding: 20px;
}
</style>
