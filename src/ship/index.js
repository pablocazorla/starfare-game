import Body from "../body";
import Bullet from "../projectiles/bullet";
import Explosion from "../effects/explosion";
import Sound from "../sound";
import Graphics from "../utils/graphic";

const upgradeConfig = {
  Overpower: {
    duration: 10000,
    timer: 0,
    enabled: false,
  },
  Shield: {
    duration: 7000,
    timer: 0,
    enabled: false,
    radius: 190,
  },
  NewLifes: {
    duration: 0,
    timer: 0,
    enabled: false,
  },
};

class Ship extends Body {
  constructor(game) {
    super(-100, -100, game);
    this.name = "Ship";

    this.size = {
      width: 45,
      height: 65,
    };

    this.width = this.size.width;
    this.height = this.size.height;

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
    this.wingSpan = this.size.width * 0.9;
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
    this.upgrades = { ...upgradeConfig };
    //
    this.shootSound = new Sound(game, "laser");
    this.shootOverPoweredSound = new Sound(game, "laser2");
    this.getUpgradeSound = new Sound(game, "powerUp");
  }
  update(timeFrame) {
    if (!this.game.started || this.game.paused) return;
    this.move();
    this.shoot(timeFrame);
    this.detectHitEnemies();
    this.updateDamageAnimation(timeFrame);
    this.updateUpgrades(timeFrame);
  }
  draw() {
    if (!this.lifes) {
      return;
    }
    const { ctx } = this.game;
    const G = Graphics(ctx);
    const { wingSpan, inclination } = this;

    // FIRE ROCKET
    ctx.save();
    ctx.globalAlpha = Math.random() * 0.2 + 0.2;
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y + this.size.height * 0.4,
      0,
      this.x,
      this.y + this.size.height * 0.5,
      this.size.width * 1.2
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
    gradient.addColorStop(0.2, "rgba(255, 255, 0, 1)");
    gradient.addColorStop(0.7, "rgba(255, 0, 0, 0.8)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    G.ellipse(
      gradient,
      this.x,
      this.y + this.size.height * 0.5,
      this.size.width * 0.15,
      this.size.width * 1.7
    );
    ctx.restore();

    // SHIP BODY
    ctx.save();

    // WINGS
    const colorTone = this.damaged
      ? 1 - (Math.round(this.damageTimer / 200) % 2)
      : 1;
    G.shape(`hsl(${colorTone * 120}, 50%, 54%)`, [
      [this.x, this.y - this.size.height * 0.3],
      [this.x + wingSpan, this.y + this.size.height * 0.2],
      [this.x, this.y + this.size.height * 0.5],
      [this.x - wingSpan, this.y + this.size.height * 0.2],
    ]);

    // CABIN
    const cabinSpan = wingSpan * 0.5;
    G.shape(`hsl(${colorTone * 150}, 100%, 30%)`, [
      [this.x, this.y - this.size.height * 0.6],
      [this.x + cabinSpan, this.y + this.size.height * 0.4],
      [this.x, this.y + this.size.height * 0.6],
      [this.x - cabinSpan, this.y + this.size.height * 0.4],
    ]);

    // AILERON
    const leafSpan = wingSpan * 0.2;
    const iLeft = inclination < 0 ? 9 * inclination : 0;
    const iRight = inclination > 0 ? 9 * inclination : 0;

    G.shape(`hsl(${colorTone * 180}, 100%, ${60 + 9 * inclination}%)`, [
      [this.x, this.y + this.size.height * 0.1],
      [this.x + leafSpan + iRight, this.y + this.size.height * 0.5],
      [this.x, this.y + this.size.height * 0.7],
      [this.x - leafSpan + iLeft, this.y + this.size.height * 0.5],
    ]);

    // OverPower
    if (this.upgrades.Overpower.enabled) {
      const overPoweredSpanX = this.size.width * 0.2;

      G.shape(`hsl(180, 100%, 60%)`, [
        [this.x - wingSpan, this.y - this.size.height * 0.4],
        [this.x - wingSpan + overPoweredSpanX, this.y + this.size.height * 0.2],
        [this.x - wingSpan, this.y + this.size.height * 0.4],
        [this.x - wingSpan - overPoweredSpanX, this.y + this.size.height * 0.2],
      ]).shape(null, [
        [this.x + wingSpan, this.y - this.size.height * 0.4],
        [this.x + wingSpan + overPoweredSpanX, this.y + this.size.height * 0.2],
        [this.x + wingSpan, this.y + this.size.height * 0.4],
        [this.x + wingSpan - overPoweredSpanX, this.y + this.size.height * 0.2],
      ]);

      // Line of Upgrade
      this.drawLineOfUpgrade(G, "Overpower");
    }
    // Shield
    if (this.upgrades.Shield.enabled) {
      ctx.save();

      const gradient = ctx.createRadialGradient(
        this.x,
        this.y + 0.5 * this.width,
        0,
        this.x,
        this.y + 0.02 * this.width,
        0.5 * this.width
      );
      const light = 50;
      const saturation = 50;
      gradient.addColorStop(0, `hsla(150, ${saturation}%, ${light}%,0)`);
      gradient.addColorStop(0.7, `hsla(150, ${saturation}%, ${light}%,0.1)`);
      gradient.addColorStop(0.9, `hsla(150, ${saturation}%, ${light}%,0.4)`);
      gradient.addColorStop(0.95, `hsla(150, ${saturation}%, ${light}%,1)`);
      gradient.addColorStop(1, `hsla(150, ${saturation}%, ${light}%,0)`);

      ctx.globalAlpha = Math.random() * 0.6 + 0.6;

      G.ellipse(gradient, this.x, this.y, 0.5 * this.width, 0.5 * this.height);

      ctx.restore();

      // Line of Upgrade
      this.drawLineOfUpgrade(G, "Shield");
    }
    // end

    ctx.restore();
    this.debugDraw();
  }
  drawLineOfUpgrade(G, name) {
    const lineLifeWidth = this.size.width * 0.6;
    const lineLifeHeight = 3;

    const h = name === "Overpower" ? 0.76 : 0.82;

    G.rect(
      "#555",
      this.x - 0.5 * lineLifeWidth,
      this.y + h * this.size.height,
      lineLifeWidth,
      lineLifeHeight
    ).rect(
      "hsl(180, 100%, 70%)",
      this.x - 0.5 * lineLifeWidth,
      this.y + h * this.size.height,
      lineLifeWidth *
        (1 - this.upgrades[name].timer / this.upgrades[name].duration),
      lineLifeHeight
    );
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
      this.size.width * 0.9 -
      Math.abs(this.inclination) * this.size.width * 0.3;
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
      this.game.bullets.push(
        new Bullet(this.x, this.y - this.height * 0.4, this.game)
      );
      if (this.upgrades.Overpower.enabled) {
        this.shootOverPoweredSound.play();
        this.game.bullets.push(
          new Bullet(
            this.x - this.wingSpan,
            this.y - this.height * 0.5,
            this.game
          )
        );
        this.game.bullets.push(
          new Bullet(
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
    this.detectHitToDamage("enemies");
    this.detectHitToDamage("bombs");
    if (!this.lifes) {
      this.game.endGame();
    }
  }
  detectHitToDamage(collectionName) {
    if (this.game[collectionName].length) {
      this.game[collectionName].forEach((item) => {
        if (this.detectCollision(item)) {
          item.markedToDelete = true;
          this.game.explosions.push(
            new Explosion(item.x, item.y, this.game, 0.5 * item?.type || 1, 20)
          );
          this.game.shake();

          if (!this.upgrades.Shield.enabled) {
            this.damaged = true;
            this.upgrades.Overpower.enabled = false;
            this.lifes -= item.lifesDamagedOnHitShip;
            if (this.lifes < 0) {
              this.lifes = 0;
            }
          } else {
            this.game.score += item?.value || 0;
          }
        }
      });
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
  updateUpgrades(timeFrame) {
    this.game.upgrades.forEach((upgrade) => {
      const { name } = upgrade;
      if (this.detectCollision(upgrade) && !this.upgrades[name].enabled) {
        upgrade.markedToDelete = true;
        this.getUpgradeSound.play();

        if (name === "Overpower") {
          this.upgrades.Overpower.enabled = true;
          this.upgrades.Overpower.timer = 0;
          this.projectileCharge = this.maxProjectileCharge;
        }
        if (name === "Shield") {
          this.upgrades.Shield.enabled = true;
          this.upgrades.Shield.timer = 0;
          this.width = this.upgrades.Shield.radius;
          this.height = this.upgrades.Shield.radius;
        }
        if (name === "NewLifes") {
          this.lifes = this.maxLifes;
        }
      }
    });

    ["Overpower", "Shield"].forEach((name) => {
      if (this.upgrades[name].enabled) {
        this.upgrades[name].timer += timeFrame;
        if (this.upgrades[name].timer >= this.upgrades[name].duration) {
          this.upgrades[name].enabled = false;
          if (name === "Shield") {
            this.width = this.size.width;
            this.height = this.size.height;
          }
        }
      }
    });
  }
  reset() {
    this.x = 0.5 * this.game.width;
    this.y = 0.8 * this.game.height;
    this.width = this.size.width;
    this.height = this.size.height;
    this.lifes = this.maxLifes;
    this.projectileCharge = this.maxProjectileCharge;
    this.projectileChargeWait = 0;
    this.shootWait = this.shootInterval;
    this.damaged = false;
    this.damageTimer = 0;
    this.upgrades = { ...upgradeConfig };
  }
}

export default Ship;
