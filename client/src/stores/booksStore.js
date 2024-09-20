import { defineStore } from "pinia";
import { ref } from "vue";

export const useBooksStore = defineStore("books", () => {
  const books = ref([]);
  const readedBooks = ref([]);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/getLibrary");
      books.value = await response.json();
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
    }
  };

  const addBook = async (newBook) => {
    try {
      const response = await fetch("http://localhost:3000/newBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      });
      const result = await response.json();
      books.value.push(result);
    } catch (error) {
      console.error("Erreur lors de l'ajout du livre:", error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:3000/deleteBook/${bookId}`, {
        method: "DELETE",
      });
      books.value = books.value.filter((book) => book._id !== bookId);
    } catch (error) {
      console.error("Erreur lors de la suppression du livre:", error);
    }
  };

  const fetchReadedBooks = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/getReadedBook?status=lu"
      );
      const backendBooks = await response.json();
      readedBooks.value = backendBooks; // Mettre à jour les livres avec le statut "lu"
    } catch (error) {
      console.error("Erreur lors de la récupération des livres:", error);
    }
  };

  // const filterReadBooks = () => {
  //   return books.value.filter((book) => book.status === "lu");
  // };

  return {
    books,
    readedBooks,
    fetchBooks,
    addBook,
    deleteBook,
    fetchReadedBooks,
  };
});
