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
    this.renderer = new Renderer(size);
    this.start();
  }
  start() {
    this.currentKey = 0;
    this.currentBox = null;
    this.solution = {};
  }
  getBoxAt(x, y) {
    return this.boxes[y * this.size + x];
  }
  getBoxAtKey(key) {
    return this.boxes[key];
  }
  getOption(source, [dx, dy]) {
    const x = source.x + dx;
    const y = source.y + dy;
    if (x < 0 || x >= this.size || y < 0 || y >= this.size) return null;
    const box = this.getBoxAt(x, y);
    return this.solution[box.k] ? null : box;
  }
  getOptions(box) {
    return options
      .map((option) => this.getOption(box, option))
      .filter((o) => o);
  }
  isComplete() {
    const size = this.boxes.length;
    return (
      this.currentKey === size && Object.keys(this.solution).length === size
    );
  }
  isStuck() {
    if (!this.currentBox) return false;
    for (const option of options) {
      const target = this.getOption(this.currentBox, option);
      if (target) return false;
    }
    return true;
  }
  canBeSelected(target) {
    const source = this.currentBox;
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
  isSelected(box) {
    return this.solution[box.k] ? true : false;
  }
  isAvailable(box) {
    return !this.isSelected(box) && this.canBeSelected(box);
  }
  next(key) {
    const box = this.getBoxAtKey(key);
    if (this.canBeSelected(box)) {
      this.currentKey += 1;
      this.currentBox = box;
      this.solution[key] = this.currentKey;
    }
  }
  getResult() {
    return this.currentKey;
  }
  solve() {
    this.currentKey = 99;
    this.currentBox = this.getBoxAtKey(3);
    for (let i = 1; i < 100; i += 1) {
      this.solution[i] = i;
    }
  }
}

export default Game;
