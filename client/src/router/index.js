import { createRouter, createWebHistory } from "vue-router";
import PageBooks from "../pages/booksPage.vue";
import AddBooks from "../components/addBook.vue";
import Login from "../components/login.vue";
import Signup from "../components/signup.vue";

const routes = [
  { path: "/", component: PageBooks },
  { path: "/addBook", component: AddBooks },
  { path: "/login", component: Login },
  { path: "/signup", component: Signup },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
