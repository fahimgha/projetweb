<template>
  <div class="container">
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
      />
      <input
        type="text"
        id="password"
        v-model="password"
        placeholder="Password"
        class="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
      />
      <button
        type="submit"
        class="bg-blue text-white font-bold py-2 px-4 rounded border block mx-auto w-full"
      >
        Sign up
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const username = ref("");
const password = ref("");

const submitForm = async () => {
  //   const url = this.isLogin ? 'http://localhost:3000/login' : 'http://localhost:3000/signup';
  try {
    const response = await fetch("http://localhost:3000/signup", {
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
    alert("Signup successful! Please login.");
  } catch (error) {
    alert(error.message);
  }
};
</script>
