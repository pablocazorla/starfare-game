import Screen from "./screen-class";

class ScreenEnd extends Screen {
  constructor(game) {
    super(game);
    this.game = game;
  }
  update(timeFrame) {
    if (!this.showing) {
      return;
    }
    this.onPressEnter(timeFrame, () => {
      this.game.start();
      this.hide();
    });
  }
  draw() {
    if (!this.showing) {
      return;
    }
    this.drawBG();
    const { ctx } = this.game;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.font = "bold 60px Courier New";

    ctx.fillText("Game Over", this.game.width / 2, this.game.height * 0.4);

    ctx.fillStyle = "#99f";
    ctx.font = "bold 35px Courier New";
    ctx.fillText(
      `${this.game.score} points`,
      this.game.width / 2,
      this.game.height * 0.5
    );

    ctx.font = "bold 18px Courier New";
    ctx.fillText(
      `(${this.game.isTouchDevice ? "Tap HERE" : "Press ENTER"} to RESTART)`,
      this.game.width / 2,
      this.game.height * 0.6
    );
    ctx.restore();
  }
}

export default ScreenEnd;
