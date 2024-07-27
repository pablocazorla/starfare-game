import Body from "./body.js";
import Projectile from "./projectile.js";
import Explosion from "./explosion.js";

class Ship extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.initialX = x;
    this.initialY = y;
    this.width = 45;
    this.height = 65;
    //
    this.speedX = 0;
    this.speedY = 0;
    this.currentSpeedX = 0;
    this.currentSpeedY = 0;
    this.maxSpeed = 6;
    this.acceleration = 0.1;
    //
    this.wingSpan = this.width * 0.9;
    //
    this.maxLifes = 5;
    this.lifes = this.maxLifes;
    this.maxProjectileCharge = 20;
    this.projectileCharge = this.maxProjectileCharge;
    this.projectileChargeInterval = 500;
    this.projectileChargeWait = 0;

    this.shootInterval = 140;
    this.shootWait = this.shootInterval;
    //
    this.damaged = false;
    this.damageInterval = 1000;
    this.damageTimer = 0;
  }
  update(timeFrame) {
    if (!this.game.started) {
      return;
    }
    this.move();
    this.shoot(timeFrame);
    this.detectHitEnemies();
    this.setDamageAnimated(timeFrame);
  }
  draw() {
    if (!this.lifes) {
      return;
    }
    const { ctx } = this.game;

    // FIRE ROCKET
    ctx.save();
    ctx.globalAlpha = Math.random() * 0.2 + 0.2;
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y + this.height * 0.4,
      0,
      this.x,
      this.y + this.height * 0.5,
      this.width * 1.2
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 0, 1)");
    gradient.addColorStop(0.7, "rgba(255, 0, 0, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y + this.height * 0.5,
      this.width * 0.15,
      this.width * 1.7,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // SHIP BODY
    ctx.save();

    // WINGS
    const colorTone = this.damaged
      ? 1 - (Math.round(this.damageTimer / 200) % 2)
      : 1;

    const incline = this.speedX / this.maxSpeed;
    const wingSpan = this.width * 0.9 - Math.abs(incline) * this.width * 0.3;
    ctx.fillStyle = `hsl(${colorTone * 120}, 50%, 54%)`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height * 0.3);
    ctx.lineTo(this.x + wingSpan, this.y + this.height * 0.2);
    ctx.lineTo(this.x, this.y + this.height * 0.5);
    ctx.lineTo(this.x - wingSpan, this.y + this.height * 0.2);
    ctx.closePath();
    ctx.fill();

    // CABIN
    const cabinSpan = wingSpan * 0.5;
    ctx.fillStyle = `hsl(${colorTone * 150}, 100%, 30%)`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height * 0.6);
    ctx.lineTo(this.x + cabinSpan, this.y + this.height * 0.4);
    ctx.lineTo(this.x, this.y + this.height * 0.6);
    ctx.lineTo(this.x - cabinSpan, this.y + this.height * 0.4);
    ctx.closePath();
    ctx.fill();

    // AILERON
    const leafSpan = wingSpan * 0.2;
    const iLeft = incline < 0 ? 9 * incline : 0;
    const iRight = incline > 0 ? 9 * incline : 0;
    ctx.fillStyle = `hsl(${colorTone * 180}, 100%, ${60 + 9 * incline}%)`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height * 0.1);
    ctx.lineTo(this.x + leafSpan + iRight, this.y + this.height * 0.5);
    ctx.lineTo(this.x, this.y + this.height * 0.7);
    ctx.lineTo(this.x - leafSpan + iLeft, this.y + this.height * 0.5);
    ctx.closePath();
    ctx.fill();

    // end

    ctx.restore();
    this.debugDraw();
  }
  move() {
    if (this.game.input.keys["ArrowLeft"]) {
      this.currentSpeedX = -this.maxSpeed;
    } else if (this.game.input.keys["ArrowRight"]) {
      this.currentSpeedX = this.maxSpeed;
    } else {
      this.currentSpeedX = 0;
    }
    this.speedX += (this.currentSpeedX - this.speedX) * this.acceleration;

    if (this.game.input.keys["ArrowUp"]) {
      this.currentSpeedY = -this.maxSpeed;
    } else if (this.game.input.keys["ArrowDown"]) {
      this.currentSpeedY = this.maxSpeed;
    } else {
      this.currentSpeedY = 0;
    }
    this.speedY += (this.currentSpeedY - this.speedY) * this.acceleration;

    if (
      (this.x - this.width / 2 > 0 && this.speedX < 0) ||
      (this.x + this.width / 2 < this.game.width && this.speedX > 0)
    ) {
      this.x += this.speedX;
    }

    if (
      (this.y - this.height / 2 > 0 && this.speedY < 0) ||
      (this.y + this.height / 2 < this.game.height && this.speedY > 0)
    ) {
      this.y += this.speedY;
    }
  }
  shoot(timeFrame) {
    if (this.shootWait < this.shootInterval) {
      this.shootWait += timeFrame;
    }
    if (
      this.projectileCharge > 0 &&
      this.shootWait >= this.shootInterval &&
      this.game.input.keys[" "]
    ) {
      this.game.projectiles.push(new Projectile(this.x, this.y, this.game));
      this.projectileCharge--;
      this.shootWait = 0;
    }

    if (
      this.projectileCharge < this.maxProjectileCharge &&
      !this.game.input.keys[" "]
    ) {
      this.projectileChargeWait += timeFrame;
      if (this.projectileChargeWait >= this.projectileChargeInterval) {
        this.projectileCharge++;
        this.projectileChargeWait = 0;
      }
    }
  }
  detectHitEnemies() {
    this.game.enemies.forEach((enemy) => {
      if (this.detectCollision(enemy)) {
        enemy.markedToDelete = true;
        this.game.explosions.push(
          new Explosion(enemy.x, enemy.y, this.game, 100)
        );
        this.game.shake();
        this.damaged = true;
        this.lifes--;
      }
    });
    if (!this.lifes) {
      this.game.endGame();
    }
  }
  setDamageAnimated(timeFrame) {
    if (this.damaged) {
      this.damageTimer += timeFrame;
      if (this.damageTimer >= this.damageInterval) {
        this.damaged = false;
        this.damageTimer = 0;
      }
    }
  }
  reset() {
    this.x = this.initialX;
    this.y = this.initialY;
    this.lifes = this.maxLifes;
    this.projectileCharge = this.maxProjectileCharge;
    this.projectileChargeWait = 0;
    this.shootWait = this.shootInterval;
    this.damaged = false;
    this.damageTimer = 0;
  }
}

export default Ship;
