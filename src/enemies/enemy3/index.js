import Enemy from "../enemy-class.js";
import AnimationFrame from "../../animationFrame/index.js";

class Enemy3 extends Enemy {
  constructor(x, y, game) {
    super(x, y, game);

    this.animationBreath = new AnimationFrame(8, 1000);
    this.animationEye = new AnimationFrame(6, 2400);

    this.speedX = 0;
    this.speedY = 0;
  }
  update(timeframe) {
    this.animationBreath.update(timeframe);
    this.animationEye.update(timeframe);

    this.updateEnemy();
  }
  draw() {
    const { ctx } = this.game;
    ctx.save();

    ctx.restore();
    //
    this.drawLifes();
    this.debugDraw();
  }
}

export default Enemy3;
