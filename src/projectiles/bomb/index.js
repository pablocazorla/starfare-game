import Body from "../../body";
import Graphics from "../../utils/graphic";

class Bomb extends Body {
  constructor(x, y, game) {
    super(x, y, game);
    this.name = "Bomb";
    this.radius = 12;
    this.width = this.radius * 2;
    this.height = this.radius * 2;

    this.speedX = Math.random() * 4 - 2;
    this.speedY = 3;

    this.ang = Math.PI * 2;
    this.angSpeed = -0.08;

    this.lifesDamagedOnHitShip = 1;
  }
  update() {
    // Rotate
    this.ang += this.angSpeed;
    if (this.ang < 0) {
      this.ang = Math.PI * 2;
    }

    // Move

    if (this.x < 0) {
      this.speedX *= -1;
      this.x = 0;
    }
    if (this.x > this.game.width) {
      this.speedX *= -1;
      this.x = this.game.width;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (this.y > this.game.height) {
      this.markedToDelete = true;
    }
  }
  draw() {
    const { ctx } = this.game;
    const G = Graphics(ctx);

    const tone = 0;
    const innerRadius = this.radius - 4;
    const pointLarge = this.radius * 1.4;
    const pointWidth = this.radius * 0.8;

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.ang);

    G.shape(`hsl(${tone},100%,70%)`, [
      [0, 0 - pointLarge],
      [0 + pointWidth, 0],
      [0 - pointWidth, 0],
    ])

      .shape(`hsl(${tone},100%,70%)`, [
        [0, 0 + pointLarge],
        [0 + pointWidth, 0],
        [0 - pointWidth, 0],
      ])

      .shape(`hsl(${tone},100%,70%)`, [
        [0 - pointLarge, 0],
        [0, 0 + pointWidth],
        [0, 0 - pointWidth],
      ])

      .shape(`hsl(${tone},100%,70%)`, [
        [0 + pointLarge, 0],
        [0, 0 + pointWidth],
        [0, 0 - pointWidth],
      ])
      .ellipse(`hsl(${tone},60%,20%)`, 0, 0, this.radius, this.radius)
      .ellipse(`hsl(${tone},60%,50%)`, 0, 0, innerRadius, innerRadius);

    ctx.restore();
    this.debugDraw();
  }
}

export default Bomb;
