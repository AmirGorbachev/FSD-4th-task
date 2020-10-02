"use strict";

import {GrsViewVolume} from "../GrsView/GrsViewVolume.js";
import {GrsViewButton} from "../GrsView/GrsViewButton.js";
import {GrsViewScale} from "../GrsView/GrsViewScale.js";

class GrsView {

  constructor() {}

  createSliderElements(element, min, max) {
      this.rangeSlider = document.createElement("div");
      this.rangeSlider.className = "green-range-slider grs";

      [this.buttonMin, this.pointerMin] = new GrsViewButton().initButtonMin();

      [this.volume, this.filled] = new GrsViewVolume().init();

      [this.scale, this.scaleMin, this.scaleMax] = new GrsViewScale().init(min, max);

      this.rangeSlider.append(this.volume,
                              this.buttonMin,
                              // this.ButtonMax,
                              this.scale);

      element.append(this.rangeSlider);
  }

  getRangeSlider() {
    return this.rangeSlider;
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

  getVolume() {
    return this.volume;
  }

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