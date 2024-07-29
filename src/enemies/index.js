import Body from "../body/index.js";
import Explosion from "../effects/explosion/index.js";

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

    this.animationDuration = 2000;
    this.animationTimer = 0;
  }
  update(timeframe) {
    this.animationTimer += timeframe;
    if (this.animationTimer >= this.animationDuration) {
      this.animationTimer = 0;
    }

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

    const frame =
      -4 * Math.abs((Math.round(this.animationTimer / 125) % 8) - 4);

    ctx.fillStyle = "rgba(85, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.width * 0.46 + 0.6 * frame,
      this.height * 0.2,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y + 0.1 * frame,
      this.width + frame
    );
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 1)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      (this.width + frame) / 2,
      this.height * 0.6,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(190, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.width * 0.2,
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
      this.width * 0.05,
      this.width * 0.18,
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
