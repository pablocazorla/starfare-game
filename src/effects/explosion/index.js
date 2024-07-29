import Particle from "./particle";
import Sound from "../../sound";

class Explosion {
  constructor(x, y, game, size, color) {
    this.game = game;
    this.x = x;
    this.y = y;
    //
    this.radius = 0;
    this.radiusInitialSpeed = 4;
    this.radiusSpeed = this.radiusInitialSpeed;
    this.radiusAcceleration = 0.98;
    this.gravityY = 1;
    this.color = color || 60;
    //
    this.particles = [];
    for (let i = 0; i < (size || 100); i++) {
      this.particles.push(new Particle(this));
    }
    //
    this.markedToDelete = false;
    //
    this.boomSound = new Sound("boom");
    this.boomSound2 = new Sound("boom2");
    if (color) {
      this.boomSound2.setVolume(0.8).play();
    } else {
      this.boomSound.setVolume(0.5).play();
    }
  }
  update(timeFrame) {
    this.particles = this.particles.filter(
      (particle) => !particle.markedToDelete
    );
    if (!this.particles.length) {
      this.markedToDelete = true;
      return;
    }
    this.particles.forEach((particle) => particle.update(timeFrame));
    //
    this.radiusSpeed *= this.radiusAcceleration;
    this.radius += this.radiusSpeed;
    this.y += this.gravityY;
  }
  draw() {
    const { ctx } = this.game;
    //
    this.particles.forEach((particle) => particle.draw(ctx));
    //
    ctx.save();
    const age = this.radiusSpeed / this.radiusInitialSpeed;
    const color = 4;
    const light = 22 * age + 20;
    ctx.globalAlpha = Math.max(0, age * 0.5 - 0.1);
    ctx.fillStyle = `hsl(${color}, 100%, ${light}%)`;
    ctx.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

export default Explosion;
