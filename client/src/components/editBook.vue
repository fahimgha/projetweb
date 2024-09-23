<script setup>
import { ref } from "vue";
import { useBooksStore } from "../stores/booksStore";

const booksStore = useBooksStore();

const props = defineProps({
  bookId: String,
});

const newBook = ref({
  name: "",
  author: "",
  status: "",
});
var clicked = ref(false);

const changeToForm = () => {
  clicked.value = true;
};
const checkForm = async (e) => {
  e.preventDefault();
  await booksStore.editBook(newBook.value, props.bookId);
  clicked.value = false;
};
</script>

<template>
  <div class="edit-book">
    <div v-if="!clicked">
      <div>
        <button
          @click="changeToForm()"
          class="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          type="button"
        >
          Editer
        </button>
      </div>
    </div>

    <div v-else>
      <form @submit="checkForm" method="post">
        <div className="form-item">
          <label for="name">Nom du livre</label>
          <input
            id="name"
            v-model="newBook.name"
            type="text"
            name="name"
            required
          />
        </div>
        <div className="form-item">
          <label for="author">Auteur</label>
          <input id="author" v-model="newBook.author" type="text" name="name" />
        </div>
        <div className="form-item">
          <label for="status">Status</label>
          <select id="status" v-model="newBook.status" name="status" required>
            <option value="" disabled>Choisissez le statut</option>
            <option value="lu">Lu</option>
            <option value="à lire">À lire</option>
          </select>
        </div>

        <p>
          <input type="submit" value="Submit" />
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
