import Enemy from "../enemy-class.js";
import AnimationFrame from "../../animationFrame/index.js";

class Enemy2 extends Enemy {
  constructor(x, y, game) {
    super(x, y, game);
    this.type = 2;
    this.lifesDamagedOnHitShip = 2;
    this.width = 180;
    this.height = 80;
    this.maxLifes = 6;
    this.lifes = this.maxLifes;
    this.value = 36;

    this.animationBreath = new AnimationFrame(8, 800);
    this.animationEye = new AnimationFrame(6, 2400);
    this.animationHorns = new AnimationFrame(16, 1600);
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

    let colorLight = 70;

    // FEET
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.moveTo(
      this.x - this.width * 0.35 - frameHorns,
      this.y + this.height * 0.44
    );
    ctx.lineTo(this.x - this.width * 0.3, this.y);
    ctx.lineTo(this.x - this.width * 0.18, this.y + this.height * 0.1);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.moveTo(
      this.x + this.width * 0.35 + frameHorns,
      this.y + this.height * 0.44
    );
    ctx.lineTo(this.x + this.width * 0.3, this.y);
    ctx.lineTo(this.x + this.width * 0.18, this.y + this.height * 0.1);
    ctx.closePath();
    ctx.fill();

    // BODY
    colorLight = 50;
    ctx.save();
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y - this.height * 0.5,
      this.width * 0.5 + frameBreath,
      this.height * 0.95,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();

    ctx.clip();

    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y + this.height * 0.6,
      this.width * 0.8,
      this.height * 1,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    ctx.restore();
    //
    ctx.save();

    // HEAD
    // HORNS
    colorLight = 60;
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.moveTo(
      this.x - this.width * 0.2 + frameHorns,
      this.y - this.height * 0.8
    );
    ctx.lineTo(this.x, this.y - this.height * 0.4);
    ctx.lineTo(this.x - this.width * 0.12, this.y - this.height * 0.4);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(
      this.x + this.width * 0.2 - frameHorns,
      this.y - this.height * 0.8
    );
    ctx.lineTo(this.x, this.y - this.height * 0.4);
    ctx.lineTo(this.x + this.width * 0.12, this.y - this.height * 0.4);
    ctx.closePath();
    ctx.fill();
    // HEAD SHADOW
    colorLight = 30;
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y - this.height * 0.3 + frameBreath,
      this.width * 0.19,
      this.width * 0.17,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();
    colorLight = 40;
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y - this.height * 0.3 + frameBreath,
      this.width * 0.16,
      this.width * 0.16,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // EYE
    const frameEye = this.animationEye.frame;
    colorLight = 15;
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x,
      this.y - this.height * 0.3 + frameBreath,
      this.width * (frameEye === 0 ? 0.14 : 0.018),
      this.width * 0.14,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    // SPIRACULUS
    colorLight = 15;
    //1_izq
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x - this.width * 0.3,
      this.y - this.height * 0.1,
      this.width * 0.04 - frameBreath * 0.3,
      this.width * 0.04 - frameBreath * 0.3,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    //1_der
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width * 0.3,
      this.y - this.height * 0.1,
      this.width * 0.04 - frameBreath * 0.3,
      this.width * 0.04 - frameBreath * 0.3,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    //2_izq
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x - this.width * 0.1,
      this.y + this.height * 0.25,
      this.width * 0.03 - frameBreath * 0.3,
      this.width * 0.03 - frameBreath * 0.3,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    //2_der
    ctx.fillStyle = `hsl(30, 100%, ${colorLight}%)`;
    ctx.beginPath();
    ctx.ellipse(
      this.x + this.width * 0.1,
      this.y + this.height * 0.25,
      this.width * 0.03 - frameBreath * 0.3,
      this.width * 0.03 - frameBreath * 0.3,
      0,
      0,
      Math.PI * 2
    );
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    this.drawLifes();
    this.debugDraw();
  }
}

export default Enemy2;
