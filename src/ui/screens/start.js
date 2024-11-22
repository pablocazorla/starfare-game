import Screen from "./screen-class";

class ScreenStart extends Screen {
  constructor(game) {
    super(game);
    this.game = game;
    this.showing = !game.drawMode;
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
      `${
        this.game.isTouchDevice ? "Pulsa AQUÍ" : "Presiona ENTER"
      } para INICIAR`,
      this.game.width / 2,
      this.game.height / 2
    );
    if (!this.game.isTouchDevice) {
      ctx.fillStyle = "#0007";
      ctx.font = "bold 18px Courier New";
      const w = 0.45;
      ctx.fillRect(
        ((1 - w) * this.game.width) / 2,
        this.game.height * 0.565,
        w * this.game.width,
        this.game.height * 0.24
      );
      ctx.fillStyle = "#aaa";
      ctx.fillText(
        `Usa las teclas de FLECHA`,
        this.game.width / 2,
        this.game.height * 0.6
      );
      ctx.fillText(
        `para MOVER la nave.`,
        this.game.width / 2,
        this.game.height * 0.63
      );
      ctx.fillText(
        `Usa la BARRA ESPACIADORA`,
        this.game.width / 2,
        this.game.height * 0.68
      );
      ctx.fillText(
        `para DISPARAR.`,
        this.game.width / 2,
        this.game.height * 0.71
      );
      ctx.fillText(
        `ENTER para PAUSAR.`,
        this.game.width / 2,
        this.game.height * 0.77
      );
    }

    ctx.restore();
  }
}

export default ScreenStart;
