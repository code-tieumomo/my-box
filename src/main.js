import { createApp } from "vue";
import store from "./store";
import router from "./router";
import App from "./App.vue";

import "./assets/styles/global.css";

import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

createApp(App).use(store).use(router).use(VueSweetalert2).use(VueToast).mount("#app");
