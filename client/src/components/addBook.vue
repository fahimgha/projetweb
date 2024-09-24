<script setup>
import { ref } from "vue";
import { useBooksStore } from "../stores/booksStore";

const newBook = ref({
  name: "",
  author: "",
  status: "", // Par défaut
});

const booksStore = useBooksStore();

const checkForm = async (e) => {
  e.preventDefault();
  booksStore.addBook(newBook.value);
  newBook.value = { name: "", author: "", status: "à lire" };
};
</script>

<template>
  <div class="container">
    <h2 class="text-3xl mt-5 py-10">Ajouter un livre</h2>
    <form
      @submit="checkForm"
      method="post"
      class="bg-blue text-center w-1/3 px-3 py-4 text-white mx-auto rounded"
    >
      <input
        type="text"
        id="name"
        v-model="newBook.name"
        placeholder="nom du livre"
        class="block w-full mx-auto text-sm py-2 px-3 rounded"
        required
      />
      <input
        type="text"
        id="author"
        v-model="newBook.author"
        placeholder="auteur"
        class="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
        required
      />
      <select
        id="status"
        v-model="newBook.status"
        class="block w-full mx-auto text-sm py-2 px-3 rounded my-3"
        name="status"
        required
      >
        <option value="" disabled>Choisissez le statut</option>
        <option value="à lire">À lire</option>
        <option value="En lecture">En lecture</option>
        <option value="lu">Lu</option>
      </select>
      <button
        type="submit"
        class="bg-blue text-white font-bold py-2 px-4 rounded border block mx-auto w-full"
      >
        Ajouter
      </button>
    </form>
  </div>
</template>

<style scoped>
#app {
  text-align: center;
}

form {
  border-radius: 0.2rem;
  padding: 0.5rem;
}
.form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
