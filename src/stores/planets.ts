import { defineStore } from "pinia";
import type Planet from "@/computes/planet";

export const useState = defineStore({
  id: "planets",
  state: (): { planets: Planet[] } => ({
    planets: [],
  }),
});
