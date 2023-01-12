// Composables
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("@/layouts/default/Default.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
      },
      /*
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
      },
      */
      {
        path: "/config",
        name: "Config",
        component: () => import("@/views/Config.vue"),
      }
    ],
  },
  {
    path: "/login",
    component: () => import("@/layouts/login/LoginLayout.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
