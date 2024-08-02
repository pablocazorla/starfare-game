import Body from "../body";

class Upgrade extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.width = 45;
    this.height = 45;
    //
    this.speedX = Math.random() * 2 - 2;
    this.speedY = Math.random() * 1 + 1;
  }
  update() {
    // Move

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0.5 * this.width) {
      this.speedX *= -1;
      this.x = 0.5 * this.width;
    }
    if (this.x > this.game.width - 0.5 * this.width) {
      this.speedX *= -1;
      this.x = this.game.width - 0.5 * this.width;
    }

    if (this.y > this.game.height + this.height) {
      this.markedToDelete = true;
    }
  }
}

export default Upgrade;
