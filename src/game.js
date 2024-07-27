import Ship from "./ship.js";
import InputHandler from "./inputHandler.js";
import Star from "./star.js";
import Hud from "./hud.js";
import Enemy from "./enemy.js";
import ScreenStart from "./screenStart.js";
import ScreenPause from "./screenPause.js";
import ScreenEnd from "./screenEnd.js";

class Game {
  constructor(container, canvas) {
    this.container = container;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    //
    this.hud = new Hud(this);
    this.input = new InputHandler([
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      " ",
      "Enter",
    ]);
    this.debugMode = false;
    this.gameSpeed = 1;
    this.score = 0;
    //
    this.stars = [];
    setInterval(() => {
      if (!this.paused) {
        this.stars.push(new Star(Math.random() * this.width, 0, this));
      }
    }, 40);
    //
    this.ship = new Ship(0.5 * this.width, 0.8 * this.height, this);
    this.projectiles = [];
    this.enemies = [];
    this.enemiesInterval = null;
    this.explosions = [];
    //
    this.container.addEventListener("animationend", () => {
      this.container.classList.remove("shake");
    });
    //
    this.started = false;
    this.paused = false;
    this.screenStart = new ScreenStart(this);
    this.screenPause = new ScreenPause(this);
    this.screenEnd = new ScreenEnd(this);
    //
  }
  update(timeFrame) {
    //
    if (!this.paused) {
      this.stars = this.stars.filter((star) => !star.markedToDelete);
      this.stars.forEach((star) => star.update());
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedToDelete
      );
      this.projectiles.forEach((projectile) => projectile.update());
      //
      this.enemies = this.enemies.filter((enemy) => !enemy.markedToDelete);
      this.enemies.forEach((enemy) => enemy.update(timeFrame));
      //
      this.explosions = this.explosions.filter(
        (explosion) => !explosion.markedToDelete
      );
      this.explosions.forEach((explosion) => explosion.update(timeFrame));

      this.ship.update(timeFrame);
    }
    //
    this.screenPause.update(timeFrame);
    this.screenStart.update(timeFrame);
    this.screenEnd.update(timeFrame);

    return this;
  }
  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    //
    this.stars.forEach((star) => star.draw());
    this.projectiles.forEach((projectile) => projectile.draw());
    this.enemies.forEach((enemy) => enemy.draw());
    this.ship.draw();
    //
    this.explosions.forEach((explosion) => explosion.draw());
    //
    this.hud.draw();
    //
    this.screenPause.draw();
    this.screenStart.draw();
    this.screenEnd.draw();
  }
  shake() {
    this.container.classList.add("shake");
  }
  // START GAME
  start() {
    this.projectiles = [];
    this.explosions = [];
    this.ship.reset();
    //
    clearInterval(this.enemiesInterval);
    this.enemies = [];
    this.enemiesInterval = setInterval(() => {
      this.enemies.push(
        new Enemy(
          Math.random() * (this.width - 20) + 10,
          -0.1 * this.height,
          this
        )
      );
    }, 1500);
    this.score = 0;
    this.hud.show();
    this.started = true;
    this.paused = false;
  }
  // PAUSE GAME
  togglePause() {
    if (this.started) {
      this.paused = !this.paused;
      this.screenPause.toggle(this.paused);
    }
  }
  // END GAME
  endGame() {
    this.started = false;
    this.hud.hide();
    this.screenEnd.show();
  }
}

export default Game;
