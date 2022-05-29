<script setup lang="ts">
import { onMounted, onUnmounted, computed } from "vue";
import { useState } from "../stores/planets";
import P5 from "p5";
import Planet, { getPlanetVelocity } from "../computes/planet";

const state = useState();

const planets = computed(() => state.planets);

let p5: P5;
let sun: Planet;
let planet: Planet;
const sunRadius = 50;

const resizeWindow = () => {
  if (p5) {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
  }
};

onMounted(() => {
  const script = (p5: P5) => {
    p5.setup = () => {
      p5.createCanvas(window.innerWidth, window.innerHeight);
      sun = new Planet(sunRadius * 2, p5.createVector(0, 0), p5.createVector(0, 0), p5);
    };

    p5.draw = () => {
      p5.background(0);
      p5.translate(p5.width / 2, p5.height / 2);
      p5.textSize(30);
      p5.textFont("Georgia");
      p5.text("Click to create planets", -(p5.width / 2), p5.height / 2 - 10);

      (<Planet[]>planets.value).forEach((planet) => {
        sun.attract(planet);
        planet.move();
        planet.show([255, 255, 255]);
      });

      sun.show([255, 117, 0]);
    };

    p5.mouseClicked = () => {
      // const magnitude = p5.mag(p5.mouseX - p5.floor(p5.width / 2), p5.mouseY - p5.floor(p5.height / 2));
      const planetRadius = p5.random(10, 30);
      const planetPos = p5.createVector(p5.mouseX - p5.floor(p5.width / 2), p5.mouseY - p5.floor(p5.height / 2));
      const planetVel = getPlanetVelocity(planetPos.copy(), sun, p5);

      planet = new Planet(planetRadius, planetPos, planetVel, p5);

      planets.value.push(planet);
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
