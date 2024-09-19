<script setup>
import Books from "./components/books.vue";
import AddBook from "./components/addBook.vue";
import { ref, computed } from "vue";

const books = ref([]);

fetch("http://localhost:3000/getLibrary")
  .then((response) => response.json())
  .then((backendBooks) => {
    books.value = backendBooks;
    // console.log(backendBooks);
  });
</script>

<template>
  <div>
    <h1>Track Books</h1>
    <div className="app">
      <Books :books="books" />
      <AddBook />
    </div>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  align-items: start;
  justify-content: center;
}
</style>
