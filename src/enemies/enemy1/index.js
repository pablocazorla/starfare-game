import Enemy from "../enemy-class.js";
import AnimationFrame from "../../utils/animationFrame";
import Graphics from "../../utils/graphic";

class Enemy1 extends Enemy {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Enemy1";
    this.animationBreath = new AnimationFrame(8, 1000);
    this.animationEye = new AnimationFrame(6, 2400);
  }
  update(timeframe) {
    this.animationBreath.update(timeframe);
    this.animationEye.update(timeframe);

    this.updateEnemy();
  }
  draw() {
    const { ctx } = this.game;
    const G = Graphics(ctx);

    const y = this.y - this.impactY;

    ctx.save();

    const frameBreath = -4 * Math.abs(this.animationBreath.frame - 4);
    const frameEye = this.animationEye.frame;

    G.shape("hsl(0, 100%, 65%)", [
      [this.x, y - this.height * 0.6],
      [this.x + this.width * 0.1, y],
      [this.x - this.width * 0.1, y + this.height * 0],
    ]).shape("hsl(0, 100%, 65%)", [
      [this.x, y + this.height * 0.47],
      [this.x + this.width * 0.24, y],
      [this.x - this.width * 0.24, y + this.height * 0],
    ]);

    // BODY TUBE
    G.ellipse(
      "rgba(85, 0, 0, 1)",
      this.x,
      y,
      this.width * 0.46 + 0.2 * frameBreath,
      this.height * 0.2
    );

    // WINGS
    const gradient = ctx.createRadialGradient(
      this.x,
      y,
      0,
      this.x,
      y + 0.1 * frameBreath,
      this.width + 0.4 * frameBreath
    );
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 1)");

    G.ellipse(
      gradient,
      this.x,
      y,
      (this.width + 0.7 * frameBreath) / 2,
      this.height * 0.6,
      0,
      0,
      Math.PI * 2
    )
      // EYE
      .ellipse(
        "rgba(190, 0, 0, 1)",
        this.x,
        y,
        this.width * (frameEye === 0 ? 0.24 : 0.2),
        this.width * 0.2
      )
      // PUPIL
      .ellipse(
        "rgba(50, 0, 0, 1)",
        this.x,
        y,
        frameEye === 0 ? this.width * 0.18 : this.width * 0.05,
        frameEye === 0 ? this.width * 0.01 : this.width * 0.18
      );
    ctx.restore();
    //
    this.drawLifes();
    this.debugDraw();
  }
}

export default Enemy1;
