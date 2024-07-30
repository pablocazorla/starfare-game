import Body from "../body/index.js";
import Explosion from "../effects/explosion/index.js";

class Enemy extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.type = 1;
    this.lifesDamagedOnHitShip = 1;
    this.width = 90;
    this.height = 50;
    this.maxLifes = 3;
    this.lifes = this.maxLifes;
    this.value = 15;
    this.speedX = Math.random() * 2 - 3;
    this.speedY = Math.random() * 1 + 1;
  }
  updateEnemy() {
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
  drawLifes() {
    const { ctx } = this.game;
    ctx.save();

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
  }
}

export default Enemy;
