import Upgrade from "../upgrade-class";
import Graphics from "../../utils/graphic";

class NewLifes extends Upgrade {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "NewLifes";

    this.width = 40;
    this.height = 40;
    this.speedY = Math.random() * 1 + 2;
  }
  draw() {
    const { ctx } = this.game;
    ctx.save();
    const G = Graphics(ctx);

    G.ellipse(
      `hsla(150, ${70}%, ${90}%,1)`,
      this.x,
      this.y,
      0.5 * this.width,
      0.5 * this.height
    );

    const a = 0.16 * this.height;
    const b = a * 1.4;
    const x = this.x - 0.33 * this.width;
    const y = this.y - 0.25 * this.height;

    G.shape(`hsla(150, ${40}%, ${40}%,1)`, [
      [x, y + b],
      [x + a, y],
      [x + 2 * a, y + b * 0.6],
      [x + 3 * a, y],
      [x + 4 * a, y + b],
      [x + 2 * a, y + 2.3 * b],
    ]);

    ctx.restore();
  }
}

export default NewLifes;
