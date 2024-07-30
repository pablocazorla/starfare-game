import Enemy from "../enemy-class.js";
import AnimationFrame from "../../animationFrame/index.js";

class Enemy1 extends Enemy {
  constructor(x, y, game) {
    super(x, y, game);

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
    ctx.save();

    const frameBreath = -4 * Math.abs(this.animationBreath.frame - 4);

    // BODY TUBE
    ctx.fillStyle = "rgba(85, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.width * 0.46 + 0.2 * frameBreath,
      this.height * 0.2,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // WINGS
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y + 0.1 * frameBreath,
      this.width + 0.4 * frameBreath
    );
    gradient.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 0)");
    gradient.addColorStop(0.4, "rgba(255, 0, 0, 1)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      (this.width + 0.7 * frameBreath) / 2,
      this.height * 0.6,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // EYE
    const frameEye = this.animationEye.frame;
    ctx.fillStyle = "rgba(190, 0, 0, 1)";
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y,
      this.width * (frameEye === 0 ? 0.24 : 0.2),
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
      frameEye === 0 ? this.width * 0.18 : this.width * 0.05,
      frameEye === 0 ? this.width * 0.01 : this.width * 0.18,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    //
    this.drawLifes();
    this.debugDraw();
  }
}

export default Enemy1;
