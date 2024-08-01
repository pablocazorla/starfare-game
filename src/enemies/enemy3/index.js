import Enemy from "../enemy-class.js";
import AnimationFrame from "../../utils/animationFrame";
import Graphics from "../../utils/graphic";
import createEnemy from "../index.js";
import Bomb from "../../projectiles/bomb";

class Enemy3 extends Enemy {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Enemy3";
    this.type = 3;
    this.lifesDamagedOnHitShip = 2;
    this.width = 300;
    this.height = 100;
    this.maxLifes = 36;
    this.lifes = this.maxLifes;
    this.value = 120;

    this.animationBreath = new AnimationFrame(8, 800);
    this.animationEye = new AnimationFrame(6, 2400);
    this.animationHorns = new AnimationFrame(16, 1600);

    // this.speedX = 0;
    this.speedY = Math.random();
    this.explotionSize = 3;
  }
  update(timeframe) {
    this.animationBreath.update(timeframe);
    this.animationEye.update(timeframe);
    this.animationHorns.update(timeframe);

    this.updateEnemy();
  }
  draw() {
    const frameBreath = 1.4 * Math.abs(this.animationBreath.frame - 4);
    const frameEye = this.animationEye.frame;
    const frameHorns = 1.4 * Math.abs(this.animationHorns.frame - 8);

    const { ctx } = this.game;
    const y = this.y - this.impactY;

    const G = Graphics(ctx);

    const color = (c) => `hsl(20, 100%, ${c}%)`;
    ctx.save();
    // HORNS
    G
      // down left
      .shape(color(70), [
        [this.x - this.width * 0.5 - frameHorns, y + this.height * 0.3],
        [this.x - this.width * 0.4, y - this.height * 0.1],
        [this.x - this.width * 0.3, y + this.height * 0.1],
      ])
      .shape(null, [
        [this.x - this.width * 0.35 - frameHorns, y + this.height * 0.44],
        [this.x - this.width * 0.3, y],
        [this.x - this.width * 0.18, y + this.height * 0.1],
      ])
      .shape(null, [
        [this.x - this.width * 0.26 - frameHorns, y + this.height * 0.6],
        [this.x - this.width * 0.1, y],
        [this.x - this.width * 0.0, y + this.height * 0.1],
      ])
      // down right
      .shape(color(70), [
        [this.x + this.width * 0.5 + frameHorns, y + this.height * 0.3],
        [this.x + this.width * 0.4, y - this.height * 0.1],
        [this.x + this.width * 0.3, y + this.height * 0.1],
      ])
      .shape(null, [
        [this.x + this.width * 0.35 + frameHorns, y + this.height * 0.44],
        [this.x + this.width * 0.3, y],
        [this.x + this.width * 0.18, y + this.height * 0.1],
      ])
      .shape(null, [
        [this.x + this.width * 0.26 + frameHorns, y + this.height * 0.6],
        [this.x + this.width * 0.1, y],
        [this.x + this.width * 0.0, y + this.height * 0.1],
      ])
      // up left
      .shape(color(70), [
        [this.x - this.width * 0.46 - frameHorns, y - this.height * 0.6],
        [this.x - this.width * 0.4, y + this.height * 0.1],
        [this.x - this.width * 0.3, y - this.height * 0.1],
      ])
      .shape(null, [
        [this.x - this.width * 0.3 - frameHorns, y - this.height * 0.68],
        [this.x - this.width * 0.3, y],
        [this.x - this.width * 0.18, y - this.height * 0.1],
      ])
      .shape(null, [
        [this.x - this.width * 0.14 - frameHorns, y - this.height * 0.8],
        [this.x - this.width * 0.1, y],
        [this.x - this.width * 0.0, y - this.height * 0.1],
      ])
      // up right
      // up left
      .shape(color(70), [
        [this.x + this.width * 0.46 + frameHorns, y - this.height * 0.6],
        [this.x + this.width * 0.4, y + this.height * 0.1],
        [this.x + this.width * 0.3, y - this.height * 0.1],
      ])
      .shape(null, [
        [this.x + this.width * 0.3 + frameHorns, y - this.height * 0.68],
        [this.x + this.width * 0.3, y],
        [this.x + this.width * 0.18, y - this.height * 0.1],
      ])
      .shape(null, [
        [this.x + this.width * 0.14 + frameHorns, y - this.height * 0.8],
        [this.x + this.width * 0.1, y],
        [this.x + this.width * 0.0, y - this.height * 0.1],
      ]);
    ctx.restore();
    ctx.save();

    //CLIP
    G.ellipse(
      "clip",
      this.x,
      y - this.height * 0.26,
      this.width * 0.5 + frameBreath,
      this.height * 0.7
    );
    //end CLIP

    G.ellipse(
      color(40),
      this.x,
      y + this.height * 0.5,
      this.width * 0.8,
      this.height * 1
    );

    ctx.restore();
    ctx.save();

    G
      // HEAD SHADOW
      .ellipse(
        color(30),
        this.x,
        y - this.height * 0.1 + frameBreath,
        this.width * 0.24,
        this.width * 0.21
      )
      // HEAD
      .ellipse(
        color(45),
        this.x,
        y - this.height * 0.1 + frameBreath,
        this.width * 0.2,
        this.width * 0.2
      )
      // EYE
      .ellipse(
        color(15),
        this.x,
        y - this.height * 0.1 + frameBreath,
        this.width * (frameEye === 0 ? 0.14 : 0.015),
        this.width * 0.14
      );

    ctx.restore();

    //
    this.drawLifes(this.height * 0.12);
    this.debugDraw();
  }
  afterDelete() {
    const deltaX = this.width * 0.5;
    let x = this.x - deltaX;
    let d = 0;
    while (d < 3) {
      const enemy = createEnemy(1, x + d * deltaX, this.y, this.game);
      this.game.enemies.push(enemy);

      const bomb = new Bomb(x + d * deltaX, this.y, this.game);
      this.game.bombs.push(bomb);
      d++;
    }
  }
}

export default Enemy3;
