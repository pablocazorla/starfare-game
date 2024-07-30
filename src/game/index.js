import Ship from "../ship";
import InputHandler from "../input-handler";
import Starfield from "../bg/starfield";
import Hud from "../ui/hud";
import createEnemy from "../enemies";
import ScreenStart from "../ui/screens/start";
import ScreenPause from "../ui/screens/pause";
import ScreenEnd from "../ui/screens/end";
import Overpower from "../upgrades/overpower";
import Sound from "../sound";

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    // INITIAL EVENT LISTENERS
    this.initialEventListeners();

    // OBJECTS
    this.starfield = new Starfield(this);
    this.ship = new Ship(this);
    this.projectiles = [];
    this.enemies = [];
    this.enemiesBirthInterval = null;
    this.explosions = [];
    this.overpowers = [];
    this.overpowersBirthInterval = null;

    // STATES
    this.debugMode = false;
    this.gameSpeed = 1;
    this.score = 0;
    this.started = false;
    this.paused = false;

    // UI
    this.screenStart = new ScreenStart(this);
    this.screenPause = new ScreenPause(this);
    this.screenEnd = new ScreenEnd(this);
    this.hud = new Hud(this);

    // INPUTS
    this.input = new InputHandler([
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      " ",
      "Enter",
    ]);

    // SOUND
    this.music = new Sound("music");
    this.music.setLoopeable().setVolume(0.2).setInitialTime(2.5);

    //this.start();
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
    }
    this.ship.update(timeFrame);
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
    this.canvas.classList.add("shake");
  }
  // START GAME
  start() {
    this.projectiles = [];
    this.explosions = [];
    this.ship.reset();
    //

    clearInterval(this.enemiesBirthInterval);
    this.enemies = [];
    this.enemiesBirthInterval = setInterval(() => {
      const type = Math.random() > 0.18 ? 1 : 2;
      const enemy = createEnemy(
        type,
        Math.random() * (this.width - 20) + 10,
        -0.1 * this.height,
        this
      );
      this.enemies.push(enemy);
    }, 1500);

    /*   const enemy = createEnemy(2, this.width / 2, 0.4 * this.height, this);
    this.enemies.push(enemy); */

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
    this.music.resume();
  }
  // PAUSE GAME
  togglePause() {
    if (this.started) {
      this.paused = !this.paused;
      this.screenPause.toggle(this.paused);
      if (this.paused) {
        this.music.pause();
      } else {
        this.music.resume();
      }
    }
  }
  // END GAME
  endGame() {
    this.started = false;
    this.hud.hide();
    this.screenEnd.show();
    this.music.stop();
  }
  initialEventListeners() {
    const resize = () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();
    //
    this.canvas.addEventListener("animationend", () => {
      this.canvas.classList.remove("shake");
    });
  }
}

export default Game;
