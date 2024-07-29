class InputHandler {
  constructor(keyList) {
    this.keys = keyList.reduce((obj, key) => {
      obj[key] = false;
      return obj;
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
