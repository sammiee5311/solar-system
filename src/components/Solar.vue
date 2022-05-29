<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import P5 from "p5";
import Planet, { getPlanetPosition, getPlanetVelocity } from "../computes/planet";

const planetNum = 5;
const planets: Planet[] = [];

let p5: P5;
let sun: Planet;
let planet: Planet;

const resizeWindow = () => {
  if (p5) {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  }
};

onMounted(() => {
  const script = (p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      sun = new Planet(100, p5.createVector(0, 0), p5.createVector(0, 0), p5);

      for (let i = 0; i < planetNum; i++) {
        const planetPos = getPlanetPosition(sun.r, p5);
        const planetVel = getPlanetVelocity(planetPos.copy(), sun, p5);

        planet = new Planet(p5.random(10, 30), planetPos, planetVel, p5);

        planets.push(planet);
      }

      planets.sort((a: Planet, b: Planet) => b.mass - a.mass);
    };

    p5.draw = () => {
      p5.translate(p5.width / 2, p5.height / 2);
      p5.background(0);

      planets.forEach((planet) => {
        sun.attract(planet);
        planet.move();
        planet.show([255, 255, 255]);
      });

      sun.show([255, 117, 0]);
    };
  };

  p5 = new P5(script);

  window.addEventListener("resize", resizeWindow);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeWindow);
});
</script>

<template></template>

<style scoped></style>
