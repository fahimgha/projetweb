import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./assets/tailwind.css";
import router from "./router/index";
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount("#app");
