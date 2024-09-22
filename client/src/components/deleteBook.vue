<script setup>
import { useBooksStore } from "../stores/booksStore";

const booksStore = useBooksStore();

const props = defineProps({
  bookId: String,
});
const handleClick = async () => {
  // console.log("Le bouton a été cliqué pour le livre avec l'ID:", props.bookId);
  booksStore.deleteBook(props.bookId);
};
</script>

<template>
  <button @click="handleClick">Supprimer</button>
</template>
