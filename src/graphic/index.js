const Graphics = (ctx) => {
  const G = { ctx };

  G.ellipse = (color, x, y, width, height) => {
    if (color && color !== "clip" && color !== "nofill") {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.ellipse(x, y, width, height, 0, 0, Math.PI * 2);
    ctx.closePath();
    if (color === "clip") {
      ctx.clip();
    } else {
      if (color !== "nofill") {
        ctx.fill();
      }
    }
    return G;
  };

  G.shape = (color, list) => {
    if (color && color !== "clip" && color !== "nofill") {
      ctx.fillStyle = color;
    }
    ctx.beginPath();
    ctx.moveTo(list[0][0], list[0][1]);
    for (let i = 1; i < list.length; i++) {
      ctx.lineTo(list[i][0], list[i][1]);
    }
    ctx.closePath();
    if (color === "clip") {
      ctx.clip();
    } else {
      if (color !== "nofill") {
        ctx.fill();
      }
    }
    return G;
  };

  G.rect = (color, x, y, width, height) => {
    if (color) {
      ctx.fillStyle = color;
    }
    ctx.fillRect(x, y, width, height);
    return G;
  };

  return G;
};

export default Graphics;
