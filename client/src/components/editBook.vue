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
// const editBook = async () => {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/editBook/${props.bookId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newBook.value),
//       }
//     );
//     console.log(newBook.value);
//     if (response.ok) {
//       console.log("Livre edité avec succès");
//       // Vous pouvez ajouter une logique pour actualiser la liste des livres ici
//     } else {
//       console.error("Erreur lors de la modification du livre");
//     }
//   } catch (error) {
//     console.error("Erreur lors de la requête PUT:", error);
//   }
// };
const checkForm = async (e) => {
  e.preventDefault();
  await booksStore.editBook(newBook.value, props.bookId);
  clicked.value = false;
};
</script>

<template>
  <div class="edit-book">
    <div v-if="!clicked">
      <button @click="changeToForm()">Edit</button>
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
