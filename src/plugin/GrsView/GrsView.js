"use strict";

import {GrsViewButton} from "../GrsView/GrsViewButton.js";
import {GrsViewScale} from "../GrsView/GrsViewScale.js";

class GrsView {

  constructor() {}

  createSliderElements(element, min, max) {
      this.progressBar = document.createElement("div");
      this.progressBar.className = "green-range-slider grs";

      [this.buttonMin, this.pointerMin] = new GrsViewButton().initButtonMin();

      this.filled = document.createElement("div");
      this.filled.className = "grs-filled";

      [this.scale, this.scaleMin, this.scaleMax] = new GrsViewScale().init(min, max);

      this.progressBar.append(this.filled,
                              this.buttonMin,
                              // this.ButtonMax,
                              this.scale);

      element.append(this.progressBar);
  }

  getProgressBar() {
    return this.progressBar;
  }

  getButtonMin() {
    return this.buttonMin;
  }

  // getButtonMax() {
  //   return this.ButtonMax;
  // }

  getPointerMin() {
    return this.pointerMin;
  }

  // getPointerMax() {
  //   return this.pointerMax;
  // }

  getFilled() {
    return this.filled;
  }

  getScale() {
    return this.scale;
  }

  getScaleMin() {
    return this.scaleMin;
  }

  getScaleMax() {
    return this.scaleMax;
  }

};

export {GrsView};