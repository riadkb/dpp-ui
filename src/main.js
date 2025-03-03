import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "../src/style.css"; // Ensure Tailwind is imported

const app = createApp(App);
app.use(router);
app.mount("#app");
