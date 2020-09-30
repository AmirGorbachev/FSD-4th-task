"use strict";

import {GrsViewButton} from "../GrsView/GrsViewButton.js";

class GrsView {

  constructor() {}

  createSliderElements(element, min, max) {
      this.progressBar = document.createElement("div");
      this.progressBar.className = "green-range-slider grs";

      [this.ButtonMin, this.pointerMin] = new GrsViewButton().initButtonMin();

      this.Filled = document.createElement("div");
      this.Filled.className = "grs-filled";

      this.Scale = document.createElement("div");
      this.Scale.className = "grs-scale";

      this.ScaleMin = document.createElement("span");
      this.ScaleMin.className = "grs-scale-min";
      this.ScaleMin.innerHTML = min;

      this.ScaleMax = document.createElement("span");
      this.ScaleMax.className = "grs-scale-max";
      this.ScaleMax.innerHTML = max;

      this.ScaleStrips = document.createElement("div");
      this.ScaleStrips.className = "grs-scale-strips";

      this.Scale.append(/*this.ScaleStrips,*/
                        this.ScaleMin,
                        this.ScaleMax);

      this.progressBar.append(this.Filled,
                              this.ButtonMin,
                              // this.ButtonMax,
                              this.Scale);

      element.append(this.progressBar);
  }

  getProgressBar() {
    return this.progressBar;
  }

  getButtonMin() {
    return this.ButtonMin;
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
    return this.Filled;
  }

  getScale() {
    return this.Scale;
  }

  getScaleMin() {
    return this.ScaleMin;
  }

  getScaleMax() {
    return this.ScaleMax;
  }

};

export {GrsView};