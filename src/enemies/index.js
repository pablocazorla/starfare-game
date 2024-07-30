import Enemy1 from "./enemy1/index.js";
import Enemy2 from "./enemy2/index.js";

const createEnemy = (type, x, y, game) => {
  switch (type) {
    case 2:
      return new Enemy2(x, y, game);
    default:
      return new Enemy1(x, y, game);
  }
};

export default createEnemy;
