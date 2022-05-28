import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SolarSystemView from "../views/SolarSystemView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
    },
    {
      path: "/solar",
      name: "Solar",
      component: SolarSystemView,
    },
  ],
});

export default router;
