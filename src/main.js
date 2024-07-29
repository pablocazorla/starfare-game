import Game from "./game";

const container = document.getElementById("starfarer-container");
const canvas = document.getElementById("starfarer-canvas");
const game = new Game(container, canvas);

let previousTime = 0;

const animate = (timestamp) => {
  const timeFrame = timestamp - previousTime;
  previousTime = timestamp;

  game.update(timeFrame).draw();

  window.requestAnimationFrame(animate);
};

window.requestAnimationFrame(animate);
