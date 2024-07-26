class Hud {
  constructor(game) {
    this.game = game;
    this.paddingTop = 10;
    this.paddingX = 10;
  }
  draw() {
    const { ctx } = this.game;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#ddd";
    ctx.globalAlpha = 0.8;
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.font = "bold 22px Courier New";
    this.drawLifes(ctx);
    this.drawProyectileCharge(ctx);
    this.drawScore(ctx);
    ctx.restore();
  }
  drawLifes(ctx) {
    const a = 5;
    const b = a * 1.4;
    const x = this.paddingX;
    const y = this.paddingTop;
    const dx = a * 5;

    let d = 0;
    while (d < this.game.ship.maxLifes) {
      ctx.beginPath();
      ctx.moveTo(x + d * dx, y + b);
      ctx.lineTo(x + d * dx + a, y);
      ctx.lineTo(x + d * dx + 2 * a, y + b * 0.6);
      ctx.lineTo(x + d * dx + 3 * a, y);
      ctx.lineTo(x + d * dx + 4 * a, y + b);
      ctx.lineTo(x + d * dx + 2 * a, y + 2.3 * b);
      ctx.closePath();
      ctx.stroke();

      if (d < this.game.ship.lifes) {
        ctx.fill();
      }
      d++;
    }
  }
  drawProyectileCharge(ctx) {
    const a = 3;
    const b = a * 5;
    const x = this.paddingX;
    const y = this.paddingTop + 25;
    const dx = a * 2;

    let d = 0;
    while (d < this.game.ship.maxProjectileCharge) {
      ctx.strokeRect(x + d * dx, y, a, b);

      if (d < this.game.ship.projectileCharge) {
        ctx.fillRect(x + d * dx, y, a, b);
      }

      d++;
    }
  }
  drawScore(ctx) {
    ctx.fillText(
      `${this.game.score}`,
      this.game.width - this.paddingX,
      this.paddingTop
    );
  }
}

export default Hud;
