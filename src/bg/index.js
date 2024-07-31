import Star from "./star";
import Planet from "./planet";
import Timer from "../utils/timer";
import { updateCollection, drawCollection } from "../utils/collection";

class Bg {
  constructor(game) {
    this.game = game;
    this.stars = [];
    this.planets = [];
    this.speedY = 3;

    this.starsTimerCommon = new Timer(40);
    this.starsTimerCommon.each(() => {
      this.stars.push(
        new Star(Math.random() * this.game.width, -10, this.speedY, this.game)
      );
    });

    this.starsTimerSpecial = new Timer(7500);
    this.starsTimerSpecial.each(() => {
      this.stars.push(
        new Star(
          Math.random() * this.game.width,
          -30,
          this.speedY,
          this.game,
          true
        )
      );
    });

    this.planetTimer = new Timer(5000);
    this.planetTimer.each(() => {
      this.planets.push(
        new Planet(
          Math.random() * this.game.width,
          -360,
          this.speedY,
          this.game
        )
      );
    });
  }
  update(timeFrame) {
    updateCollection(this, "stars", timeFrame);
    this.starsTimerCommon.update(timeFrame);
    this.starsTimerSpecial.update(timeFrame);

    updateCollection(this, "planets", timeFrame);
    this.planetTimer.update(timeFrame);
  }
  draw() {
    drawCollection(this.stars);
    drawCollection(this.planets);
  }
}

export default Bg;
