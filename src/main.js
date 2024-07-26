import Game from "./game.js";

const canvas = document.getElementById("starfare-canvas");
const game = new Game(canvas);

let previousTime = 0;

const animate = (timestamp) => {
  const timeFrame = timestamp - previousTime;
  previousTime = timestamp;

  game.update(timeFrame).draw();

  window.requestAnimationFrame(animate);
};

window.requestAnimationFrame(animate);
