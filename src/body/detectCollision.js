// Check if rectangle a contains rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
function contains(a, b) {
  return !(b.x1 < a.x1 || b.y1 < a.y1 || b.x2 > a.x2 || b.y2 > a.y2);
}

// Check if rectangle a overlaps rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
function overlaps(a, b) {
  // no horizontal overlap
  if (a.x1 >= b.x2 || b.x1 >= a.x2) return false;

  // no vertical overlap
  if (a.y1 >= b.y2 || b.y1 >= a.y2) return false;

  return true;
}

// Check if rectangle a touches rectangle b
// Each object (a and b) should have 2 properties to represent the
// top-left corner (x1, y1) and 2 for the bottom-right corner (x2, y2).
function touches(a, b) {
  // has horizontal gap
  if (a.x1 > b.x2 || b.x1 > a.x2) return false;

  // has vertical gap
  if (a.y1 > b.y2 || b.y1 > a.y2) return false;

  return true;
}

const detectCollision = (A, B) => {
  const a = {
    x1: A.x - 0.5 * A.width,
    y1: A.y - 0.5 * A.height,
    x2: A.x + 0.5 * A.width,
    y2: A.y + 0.5 * A.height,
  };
  const b = {
    x1: B.x - 0.5 * B.width,
    y1: B.y - 0.5 * B.height,
    x2: B.x + 0.5 * B.width,
    y2: B.y + 0.5 * B.height,
  };

  return contains(a, b) || overlaps(a, b) || touches(a, b);
};

export default detectCollision;
