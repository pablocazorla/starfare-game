class InputHandler {
  constructor(keyList, buttonList) {
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
    /**************************/

    buttonList.forEach(({ id, key }) => {
      const button = document.getElementById(id);
      button.addEventListener("touchstart", () => {
        this.keys[key] = true;
      });

      button.addEventListener("touchend", () => {
        this.keys[key] = false;
      });
      button.addEventListener("touchleave", () => {
        this.keys[key] = false;
      });
    });
  }
}

export default InputHandler;
