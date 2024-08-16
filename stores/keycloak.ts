import Keycloak from "keycloak-js";
import { defineStore } from "pinia";

export const useKeycloakStore = defineStore("keycloak", {
  state: () => ({
    keycloak: null as Keycloak | null,
    isAuthenticated: false,
    userProfile: null as any | null,
  }),
  actions: {
    async initKeycloak() {
      const {
        keycloakUrl: url,
        keycloakRealm: realm,
        keycloakClientId: clientId,
      } = useRuntimeConfig().public;

      this.keycloak = new Keycloak({ url, realm, clientId });

      const authenticated = await this.keycloak.init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      });

      this.isAuthenticated = authenticated;

      if (authenticated) {
        this.userProfile = await this.keycloak.loadUserProfile();
      }

      // Set up token refresh
      setInterval(() => {
        this.keycloak
          ?.updateToken(70)
          .catch((e) => console.error("Failed to refresh token", e));
      }, 60000);
    },
    login() {
      this.keycloak?.login();
    },
    logout() {
      this.keycloak?.logout();
    },
  },
});
