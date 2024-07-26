import Ship from "./ship.js";
import InputHandler from "./inputHandler.js";
import Star from "./star.js";
import Hud from "./hud.js";
import Enemy from "./enemy.js";

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    //
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
    this.ship = new Ship(0.5 * this.width, 0.8 * this.height, this);
    //
    this.stars = [];
    setInterval(() => {
      this.stars.push(new Star(Math.random() * this.width, 0, this));
    }, 40);
    //
    this.projectiles = [];
    //
    this.hud = new Hud(this);

    //
    this.enemies = [];
    setInterval(() => {
      this.enemies.push(
        new Enemy(Math.random() * this.width, -0.1 * this.height, this)
      );
    }, 1500);
    //
    this.explosions = [];
  }
  update(timeFrame) {
    this.stars = this.stars.filter((star) => !star.markedToDelete);
    this.stars.forEach((star) => star.update());
    //
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedToDelete
    );
    this.projectiles.forEach((projectile) => projectile.update());
    //
    this.enemies = this.enemies.filter((enemy) => !enemy.markedToDelete);
    this.enemies.forEach((enemy) => enemy.update());
    //
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedToDelete
    );
    this.explosions.forEach((explosion) => explosion.update(timeFrame));

    this.ship.update(timeFrame);

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
  }
}

export default Game;
