import type P5 from "p5";
import type { Vector } from "p5";

const G = 9.8;

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
