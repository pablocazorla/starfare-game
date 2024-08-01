import Enemy from "../enemy-class.js";
import AnimationFrame from "../../utils/animationFrame";
import Graphics from "../../utils/graphic";
import Bomb from "../../projectiles/bomb";

class Enemy2 extends Enemy {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Enemy2";
    this.type = 2;
    this.lifesDamagedOnHitShip = 2;
    this.width = 180;
    this.height = 80;
    this.maxLifes = 6;
    this.lifes = this.maxLifes;
    this.value = 36;

    // this.speedX = 0;
    this.speedY = Math.random() + 2;

    this.animationBreath = new AnimationFrame(8, 800);
    this.animationEye = new AnimationFrame(6, 2400);
    this.animationHorns = new AnimationFrame(16, 1600);

    this.explotionSize = 2;
  }
  update(timeframe) {
    this.animationBreath.update(timeframe);
    this.animationEye.update(timeframe);
    this.animationHorns.update(timeframe);

    this.updateEnemy();
  }
  draw() {
    const frameBreath = 1.4 * Math.abs(this.animationBreath.frame - 4);
    const frameHorns = 1.4 * Math.abs(this.animationHorns.frame - 8);
    //
    const { ctx } = this.game;

    const y = this.y - this.impactY;

    const G = Graphics(ctx);

    const color = (c) => `hsl(30, 100%, ${c}%)`;

    ctx.save();

    // FEET

    G.shape(color(70), [
      [this.x - this.width * 0.35 - frameHorns, y + this.height * 0.44],
      [this.x - this.width * 0.3, y],
      [this.x - this.width * 0.18, y + this.height * 0.1],
    ]).shape(null, [
      [this.x + this.width * 0.35 + frameHorns, y + this.height * 0.44],
      [this.x + this.width * 0.3, y],
      [this.x + this.width * 0.18, y + this.height * 0.1],
    ]);

    ctx.restore();

    // BODY
    ctx.save();

    //CLIP
    G.ellipse(
      "clip",
      this.x,
      y - this.height * 0.5,
      this.width * 0.5 + frameBreath,
      this.height * 0.95
    );
    //end CLIP

    G.ellipse(
      color(50),
      this.x,
      y + this.height * 0.6,
      this.width * 0.8,
      this.height * 1
    );
    ctx.restore();

    ctx.save();
    // HEAD
    // HORNS

    G.shape(color(60), [
      [this.x + this.width * 0.2 - frameHorns, y - this.height * 0.8],
      [this.x, y - this.height * 0.4],
      [this.x + this.width * 0.12, y - this.height * 0.4],
    ]).shape(null, [
      [this.x - this.width * 0.2 + frameHorns, y - this.height * 0.8],
      [this.x, y - this.height * 0.4],
      [this.x - this.width * 0.12, y - this.height * 0.4],
    ]);

    // HEAD SHADOW
    G.ellipse(
      color(30),
      this.x,
      y - this.height * 0.3 + frameBreath,
      this.width * 0.19,
      this.width * 0.17
    )
      // HEAD
      .ellipse(
        color(45),
        this.x,
        y - this.height * 0.3 + frameBreath,
        this.width * 0.16,
        this.width * 0.16
      );

    // EYE
    const frameEye = this.animationEye.frame;

    G.ellipse(
      color(15),
      this.x,
      y - this.height * 0.3 + frameBreath,
      this.width * (frameEye === 0 ? 0.14 : 0.018),
      this.width * 0.14
    );

    // SPIRACULUS

    //1_izq

    G.ellipse(
      color(15),
      this.x - this.width * 0.3,
      y - this.height * 0.1,
      this.width * 0.04 - frameBreath * 0.3,
      this.width * 0.04 - frameBreath * 0.3
    )

      //1_der
      .ellipse(
        null,
        this.x + this.width * 0.3,
        y - this.height * 0.1,
        this.width * 0.04 - frameBreath * 0.3,
        this.width * 0.04 - frameBreath * 0.3
      )

      //2_izq
      .ellipse(
        null,
        this.x - this.width * 0.1,
        y + this.height * 0.25,
        this.width * 0.03 - frameBreath * 0.3,
        this.width * 0.03 - frameBreath * 0.3
      )

      //2_der
      .ellipse(
        null,
        this.x + this.width * 0.1,
        y + this.height * 0.25,
        this.width * 0.03 - frameBreath * 0.3,
        this.width * 0.03 - frameBreath * 0.3
      );

    ctx.restore();

    this.drawLifes();
    this.debugDraw();
  }
  afterDelete() {
    const deltaX = this.width * 0.3;
    let x = this.x - deltaX * 0.5;
    let d = 0;
    while (d < 2) {
      const bomb = new Bomb(x + d * deltaX, this.y, this.game);
      this.game.bombs.push(bomb);
      d++;
    }
  }
}

export default Enemy2;
