class InputHandler {
  constructor(keyList, controlBtnsId) {
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
    if (controlBtnsId) {
      const padding = 20;
      let touching = false;
      const button = document.getElementById(controlBtnsId);

      const setMobileKeysPosition = (event) => {
        const touch = event.touches[0];
        const rect = button.getBoundingClientRect();
        let x = touch.clientX - rect.left - rect.width / 2;
        let y = touch.clientY - rect.top - rect.height / 2;

        x = Math.abs(x) < padding ? 0 : x > 0 ? 1 : -1;
        y = Math.abs(y) < padding ? 0 : y > 0 ? 1 : -1;

        if (x === 0) {
          ["ArrowLeft", "ArrowRight"].forEach((key) => {
            this.keys[key] = false;
          });
        }
        if (x > 0) {
          this.keys.ArrowLeft = false;
          this.keys.ArrowRight = true;
        }
        if (x < 0) {
          this.keys.ArrowLeft = true;
          this.keys.ArrowRight = false;
        }
        if (y === 0) {
          ["ArrowUp", "ArrowDown"].forEach((key) => {
            this.keys[key] = false;
          });
        }
        if (y > 0) {
          this.keys.ArrowUp = false;
          this.keys.ArrowDown = true;
        }
        if (y < 0) {
          this.keys.ArrowUp = true;
          this.keys.ArrowDown = false;
        }
      };

      button.addEventListener("touchstart", (event) => {
        touching = true;
        setMobileKeysPosition(event);
      });
      window.addEventListener("touchmove", (event) => {
        if (touching) {
          setMobileKeysPosition(event);
        }
      });
      window.addEventListener("touchend", (event) => {
        if (touching) {
          touching = false;
          ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].forEach((key) => {
            this.keys[key] = false;
          });
        }
      });
      //
      const container = document.getElementById("starfarer-container");
      container.addEventListener("touchstart", () => {
        this.keys.Enter = true;
      });
      container.addEventListener("touchend", () => {
        this.keys.Enter = false;
      });
      //
      const shootBtn = document.getElementById("shoot-btn");
      shootBtn.addEventListener("touchstart", () => {
        this.keys[" "] = true;
      });
      shootBtn.addEventListener("touchend", () => {
        this.keys[" "] = false;
      });
    }
  }
}

export default InputHandler;
