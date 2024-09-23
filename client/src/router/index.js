import { createRouter, createWebHistory } from "vue-router";
import PageBooks from "../pages/booksPage.vue";
import AddBooks from "../components/addBook.vue";
import Login from "../components/login.vue";
import Signup from "../components/signup.vue";

const routes = [
  { path: "/login", component: Login }, // Page de connexion accessible à tous
  { path: "/signup", component: Signup }, // Page d'inscription accessible à tous
  {
    path: "/", // Page de la bibliothèque (route protégée)
    component: PageBooks,
    meta: { requiresAuth: true }, // Nécessite une authentification
  },
  {
    path: "/addBook", // Page pour ajouter un livre (route protégée)
    component: AddBooks,
    meta: { requiresAuth: true }, // Nécessite une authentification
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token"); // Vérifie si l'utilisateur a un token

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Si l'utilisateur n'est pas authentifié, redirige vers la page de connexion
      next("/login");
    } else {
      // Si authentifié, accès autorisé
      next();
    }
  } else {
    // Pour les routes qui ne nécessitent pas d'authentification (login/signup), accès autorisé
    next();
  }
});

export default router;
