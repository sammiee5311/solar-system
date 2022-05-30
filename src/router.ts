import { createRouter, createWebHistory } from "vue-router";

import Home from "./views/Home.vue";
import SolarSystem from "./views/SolarSystem.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/solar",
      name: "Solar",
      component: SolarSystem,
    },
  ],
});

export default router;
