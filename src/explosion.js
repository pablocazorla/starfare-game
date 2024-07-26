const gravityY = 1;

class Particle {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 14 + 3;
    this.game = game;
    this.duration = Math.random() * 1600 + 300;
    this.bornTime = Math.random() * 400;
    this.time = this.duration;
    this.speedX = Math.random() * 6 - 2;
    this.speedY = Math.random() * 6 - 2;
    this.acceleration = 0.98;

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
      this.y += this.speedY + gravityY;
    } else {
      this.bornTime -= timeFrame;
    }
  }
  draw(ctx) {
    if (this.bornTime <= 0) {
      ctx.save();
      const age = Math.max(0, this.time / this.duration);
      const color = 60 * age;
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

class Explosion {
  constructor(x, y, game, size) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.radius = 0;
    this.radiusInitialSpeed = 4;
    this.radiusSpeed = this.radiusInitialSpeed;
    this.radiusAcceleration = 0.98;
    const particleCount = size || 100;

    this.markedToDelete = false;

    this.particles = [];
    for (let i = 0; i < particleCount; i++) {
      this.particles.push(new Particle(x, y, game));
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
    this.y += gravityY;
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
