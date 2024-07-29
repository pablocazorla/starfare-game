import Game from "./game";

window.addEventListener("load", () => {
  const game = new Game("starfarer-canvas");

  let previousTime = 0;

  const animate = (timestamp) => {
    const timeFrame = timestamp - previousTime;
    previousTime = timestamp;

    game.update(timeFrame).draw();

    window.requestAnimationFrame(animate);
  };

  window.requestAnimationFrame(animate);
});
