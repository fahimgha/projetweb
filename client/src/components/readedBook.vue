<script setup>
import DeleteButton from "./deleteBook.vue";
defineProps({
  readedbooks: Array,
});
</script>

<template>
  <div>
    <div>
      <h1 class="text-xl font-semibold text-left">Tous mes livres lus :</h1>
    </div>

    <div class="mt-6" v-if="readedbooks.length">
      <ul>
        <ul>
          <li v-for="book in readedbooks" :key="book._id">
            <strong>{{ book.name }}</strong> - Auteur: {{ book.author }}
          </li>
        </ul>
      </ul>
    </div>
    <div v-else>
      <p>Aucun livre disponible.</p>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
.status {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  margin-bottom: 0.2rem;
}

ul {
  list-style-type: none;
  padding: 0;
}
p {
  margin: 0;
}

li {
  width: 250px;
  background: rgba(249, 249, 249, 0.7);
  color: black;
  padding: 1rem;
  margin-bottom: 10px;
  border-radius: 5px;
}
#button {
  background-color: rgba(49, 85, 193, 0.16);
  padding: 0 0.3rem;
  border-radius: 0.3rem;
  color: rgb(49, 85, 193);
  font-weight: 600;
}
</style>
