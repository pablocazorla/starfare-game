class Screen {
  constructor(game) {
    this.game = game;
    this.showing = false;
    this.pressEnterInterval = 200;
    this.pressEnterWait = this.pressEnterInterval;
  }
  show() {
    this.showing = true;
  }
  hide() {
    this.showing = false;
  }
  toggle(value) {
    this.showing = value;
  }
  drawBG() {
    const { ctx } = this.game;
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, this.game.width, this.game.height);
    ctx.restore();
  }
  onPressEnter(timeFrame, callBack) {
    if (this.pressEnterWait < this.pressEnterInterval) {
      this.pressEnterWait += timeFrame;
    }
    if (
      this.pressEnterWait >= this.pressEnterInterval &&
      this.game.input.keys["Enter"]
    ) {
      this.pressEnterWait = 0;
      callBack.apply(this);
    }
  }
}

export default Screen;
