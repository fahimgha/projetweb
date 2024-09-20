<script setup>
import { ref } from "vue";
import Books from "../components/books.vue";
import ReadedBooks from "../components/readedBook.vue";

const books = ref([]);
const readedBooks = ref([]);

fetch("http://localhost:3000/getLibrary")
  .then((response) => response.json())
  .then((backendBooks) => {
    books.value = backendBooks;
    // console.log(backendBooks);
  });

fetch("http://localhost:3000/getReadedBook?status=lu")
  .then((response) => response.json())
  .then((backendBooks) => {
    readedBooks.value = backendBooks; // seulement les livres avec status = lu
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des livres:", error);
  });
</script>

<template>
  <div>
    <div className="app">
      <Books :books="books" />
      <ReadedBooks :readedbooks="readedBooks" />
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
