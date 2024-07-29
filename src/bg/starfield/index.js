import Star from "./star";
import Planet from "./planet";

class Starfield {
  constructor(game) {
    this.game = game;
    this.stars = [];
    this.planets = [];
    this.speedY = 3;
    setInterval(() => {
      if (!this.game.paused) {
        this.stars.push(
          new Star(Math.random() * this.game.width, -10, this.speedY, this.game)
        );
      }
    }, 40);

    setInterval(() => {
      if (!this.game.paused) {
        this.stars.push(
          new Star(
            Math.random() * this.game.width,
            -30,
            this.speedY,
            this.game,
            true
          )
        );
      }
    }, 7500);

    setInterval(() => {
      if (!this.game.paused) {
        this.planets.push(
          new Planet(
            Math.random() * this.game.width,
            -360,
            this.speedY,
            this.game
          )
        );
      }
    }, 5000);
  }
  update() {
    this.stars = this.stars.filter((star) => !star.markedToDelete);
    this.stars.forEach((star) => star.update());
    this.planets = this.planets.filter((planet) => !planet.markedToDelete);
    this.planets.forEach((planet) => planet.update());
  }
  draw() {
    this.stars.forEach((star) => star.draw());
    this.planets.forEach((planet) => planet.draw());
  }
}

export default Starfield;
