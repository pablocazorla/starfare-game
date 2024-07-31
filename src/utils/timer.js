class Timer {
  constructor(duration) {
    this.time = 0;
    this.duration = duration;
    this.callback = null;
  }
  update(timeframe) {
    this.time += timeframe;

    if (this.time >= this.duration && this.callback) {
      this.time = 0;
      this.callback();
    }
  }
  each(callback) {
    this.callback = callback;
  }
}

export default Timer;
