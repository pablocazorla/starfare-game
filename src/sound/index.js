class Sound {
  constructor(game, id) {
    const src = document.getElementById(id).src;
    this.audio = new Audio(src);
    this.initialTime = 0;
    this.game = game;
  }
  play() {
    if (!this.game.muted) {
      this.audio.currentTime = this.initialTime;
      this.audio.play();
    }

    return this;
  }
  pause() {
    this.audio.pause();
    return this;
  }
  resume() {
    if (!this.game.muted) {
      this.audio.play();
    }
    return this;
  }
  stop() {
    this.audio.currentTime = this.initialTime;
    this.audio.pause();
    return this;
  }
  setVolume(volume) {
    this.audio.volume = volume;
    return this;
  }
  setLoopeable() {
    this.audio.loop = true;
    return this;
  }
  setInitialTime(time) {
    this.initialTime = time;
    this.audio.currentTime = time;
    return this;
  }
}

export default Sound;
