import { storeToRefs } from "pinia";

import { useKeycloakStore } from "~/stores/keycloak";

export function useKeycloak() {
  const keycloakStore = useKeycloakStore();
  const { isAuthenticated, userProfile } = storeToRefs(keycloakStore);

  const checkAuthAndRedirect = async () => {
    await keycloakStore.initKeycloak();
    if (!keycloakStore.isAuthenticated) {
      keycloakStore.login();
    }
  };

  return {
    keycloak: keycloakStore.keycloak,
    isAuthenticated,
    userProfile,
    login: keycloakStore.login,
    logout: keycloakStore.logout,
    initKeycloak: keycloakStore.initKeycloak,
    checkAuthAndRedirect,
  };
}
