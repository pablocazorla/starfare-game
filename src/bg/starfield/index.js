import Star from "./star";

class Starfield {
  constructor(game) {
    this.game = game;
    this.stars = [];
    setInterval(() => {
      if (!this.game.paused) {
        this.stars.push(
          new Star(Math.random() * this.game.width, -10, this.game)
        );
      }
    }, 40);
  }
  update() {
    this.stars = this.stars.filter((star) => !star.markedToDelete);
    this.stars.forEach((star) => star.update());
  }
  draw() {
    this.stars.forEach((star) => star.draw());
  }
}

export default Starfield;
