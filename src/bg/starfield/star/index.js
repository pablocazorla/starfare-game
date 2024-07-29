class Star {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.width = Math.round(1 + Math.random() * 3);
    this.height = this.width;
    this.speedY = 3;
    this.alpha = 0.1 + Math.random();
    this.markedToDelete = false;
  }
  update() {
    this.y += this.speedY;
    if (this.y > this.game.height) {
      // this.markedToDelete = true;
    }
  }
  draw() {
    const { ctx } = this.game;
    ctx.save();
    ctx.fillStyle = "#FFF";
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
export default Star;
