const detectCollision = (A, B) => {
  const A_1_X = A.x - 0.5 * A.width;
  const A_1_Y = A.y - 0.5 * A.height;
  const A_2_X = A.x + 0.5 * A.width;
  const A_2_Y = A.y + 0.5 * A.height;

  const B_1_X = B.x - 0.5 * B.width;
  const B_1_Y = B.y - 0.5 * B.height;
  const B_2_X = B.x + 0.5 * B.width;
  const B_2_Y = B.y + 0.5 * B.height;

  return (
    ((B_1_X > A_1_X && B_1_X < A_2_X) || (B_2_X > A_1_X && B_2_X < A_2_X)) &&
    ((B_1_Y > A_1_Y && B_1_Y < A_2_Y) || (B_2_Y > A_1_Y && B_2_Y < A_2_Y))
  );
};

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
