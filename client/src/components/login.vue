<template>
  <div class="container">
    <h2 class="text-3xl mt-5 py-10">Se connecter</h2>
    <form
      @submit.prevent="submitForm"
      class="bg-blue text-center w-1/3 px-3 py-4 text-white mx-auto rounded"
    >
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="Username"
        class="block w-full mx-auto text-sm py-2 px-3 rounded"
        required
      />
      <input
        type="text"
        id="password"
        v-model="password"
        placeholder="Password"
        class="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
        required
      />
      <button
        type="submit"
        class="bg-blue text-white font-bold py-2 px-4 rounded border block mx-auto w-full"
      >
        Connexion
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
const username = ref("");
const password = ref("");

const router = useRouter();
const authStore = useAuthStore();

const submitForm = async () => {
  //   const url = this.isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/signup';
  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An error occurred");
    }

    authStore.login(data.token); // Stockage du token
    alert("Login successful!");
    router.push("/");
  } catch (error) {
    alert(error.message);
  }
};
</script>
