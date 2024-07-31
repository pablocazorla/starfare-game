import Graphics from "../../utils/graphic";

class Star {
  constructor(x, y, speedY, game, isSuperStar) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.radius = isSuperStar
      ? Math.round(5 + Math.random() * 10)
      : Math.round(1 + Math.random() * 3);
    this.speedY = speedY || 3;
    this.alpha = 0.1 + Math.random();
    this.markedToDelete = false;
    this.isSuperStar = isSuperStar;
  }
  update() {
    this.y += this.speedY;
    if (this.y > this.game.height) {
      this.markedToDelete = true;
    }
  }
  draw() {
    const { ctx } = this.game;

    const G = Graphics(ctx);
    ctx.save();

    ctx.fillStyle = "#FFF";

    if (this.isSuperStar) {
      ctx.shadowColor = "#FFF";
      ctx.shadowBlur = this.radius * 0.8;

      G.ellipse(null, this.x, this.y, this.radius, this.radius);
    } else {
      ctx.globalAlpha = this.alpha;
      G.rect(null, this.x, this.y, this.radius, this.radius);
    }

    ctx.restore();
  }
}
export default Star;
