class Renderer {
  constructor(game) {
    this.gridSize = game.size;
    this.boxSize = [1, 1, 1];
    this.gap = 2;
    this.cameraGap = 0.1;
  }
  getLightPosition(box) {
    return box ? this.getBoxPosition(box) : this.getCenter();
  }
  getCameraPosition(box) {
    const center = this.getCenter();
    if (box) {
      center[0] += box.x * this.cameraGap;
      center[1] += box.y * this.cameraGap;
    }
    return center;
  }
  getBoxPosition(box) {
    return [box.x * this.gap, box.y * this.gap];
  }
  getCenter() {
    const center = this.gridSize * 0.5 * this.gap;
    return [center, center];
  }
}

export default Renderer;
