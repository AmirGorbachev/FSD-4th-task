"use strict";

class GrsViewButton {

  constructor() {
  }

  init() {
    let buttonMin = document.createElement("div");
    buttonMin.className = "grs-button-min";
    buttonMin.style = "left: 15%";

    let pointerMin = document.createElement("span");
    pointerMin.className = "grs-pointer-min";

    buttonMin.append(this.pointerMin);

    this.buttonMin = buttonMin;
    // this.ButtonMax = document.createElement("div");
    // this.ButtonMax.className = "grs-button-max";

    // this.pointerMax = document.createElement("span");
    // this.pointerMax.className = "grs-pointer-max";

    // this.ButtonMax.append(this.pointerMax);
  }

}

export {GrsViewButton};