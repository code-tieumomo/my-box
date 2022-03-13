import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import "mosha-vue-toastify/dist/style.css";

import "./assets/styles/global.css";

createApp(App).use(store).use(router).use(VueSweetalert2).mount("#app");
