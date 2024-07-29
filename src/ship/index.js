import Body from "../body";
import Projectile from "../projectiles";
import Explosion from "../effects/explosion";
import Sound from "../sound";

class Ship extends Body {
  constructor(game) {
    super(-100, -100, game);
    this.width = 45;
    this.height = 65;
    this.x = 0.5 * this.game.width;
    this.y = 0.8 * this.game.height;
    //
    this.speedX = 0;
    this.speedY = 0;
    this.currentSpeedX = 0;
    this.currentSpeedY = 0;
    this.maxSpeed = 6;
    this.acceleration = 0.1;
    //
    this.inclination = 0;
    this.wingSpan = this.width * 0.9;
    //
    this.maxLifes = 5;
    this.lifes = this.maxLifes;
    //
    this.maxProjectileCharge = 20;
    this.projectileCharge = this.maxProjectileCharge;
    this.projectileChargeInterval = 500;
    this.projectileChargeWait = 0;
    //
    this.shootInterval = 140;
    this.shootWait = this.shootInterval;
    //
    this.damaged = false;
    this.damageInterval = 1000;
    this.damageTimer = 0;
    //
    this.overPowered = false;
    this.overPoweredTimer = 0;
    this.overPoweredDuration = 10000;
    //
    this.shootSound = new Sound("laser");
    this.shootOverPoweredSound = new Sound("laser2");
    this.getOverPoweredSound = new Sound("powerUp");
  }
  update(timeFrame) {
    if (!this.game.started || this.game.paused) return;
    this.move();
    this.shoot(timeFrame);
    this.detectHitEnemies();
    this.updateDamageAnimation(timeFrame);
    this.updateOverPower(timeFrame);
  }
  draw() {
    if (!this.lifes) {
      return;
    }
    const { ctx } = this.game;
    const { wingSpan, inclination } = this;

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
    const iLeft = inclination < 0 ? 9 * inclination : 0;
    const iRight = inclination > 0 ? 9 * inclination : 0;
    ctx.fillStyle = `hsl(${colorTone * 180}, 100%, ${60 + 9 * inclination}%)`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height * 0.1);
    ctx.lineTo(this.x + leafSpan + iRight, this.y + this.height * 0.5);
    ctx.lineTo(this.x, this.y + this.height * 0.7);
    ctx.lineTo(this.x - leafSpan + iLeft, this.y + this.height * 0.5);
    ctx.closePath();
    ctx.fill();

    // overPowered
    if (this.overPowered) {
      const overPoweredSpanX = this.width * 0.2;
      ctx.fillStyle = `hsl(180, 100%, 60%)`;
      //
      ctx.beginPath();
      ctx.moveTo(this.x - wingSpan, this.y - this.height * 0.4);
      ctx.lineTo(
        this.x - wingSpan + overPoweredSpanX,
        this.y + this.height * 0.2
      );
      ctx.lineTo(this.x - wingSpan, this.y + this.height * 0.4);
      ctx.lineTo(
        this.x - wingSpan - overPoweredSpanX,
        this.y + this.height * 0.2
      );
      ctx.closePath();
      ctx.fill();
      //
      ctx.beginPath();
      ctx.moveTo(this.x + wingSpan, this.y - this.height * 0.4);
      ctx.lineTo(
        this.x + wingSpan + overPoweredSpanX,
        this.y + this.height * 0.2
      );
      ctx.lineTo(this.x + wingSpan, this.y + this.height * 0.4);
      ctx.lineTo(
        this.x + wingSpan - overPoweredSpanX,
        this.y + this.height * 0.2
      );
      ctx.closePath();
      ctx.fill();
    }
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

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x - this.width / 2 < 0) {
      this.x = this.width / 2;
    }
    if (this.x + this.width / 2 > this.game.width) {
      this.x = this.game.width - this.width / 2;
    }

    if (this.y - this.height / 2 < 0) {
      this.y = this.height / 2;
    }
    if (this.y + this.height / 2 > this.game.height) {
      this.y = this.game.height - this.height / 2;
    }
    //
    this.inclination = this.speedX / this.maxSpeed;
    this.wingSpan =
      this.width * 0.9 - Math.abs(this.inclination) * this.width * 0.3;
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
      this.shootSound.play();
      this.game.projectiles.push(
        new Projectile(this.x, this.y - this.height * 0.4, this.game)
      );
      if (this.overPowered) {
        this.shootOverPoweredSound.play();
        this.game.projectiles.push(
          new Projectile(
            this.x - this.wingSpan,
            this.y - this.height * 0.5,
            this.game
          )
        );
        this.game.projectiles.push(
          new Projectile(
            this.x + this.wingSpan,
            this.y - this.height * 0.5,
            this.game
          )
        );
      }

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
          new Explosion(enemy.x, enemy.y, this.game, 100, 20)
        );
        this.game.shake();
        this.damaged = true;
        this.overPowered = false;
        this.lifes--;
      }
    });
    if (!this.lifes) {
      this.game.endGame();
    }
  }
  updateDamageAnimation(timeFrame) {
    if (this.damaged) {
      this.damageTimer += timeFrame;
      if (this.damageTimer >= this.damageInterval) {
        this.damaged = false;
        this.damageTimer = 0;
      }
    }
  }
  updateOverPower(timeFrame) {
    this.game.overpowers.forEach((overpower) => {
      if (this.detectCollision(overpower) && !this.overPowered) {
        overpower.markedToDelete = true;
        this.overPowered = true;
        this.overPoweredTimer = 0;
        this.projectileCharge = this.maxProjectileCharge;
        this.getOverPoweredSound.play();
      }
    });

    if (this.overPowered) {
      this.overPoweredTimer += timeFrame;
      if (this.overPoweredTimer >= this.overPoweredDuration) {
        this.overPowered = false;
      }
    }
  }
  reset() {
    this.x = 0.5 * this.game.width;
    this.y = 0.8 * this.game.height;
    this.lifes = this.maxLifes;
    this.projectileCharge = this.maxProjectileCharge;
    this.projectileChargeWait = 0;
    this.shootWait = this.shootInterval;
    this.damaged = false;
    this.damageTimer = 0;
    this.overPowered = false;
  }
}

export default Ship;
