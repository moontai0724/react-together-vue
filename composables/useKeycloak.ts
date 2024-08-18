import { storeToRefs } from "pinia";

import { useKeycloakStore } from "~/stores/keycloak";

export function useKeycloak() {
  const keycloakStore = useKeycloakStore();
  const { isAuthenticated, userProfile } = storeToRefs(keycloakStore);
  const { login, logout, initKeycloak } = keycloakStore;

  const checkAuthAndRedirect = async () => {
    await initKeycloak();
    if (!keycloakStore.isAuthenticated) login();
  };

  return {
    keycloak: keycloakStore.keycloak,
    isAuthenticated,
    userProfile,
    login,
    logout,
    initKeycloak,
    checkAuthAndRedirect,
  };
}
