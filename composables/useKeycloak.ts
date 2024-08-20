import { storeToRefs } from "pinia";
import { useKeycloakStore } from "~/stores/keycloak";

export function useKeycloak() {
  const keycloakStore = useKeycloakStore();
  const { isAuthenticated, userProfile, keycloak } = storeToRefs(keycloakStore);
  const { login, logout, initKeycloak } = keycloakStore;

  const checkAuthAndRedirect = async () => {
    await initKeycloak();
    if (!keycloakStore.isAuthenticated) login();
  };

  return {
    keycloak,
    isAuthenticated,
    userProfile,
    login,
    logout,
    initKeycloak,
    checkAuthAndRedirect,
  };
}
