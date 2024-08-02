import Upgrade from "../upgrade-class";
import Graphics from "../../utils/graphic";

class Shield extends Upgrade {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Shield";

    this.width = 60;
    this.height = 60;
  }
  draw() {
    const { ctx } = this.game;

    const G = Graphics(ctx);

    ctx.save();

    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      0.5 * this.width
    );
    const light = 50;
    const saturation = 50;
    gradient.addColorStop(0.1, `hsla(150, ${saturation}%, ${light}%,0)`);
    gradient.addColorStop(0.8, `hsla(150, ${saturation}%, ${light}%,1)`);
    gradient.addColorStop(1, `hsla(150, ${saturation}%, ${light}%,0)`);

    G.ellipse(gradient, this.x, this.y, 0.5 * this.width, 0.5 * this.height);

    ctx.restore();
  }
}

export default Shield;
