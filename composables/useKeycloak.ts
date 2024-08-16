import { storeToRefs } from "pinia";

import { useKeycloakStore } from "~/stores/keycloak";

export function useKeycloak() {
  const keycloakStore = useKeycloakStore();
  const { isAuthenticated, userProfile } = storeToRefs(keycloakStore);

  return {
    keycloak: keycloakStore.keycloak,
    isAuthenticated,
    userProfile,
    login: keycloakStore.login,
    logout: keycloakStore.logout,
    initKeycloak: keycloakStore.initKeycloak,
  };
}
