class InputHandler {
  constructor(keyList) {
    this.keys = keyList.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {});

    window.addEventListener("keydown", (event) => {
      event.preventDefault();
      if (this.keys[event.key] === false) {
        this.keys[event.key] = true;
      }
    });

    window.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (this.keys[event.key]) {
        this.keys[event.key] = false;
      }
    });
  }
}

export default InputHandler;
