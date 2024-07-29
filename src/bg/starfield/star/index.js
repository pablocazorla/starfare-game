class Star {
  constructor(x, y, speedY, game, isSuperStar) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.width = isSuperStar
      ? Math.round(5 + Math.random() * 10)
      : Math.round(1 + Math.random() * 3);
    this.height = this.width;
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
    ctx.save();

    ctx.fillStyle = "#FFF";

    if (this.isSuperStar) {
      ctx.shadowColor = "#FFF";
      ctx.shadowBlur = this.width * 0.8;
      ctx.beginPath();
      ctx.ellipse(this.x, this.y, this.width, this.width, 0, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.globalAlpha = this.alpha;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    ctx.restore();
  }
}
export default Star;
