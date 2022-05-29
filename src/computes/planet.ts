import type P5 from "p5";
import type { Vector } from "p5";

const G = 9.8;
const destabilise = 0.05;

export const getPlanetPosition = (radius: number, p5: P5) => {
  const r = p5.random(radius, p5.min(window.innerHeight / 2, window.innerWidth / 2));
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

class Planet {
  public r: number;
  constructor(public mass: number, public pos: Vector, public vel: Vector, private p5: P5) {
    this.mass = mass;
    this.pos = pos;
    this.vel = vel;
    this.r = this.mass;
    this.p5 = p5;
  }

  show(color: number[]) {
    this.p5.noStroke();
    this.p5.fill(color);
    this.p5.ellipse(this.pos.x, this.pos.y, this.r);
  }

  move() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  applyForce(f: Vector) {
    this.vel.x += f.x / this.mass;
    this.vel.y += f.y / this.mass;
  }

  attract(child: Planet) {
    const r = this.p5.dist(this.pos.x, this.pos.y, child.pos.x, child.pos.y);
    const f = this.pos.copy().sub(child.pos);
    f.setMag((G * this.mass * child.mass) / (r * r));
    child.applyForce(f);
  }
}

export default Planet;
