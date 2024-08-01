class Particle {
  constructor(explosion, size) {
    this.explosion = explosion;
    this.name = "Particle";
    //
    this.x = explosion.x;
    this.y = explosion.y;
    this.radius = Math.random() * 14 + 3;
    this.duration = size * Math.random() * 1600 + 300;
    this.bornTime = Math.random() * 400;
    this.time = this.duration;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 3;

    this.speed = Math.random() * 3;
    this.speedY = 0.06;
    this.angle = Math.random() * Math.PI * 2;
    this.acceleration = 0.98;
    //
    this.markedToDelete = false;
  }
  update(timeFrame) {
    if (this.bornTime <= 0) {
      this.time -= timeFrame;
      if (this.time < 0) {
        this.markedToDelete = true;
        return;
      }

      this.speed *= this.acceleration;
      this.speedY *= this.explosion.gravityY;

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.speedY;
    } else {
      this.bornTime -= timeFrame;
    }
    if (this.y > this.explosion.game.height) {
      this.markedToDelete = true;
    }
  }
  draw(ctx) {
    if (this.bornTime <= 0) {
      ctx.save();
      const age = Math.max(0, this.time / this.duration);
      const color = this.explosion.color * age;
      const light = 22 * age + 20;
      //ctx.globalAlpha = age;
      const dr = age;
      ctx.fillStyle = `hsl(${color}, 100%, ${light}%)`;
      ctx.beginPath();
      ctx.ellipse(
        this.x,
        this.y,
        this.radius * dr,
        this.radius * dr,
        0,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }
}

export default Particle;
