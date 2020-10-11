"use strict";

import {GrsViewVolume} from "../GrsView/GrsViewVolume.js";
import {GrsViewButton} from "../GrsView/GrsViewButton.js";
import {GrsViewScale} from "../GrsView/GrsViewScale.js";

class GrsView {

  constructor() {}

  createSliderElements(element, min, max) {
      this.rangeSlider = document.createElement("div");
      this.rangeSlider.className = "green-range-slider grs";

      [this.buttonMin, this.pointerMin, this.buttonMax, this.pointerMax] =
        new GrsViewButton().initButtonMin();

      [this.volume, this.filled] = new GrsViewVolume().init();

      [this.scale, this.scaleMin, this.scaleMax] = new GrsViewScale().init();

      this.rangeSlider.append(this.volume,
                              this.scale,
                              this.buttonMin,
                              this.buttonMax);

      element.append(this.rangeSlider);
  }

  calcCoords(element) {
    let coordinates = element.getBoundingClientRect();

    let coords = {
      top: coordinates.top + window.pageYOffset,
      left: coordinates.left + window.pageXOffset,
      rigth: coordinates.left + window.pageXOffset +
             coordinates.width,
      bottom: coordinates.top + window.pageYOffset +
              coordinates.height,
      width: coordinates.width
    };

    return coords;
  }

  addVertical() {
    this.rangeSlider.classList.add("grs-is-vertical");
  }
  removeVertical() {
    this.rangeSlider.classList.remove("grs-is-vertical");
  }

  addInterval() {
    this.rangeSlider.classList.add("grs-is-interval");
  }
  removeInterval() {
    this.rangeSlider.classList.remove("grs-is-interval");
  }

  addPointers() {
    this.rangeSlider.classList.add("grs-with-pointers");
  }
  removePointers() {
    this.rangeSlider.classList.remove("grs-with-pointers");
  }

  addScale() {
    this.rangeSlider.classList.add("grs-with-scale");
  }
  removeScale() {
    this.rangeSlider.classList.remove("grs-with-scale");
  }


  getRangeSlider() {
    return this.rangeSlider;
  }

  getVolume() {
    return this.volume;
  }

  getFilled() {
    return this.filled;
  }

  getButtonMin() {
    return this.buttonMin;
  }

  getPointerMin() {
    return this.pointerMin;
  }

  getButtonMax() {
    return this.buttonMax;
  }

  getPointerMax() {
    return this.pointerMax;
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