"use strict";

class GrsViewButton {

  constructor() {}

  initButtonMin() {
    let buttonMin = document.createElement("div");
    buttonMin.className = "grs-button-min";

    let pointerMin = document.createElement("span");
    pointerMin.className = "grs-pointer-min";

    buttonMin.append(pointerMin);

    this.buttonMin = buttonMin;
    this.pointerMin = pointerMin;


    let buttonMax = document.createElement("div");
    buttonMax.className = "grs-button-max";

    let pointerMax = document.createElement("span");
    pointerMax.className = "grs-pointer-max";

    buttonMax.append(pointerMax);

    this.buttonMax = buttonMax;
    this.pointerMax = pointerMax;


    return [this.buttonMin, this.pointerMin, this.buttonMax, this.pointerMax];
  }

}

export {GrsViewButton};