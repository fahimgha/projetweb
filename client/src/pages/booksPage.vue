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
</script>

<template>
  <div>
    <div class="app flex flex-col justify-center">
      <div class="my-10">
        <h1 class="text-xl font-semibold">Ma Bibliothèque</h1>
      </div>
      <div class="flex space-x-10">
        <Books :books="booksStore.books" />
        <ReadedBooks :readedbooks="readedBooksStore.readedBooks" />
      </div>
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
