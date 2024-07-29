import Particle from "./particle";

class Explosion {
  constructor(x, y, game, size, color) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.radius = 0;
    this.radiusInitialSpeed = 4;
    this.radiusSpeed = this.radiusInitialSpeed;
    this.radiusAcceleration = 0.98;
    this.gravityY = 1;
    this.color = color || 60;
    const particleCount = size || 100;

    this.markedToDelete = false;

    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(x, y, this));
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

    this.radiusSpeed *= this.radiusAcceleration;
    this.radius += this.radiusSpeed;
    this.y += this.gravityY;
  }
  draw() {
    const { ctx } = this.game;
    this.particles.forEach((particle) => particle.draw(ctx));
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
