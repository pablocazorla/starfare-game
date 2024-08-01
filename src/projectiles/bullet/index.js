import Body from "../../body/index.js";

class Projectile extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Projectile";
    this.width = 6;
    this.height = 12;
    this.speedY = 7;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < 0) {
      this.markedToDelete = true;
    }
  }
  draw() {
    const { ctx } = this.game;
    ctx.save();
    ctx.fillStyle = "#FF9";
    ctx.fillRect(
      this.x - 0.5 * this.width,
      this.y - 0.5 * this.height,
      this.width,
      this.height
    );
    ctx.restore();
    this.debugDraw();
  }
}
export default Projectile;
