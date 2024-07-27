import Screen from "./screen.js";

class ScreenStart extends Screen {
  constructor(game) {
    super(game);
    this.game = game;
    this.showing = true;
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

    ctx.shadowColor = "#f09";
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 8;
    ctx.shadowBlur = 2;

    ctx.font = "bold italic 92px Courier New";
    ctx.strokeStyle = "#29f";
    ctx.lineWidth = 2;

    ctx.fillText("Starfarer", this.game.width / 2, this.game.height * 0.4);
    ctx.shadowColor = "#00000000";
    ctx.strokeText("Starfarer", this.game.width / 2, this.game.height * 0.4);

    ctx.fillStyle = "#99f";
    ctx.font = "bold 22px Courier New";
    ctx.fillText(
      "Press ENTER to START",
      this.game.width / 2,
      this.game.height / 2
    );
    ctx.restore();
  }
}

export default ScreenStart;
