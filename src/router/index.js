import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../views/layouts/AuthLayout.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";

const routes = [
  {
    path: "/auth",
    redirect: "/login",
    name: "auth",
    component: AuthLayout,
    meta: {
      isGuest: true
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//
// });

export default router;
