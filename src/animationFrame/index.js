class AnimationFrame {
  constructor(frameCount, duration) {
    this.stopped = false;
    this.frame = 0;
    this.time = 0;
    this.frameCount = frameCount;
    this.frameDuration = duration / frameCount;
  }
  update(timeframe) {
    if (this.stopped) {
      return;
    }
    this.time += timeframe;
    if (this.time >= this.frameDuration) {
      this.time = 0;
      this.frame++;
    }
    if (this.frame > this.frameCount) {
      this.frame = 0;
    }
  }
  start() {
    this.stopped = false;
  }
  pause() {
    this.time = 0;
    this.stopped = true;
  }
  stop() {
    this.frame = 0;
    this.time = 0;
    this.stopped = true;
  }
}
export default AnimationFrame;
