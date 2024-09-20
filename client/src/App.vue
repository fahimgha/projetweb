<script setup>
import NavBar from "./components/navBar.vue";
import { ref, computed } from "vue";
</script>

<template>
  <div className="app">
    <h1>Track Books</h1>
    <NavBar />
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}
</style>
