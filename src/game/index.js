import Ship from "../ship";
import InputHandler from "../input-handler";
import Starfield from "../bg/starfield";
import Hud from "../ui/hud";
import Enemy from "../enemies";
import ScreenStart from "../ui/screens/start";
import ScreenPause from "../ui/screens/pause";
import ScreenEnd from "../ui/screens/end";
import Overpower from "../upgrades/overpower";

class Game {
  constructor(container, canvas) {
    this.container = container;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    //
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();
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
    this.starfield = new Starfield(this);
    //
    this.ship = new Ship(this);
    this.projectiles = [];
    this.enemies = [];
    this.enemiesInterval = null;
    this.explosions = [];
    this.overpowers = [];
    this.overpowersInterval = null;
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
  }
  update(timeFrame) {
    //
    if (!this.paused) {
      this.starfield.update();
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedToDelete
      );
      this.projectiles.forEach((projectile) => projectile.update());

      //
      this.overpowers = this.overpowers.filter(
        (overpower) => !overpower.markedToDelete
      );
      this.overpowers.forEach((overpower) => overpower.update(timeFrame));
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
    this.starfield.draw();
    this.projectiles.forEach((projectile) => projectile.draw());
    this.overpowers.forEach((overpower) => overpower.draw());
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

    //
    clearInterval(this.overpowersInterval);
    this.overpowers = [];
    this.overpowersInterval = setInterval(() => {
      this.overpowers.push(
        new Overpower(
          Math.random() * (this.width - 20) + 10,
          -0.1 * this.height,
          this
        )
      );
    }, 20000);
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
