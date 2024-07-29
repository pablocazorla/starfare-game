import Body from "../body/index.js";
import Explosion from "../effects/explosion/index.js";
import AnimationFrame from "../animationFrame/index.js";

class Enemy extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.width = 90;
    this.height = 50;
    this.maxLifes = 3;
    this.lifes = this.maxLifes;
    this.value = 15;
    //
    this.speedX = Math.random() * 2 - 3;
    this.speedY = Math.random() * 1 + 1;

    this.animationBreath = new AnimationFrame(8, 1000);
    this.animationEye = new AnimationFrame(6, 2400);
  }
  update(timeframe) {
    this.animationBreath.update(timeframe);
    this.animationEye.update(timeframe);

    this.game.projectiles.forEach((projectile) => {
      if (this.detectCollision(projectile)) {
        this.lifes--;
        projectile.markedToDelete = true;
      }
    });
    if (this.lifes <= 0) {
      this.game.score += this.value;
      this.markedToDelete = true;
      this.game.explosions.push(new Explosion(this.x, this.y, this.game, 100));
    }

    // Move
    if (this.x < 0.5 * this.width) {
      this.speedX *= -1;
      this.x = 0.5 * this.width;
    }
    if (this.x > this.game.width - 0.5 * this.width) {
      this.speedX *= -1;
      this.x = this.game.width - 0.5 * this.width;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > this.game.height + this.height) {
      this.markedToDelete = true;
    }
  }
  draw() {
    const { ctx } = this.game;
    ctx.save();

    const frameBreath = -4 * Math.abs(this.animationBreath.frame - 4);

    // BODY TUBE
    ctx.fillStyle = "rgba(85, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.width * 0.46 + 0.2 * frameBreath,
      this.height * 0.2,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // WINGS
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y + 0.1 * frameBreath,
      this.width + 0.4 * frameBreath
    );
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 1)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      (this.width + 0.7 * frameBreath) / 2,
      this.height * 0.6,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // EYE
    const frameEye = this.animationEye.frame;
    ctx.fillStyle = "rgba(190, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.width * (frameEye === 0 ? 0.24 : 0.2),
      this.width * 0.2,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(50, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      frameEye === 0 ? this.width * 0.18 : this.width * 0.05,
      frameEye === 0 ? this.width * 0.01 : this.width * 0.18,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // Line of Lifes
    const lineLifeWidth = this.width * 0.3;
    const lineLifeHeight = 3;

    ctx.fillStyle = "#333";
    ctx.fillRect(
      this.x - 0.5 * lineLifeWidth,
      this.y + 0.5 * this.height,
      lineLifeWidth,
      lineLifeHeight
    );

    ctx.fillStyle = "#F60";
    ctx.fillRect(
      this.x - 0.5 * lineLifeWidth,
      this.y + 0.5 * this.height,
      (lineLifeWidth * this.lifes) / this.maxLifes,
      lineLifeHeight
    );

    ctx.restore();
    this.debugDraw();
  }
}

export default Enemy;
