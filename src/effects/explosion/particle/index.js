class Particle {
  constructor(explosion) {
    this.explosion = explosion;
    //
    this.x = explosion.x;
    this.y = explosion.y;
    this.radius = Math.random() * 14 + 3;
    this.duration = Math.random() * 1600 + 300;
    this.bornTime = Math.random() * 400;
    this.time = this.duration;
    this.speedX = Math.random() * 6 - 2;
    this.speedY = Math.random() * 6 - 2;
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
      this.speedX *= this.acceleration;
      this.speedY *= this.acceleration;
      this.x += this.speedX;
      this.y += this.speedY + this.explosion.gravityY;
    } else {
      this.bornTime -= timeFrame;
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
