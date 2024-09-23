<script setup>
import DeleteButton from "./deleteBook.vue";
import EditBook from "./editBook.vue";

defineProps({
  books: Array,
});
</script>

<template>
  <div class="">
    <h1 class="text-xl">Ma Bibliothèque</h1>
    <div
      v-for="book in books"
      class="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-72"
    >
      <div class="p-6">
        <h5
          class="block mb-2 font-sans text-xl antialiased font-semibold tracking-normal text-blue-gray-900"
        >
          {{ book.name }}
        </h5>
        <div class="flex">
          <div
            class="text-xs text-sky-700 bg-sky-500/50 rounded p-1 font-extrabold"
          >
            AUTEUR
          </div>
          <p class="flex font-sans font-light text-inherit mb-2">
            {{ book.author }}
          </p>
        </div>
        <div class="flex">
          <div
            class="text-xs text-sky-700 bg-sky-500/50 rounded p-1 font-extrabold"
          >
            STATUS
          </div>
          <p class="flex font-light leading-relaxed text-inherit">
            {{ book.status }}
          </p>
        </div>
      </div>
      <div class="p-6 pt-0 flex justify-around items-center">
        <DeleteButton :bookId="book._id" />
        <EditBook :bookId="book._id" />
      </div>
    </div>
  </div>
  <!-- <div id="app">
    <h2>Liste des Livres</h2>
    <div v-if="books.length">
      <ul>
        <li v-for="book in books">
          <strong>{{ book.name }}</strong>
          <div className="tag">
            <span id="button">Auteur</span>

            <p>{{ book.author }}</p>
          </div>
          <div className="tag">
            <span id="button">Status</span>
            <p>{{ book.status }}</p>
          </div>
          <DeleteButton :bookId="book._id" />
          <div>
            <EditBook :bookId="book._id" />
          </div>
        </li>
      </ul>
    </div>
    <div v-else>
      <p>Aucun livre disponible.</p>
    </div>
  </div> -->
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
}
.tag {
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
