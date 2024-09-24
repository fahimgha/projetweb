<script setup>
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
// const isAuthenticated = ref(!!localStorage.getItem("token")); // Vérifie si l'utilisateur est connecté
const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
};

const isActive = (path) => {
  return router.path === path;
};
</script>

<template>
  <nav class="bg-gray-800 rounded-xl">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <!-- mettre section home ici -->
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <router-link
                to="/"
                v-if="authStore.isAuthenticated"
                class="rounded-md px-3 py-2 text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                active-class="text-white"
                :class="{ 'text-gray-300 hover:bg-gray-700': !isActive('/') }"
                >Bibliothèque</router-link
              >
              <!-- <a href="#"  aria-current="page">Dashboard</a> -->
              <router-link
                to="/addBook"
                v-if="authStore.isAuthenticated"
                class="rounded-md px-3 py-2 text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                active-class="text-white"
                :class="{
                  'text-gray-300 hover:bg-gray-700': !isActive('/addBook'),
                }"
                >Ajouter un Livre</router-link
              >
              <router-link
                to="/login"
                v-if="!authStore.isAuthenticated"
                class="rounded-md px-3 py-2 text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                active-class="text-white"
                :class="{
                  'text-gray-300 hover:bg-gray-700': !isActive('/login'),
                }"
                >Connexion</router-link
              >
              <button v-if="authStore.isAuthenticated" @click="logout">
                Déconnexion
              </button>
              <router-link
                to="/signup"
                v-if="!authStore.isAuthenticated"
                class="rounded-md px-3 py-2 text-sm font-medium"
                exact-active-class="bg-gray-900 text-white"
                active-class="text-white"
                :class="{
                  'text-gray-300 hover:bg-gray-700': !isActive('/signup'),
                }"
                >Creer un compte</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
        <a
          href="#"
          class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
          aria-current="page"
          >Bibliothèque</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Ajouter un Livre</a
        >
        <a
          href="#"
          class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          >Se connecter</a
        >
      </div>
    </div>
  </nav>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
