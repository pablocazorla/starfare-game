import Body from "../body/index.js";
import Explosion from "../effects/explosion/index.js";
import Graphics from "../utils/graphic";

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
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() + 1;

    this.impactY = 0;
    this.maxImpactY = 8;
    this.impactYacceleration = 0.9;
    this.explotionSize = 1;
  }
  updateEnemy() {
    this.game.bullets.forEach((projectile) => {
      if (this.detectCollision(projectile)) {
        this.lifes--;
        this.impactY = this.maxImpactY;
        projectile.markedToDelete = true;
      }
    });
    if (this.lifes <= 0) {
      this.game.score += this.value;
      this.markedToDelete = true;
      this.game.explosions.push(
        new Explosion(this.x, this.y, this.game, this.explotionSize)
      );
      if (this.afterDelete) {
        this.afterDelete();
      }
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
    this.impactY *= this.impactYacceleration;
  }
  drawLifes(yPos = 0) {
    const { ctx } = this.game;

    const G = Graphics(ctx);

    ctx.save();

    // Line of Lifes
    const lineLifeWidth = this.width * 0.3;
    const lineLifeHeight = 3;

    G.rect(
      "#333",
      this.x - 0.5 * lineLifeWidth,
      this.y + 0.5 * this.height - this.impactY + yPos,
      lineLifeWidth,
      lineLifeHeight
    ).rect(
      "#F60",
      this.x - 0.5 * lineLifeWidth,
      this.y + 0.5 * this.height - this.impactY + yPos,
      (lineLifeWidth * this.lifes) / this.maxLifes,
      lineLifeHeight
    );

    ctx.restore();
  }
}

export default Enemy;
