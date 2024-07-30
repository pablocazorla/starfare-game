import Graphics from "../../../graphic/";

class Planet {
  constructor(x, y, speedY, game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.radius = Math.round(Math.random() * (200 - 15) + 15);
    this.speedY = speedY || 3;
    this.colorTone = Math.round(Math.random() * (250 - 170) + 170);
    this.markedToDelete = false;
  }
  update() {
    this.y += this.speedY;
    if (this.y > this.game.height + this.radius) {
      this.markedToDelete = true;
    }
  }
  draw() {
    const { ctx } = this.game;

    const G = Graphics(ctx);
    ctx.save();

    ctx.shadowColor = `hsl(${this.colorTone}, 100%, 20%)`;
    ctx.shadowBlur = this.radius * 0.2;

    G.ellipse(
      `hsl(${this.colorTone}, 100%, 10%)`,
      this.x,
      this.y,
      this.radius,
      this.radius
    );

    const lightRadius = this.radius * 1.2;

    ctx.clip();

    G.ellipse(
      `hsl(${this.colorTone}, 100%, 20%)`,
      this.x - this.radius * 0.4,
      this.y - this.radius * 0.4,
      lightRadius,
      lightRadius
    );
    ctx.restore();
  }
}
export default Planet;
