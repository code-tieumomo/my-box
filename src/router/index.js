import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../views/layouts/AuthLayout.vue";
import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import AppLayout from "../views/layouts/AppLayout.vue";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { requiresAuth: true },
    component: AppLayout,
    children: [
      { path: "/dashboard", name: "Dashboard" }
    ]
  },
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
        component: Login,
        meta: {
          title: "Login | MyBox"
        }
      },
      {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
          title: "Register | MyBox"
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.token) {
    next({ name: "login" });
  } else if (store.state.user.token && (to.name === "login" || to.name === "register")) {
    next({ name: "home" });
  } else {
    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);
    const nearestWithMeta = to.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags);

    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title;
    } else if (previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title;
    }

    Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map(el => el.parentNode.removeChild(el));

    if (!nearestWithMeta) return next();
    nearestWithMeta.meta.metaTags.map(tagDef => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    }).forEach(tag => document.head.appendChild(tag));

    next();
  }
});

export default router;
