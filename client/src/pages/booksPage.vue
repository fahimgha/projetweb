<script setup>
import { ref, onMounted } from "vue";
import Books from "../components/books.vue";
import ReadedBooks from "../components/readedBook.vue";
import { useBooksStore } from "../stores/booksStore";

const booksStore = useBooksStore();
const readedBooksStore = useBooksStore();

onMounted(() => {
  booksStore.fetchBooks();
  readedBooksStore.fetchReadedBooks();
});

// const books = ref([]);
// const readedBooks = ref([]);

// fetch("http://localhost:3000/getLibrary")
//   .then((response) => response.json())
//   .then((backendBooks) => {
//     books.value = backendBooks;
//     // console.log(backendBooks);
//   });

// fetch("http://localhost:3000/getReadedBook?status=lu")
//   .then((response) => response.json())
//   .then((backendBooks) => {
//     readedBooks.value = backendBooks; // seulement les livres avec status = lu
//   })
//   .catch((error) => {
//     console.error("Erreur lors de la récupération des livres:", error);
//   });
</script>

<template>
  <div>
    <div className="app">
      <Books :books="booksStore.books" />
      <ReadedBooks :readedbooks="readedBooksStore.readedBooks" />
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
