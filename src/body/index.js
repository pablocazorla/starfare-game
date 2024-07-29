import detectCollision from "./detectCollision";

class Body {
  constructor(x, y, game) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.width = 50;
    this.height = 50;
    this.markedToDelete = false;
  }
  debugDraw() {
    if (this.game.debugMode) {
      const { ctx } = this.game;
      ctx.save();
      ctx.strokeStyle = "#f00";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        this.x - this.width / 2,
        this.y - this.height / 2,
        this.width,
        this.height
      );
      ctx.restore();
    }
  }
  detectCollision(other) {
    return detectCollision(this, other);
  }
}

export default Body;
