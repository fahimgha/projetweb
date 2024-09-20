import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import router from "./router/index";
import App from "./App.vue";
// import Chakra, { ChakraUIVuePlugin } from "@chakra-ui/vue";

const app = createApp(App);
const pinia = createPinia();
// app.use(Chakra);
app.use(pinia);
app.use(router);
app.mount("#app");
