import Body from "./body.js";

class Overpower extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.width = 45;
    this.height = 65;
    //
    this.speedX = Math.random() * 2 - 3;
    this.speedY = Math.random() * 1 + 1;
  }
  update() {
    // Move
    if (
      this.x < 0.5 * this.width ||
      this.x > this.game.width - 0.5 * this.width
    ) {
      this.speedX = -this.speedX;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > this.game.height + this.height) {
      this.markedToDelete = true;
    }
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
