import Renderer from './renderer';

const options = [
  [0, 3],
  [0, -3],
  [3, 0],
  [-3, 0],
  [-2, -2],
  [-2, 2],
  [2, -2],
  [2, 2],
];

class Game {
  constructor(size) {
    this.size = size;
    this.boxes = [...Array(size * size)].map((_, i) => ({
      x: i % size,
      y: Math.floor(i / size),
      k: i,
    }));
    this.renderer = new Renderer(this);
  }
  getBoxAt(x, y) {
    return this.boxes[y * this.size + x];
  }
  getOption(box, [dx, dy]) {
    const x = box.x + dx;
    const y = box.y + dy;
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) return null;
    return this.getBoxAt(x, y);
  }
  getOptions(box) {
    return options
      .map((option) => this.getOption(box, option))
      .filter((o) => o);
  }
  isComplete(solution) {
    return Object.keys(solution).length === this.size * this.size;
  }
  isStuck(box, solution) {
    if (!box) return false;
    for (const option of options) {
      const target = this.getOption(box, option);
      if (!target) continue;
      if (solution[target.k] === undefined) return false;
    }
    return true;
  }
  canBeSelected(source, target) {
    if (!source) return true;
    if (target.y === source.y) {
      if (target.x - 3 === source.x || target.x + 3 === source.x) return true;
    }
    if (target.x === source.x) {
      if (target.y - 3 === source.y || target.y + 3 === source.y) return true;
    }
    if (
      (target.x + 2 === source.x || target.x + -2 === source.x) &&
      (target.y + 2 === source.y || target.y - 2 === source.y)
    )
      return true;
    return false;
  }
}

export default Game;
