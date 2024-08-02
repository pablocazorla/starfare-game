import Upgrade from "../upgrade-class";

class Overpower extends Upgrade {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Overpower";

    this.height = 65;
  }
  draw() {
    const { ctx } = this.game;

    ctx.save();

    const wingSpan = this.width * 0.8;

    ctx.fillStyle = `hsl(150, 40%, 34%)`;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y - this.height * 0);
    ctx.lineTo(this.x + wingSpan, this.y + this.height * 0.2);
    ctx.lineTo(this.x, this.y + this.height * 0.4);
    ctx.lineTo(this.x - wingSpan, this.y + this.height * 0.2);
    ctx.closePath();
    ctx.fill();

    const overPoweredSpanX = this.width * 0.2;
    ctx.fillStyle = `hsl(180, 100%, 50%)`;
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

    ctx.restore();
  }
}

export default Overpower;
