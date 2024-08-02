import Ship from "../ship";
import InputHandler from "../input-handler";
import Bg from "../bg";
import Hud from "../ui/hud";
import createEnemy from "../enemies";
import ScreenStart from "../ui/screens/start";
import ScreenPause from "../ui/screens/pause";
import ScreenEnd from "../ui/screens/end";
import Overpower from "../upgrades/overpower";
import Shield from "../upgrades/shield";
import NewLifes from "../upgrades/newLifes";
import Sound from "../sound";
import Timer from "../utils/timer";
import { updateCollection, drawCollection } from "../utils/collection";

class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.name = "Game";

    // INITIAL EVENT LISTENERS
    this.initialEventListeners();

    // OBJECTS
    this.bg = new Bg(this);
    this.ship = new Ship(this);
    this.bullets = [];
    this.explosions = [];
    this.bombs = [];
    this.enemies = [];
    this.upgrades = [];

    // TIMERS
    this.enemiesTimer = new Timer(1500);

    this.enemiesTimer.each(() => {
      const typeNum = Math.random();
      const type = typeNum < 0.05 ? 3 : typeNum < 0.19 ? 2 : 1;
      const enemy = createEnemy(
        type,
        Math.random() * (this.width - 20) + 10,
        -0.1 * this.height,
        this
      );
      this.enemies.push(enemy);
    });

    this.upgradesTimer = new Timer(20000);
    this.upgradesTimer.each(() => {
      const typeNum = Math.random();
      const type =
        typeNum < 0.08 ? "NewLifes" : typeNum < 0.2 ? "Shield" : "Overpower";
      switch (type) {
        case "NewLifes":
          this.upgrades.push(
            new NewLifes(
              Math.random() * (this.width - 20) + 10,
              -0.1 * this.height,
              this
            )
          );
          break;
        case "Shield":
          this.upgrades.push(
            new Shield(
              Math.random() * (this.width - 20) + 10,
              -0.1 * this.height,
              this
            )
          );
          break;
        case "Overpower":
          this.upgrades.push(
            new Overpower(
              Math.random() * (this.width - 20) + 10,
              -0.1 * this.height,
              this
            )
          );
          break;
        default:
          break;
      }
    });

    // STATES
    this.debugMode = false;
    this.drawMode = false;
    this.muted = false;
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
    this.music = new Sound(this, "music");
    this.music.setLoopeable().setVolume(0.2).setInitialTime(2.5);

    if (this.drawMode) {
      this.start();
    }
    //temp
    /* const enemy = createEnemy(3, 0.5 * this.width, 0.3 * this.height, this);
    this.enemies.push(enemy); */

    /* const bomb = new Bomb(0.5 * this.width, 0.3 * this.height, this);
    this.bombs.push(bomb); */

    //this.upgrades.push(new NewLifes(0.5 * this.width, 0.3 * this.height, this));
  }
  update(timeFrame) {
    //
    if (!this.paused) {
      this.bg.update(timeFrame);

      // PROJECTILES
      updateCollection(this, "bullets", timeFrame);
      updateCollection(this, "bombs", timeFrame);

      // ENEMIES
      updateCollection(this, "enemies", timeFrame);
      if (this.started) {
        this.enemiesTimer.update(timeFrame);
      }

      // UPGRADES
      updateCollection(this, "upgrades", timeFrame);
      if (this.started) {
        this.upgradesTimer.update(timeFrame);
      }

      // EXPLOSIONS
      updateCollection(this, "explosions", timeFrame);
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
    this.bg.draw();

    // PROJECTILES
    drawCollection(this.bullets);
    drawCollection(this.bombs);

    // ENEMIES
    drawCollection(this.enemies);

    // UPGRADES
    drawCollection(this.upgrades);

    // SHIP
    this.ship.draw();

    // EXPLOSIONS
    drawCollection(this.explosions);

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
    this.bullets = [];
    this.explosions = [];
    this.enemies = [];
    this.upgrades = [];
    this.ship.reset();
    //

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
