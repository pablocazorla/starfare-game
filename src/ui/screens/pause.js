import Screen from "./screen-class";

class ScreenPause extends Screen {
  constructor(game) {
    super(game);
    this.game = game;
  }
  update(timeFrame) {
    this.onPressEnter(timeFrame, () => {
      if (this.game.started) {
        this.game.togglePause();
      }
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

    ctx.fillStyle = "#99f";
    ctx.font = "bold 22px Courier New";
    ctx.fillText(
      `${
        this.game.isTouchDevice ? "Pulsa AQUI" : "Presiona ENTER"
      } para CONTINUAR`,
      this.game.width / 2,
      this.game.height / 2
    );
    ctx.restore();
  }
}

export default ScreenPause;
