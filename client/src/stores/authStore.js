import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const isAuthenticated = ref(!!localStorage.getItem("token")); // Initialisation à partir du localStorage

  const login = (token) => {
    localStorage.setItem("token", token);
    isAuthenticated.value = true; // Met à jour l'état d'authentification
  };

  const logout = () => {
    localStorage.removeItem("token");
    isAuthenticated.value = false;
  };

  return { isAuthenticated, login, logout };
});
