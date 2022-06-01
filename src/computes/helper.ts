import type P5 from "p5";
import type { Vector } from "p5";
import type Planet from "./planet";

const G = 9.8;
const destabilise = 0.05;

export const getPlanetPosition = (radius: number, p5: P5, pos: number = 0) => {
  const r = pos > 0 ? radius / 2 + pos : p5.random(radius, p5.min(window.innerHeight / 2, window.innerWidth / 2));
  const theta = p5.random(p5.TWO_PI);

  return p5.createVector(r * p5.cos(theta), r * p5.sin(theta));
};

export const getPlanetVelocity = (planetVel: Vector, planet: Planet, p5: P5) => {
  planetVel.rotate(p5.HALF_PI);
  planetVel.setMag(p5.sqrt((G * planet.mass) / planetVel.mag()));

  if (p5.random(1) < 0.2) {
    planetVel.mult(-1);
  }

  planetVel.mult(p5.random(1 - destabilise, 1 + destabilise));

  return planetVel;
};
