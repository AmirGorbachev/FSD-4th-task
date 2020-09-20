"use strict";

class GrsView {

  contructor() {

  }

  createSliderElements(element) {
      this.rangeSlider = document.createElement("div");
      this.rangeSlider.className = "green-range-slider grs";

      this.rangeSliderButtonMin = document.createElement("div");
      this.rangeSliderButtonMin.className = "grs-button-min";

      this.rangeSliderButtonMax = document.createElement("div");
      this.rangeSliderButtonMax.className = "grs-button-max";

      this.rangeSliderFilled = document.createElement("div");
      this.rangeSliderFilled.className = "grs-filled";

      this.rangeSlider.append(this.rangeSliderButtonMin,
                              this.rangeSliderFilled,
                              this.rangeSliderButtonMax);

      element.append(this.rangeSlider);
  }

  getElement() {
    return this.rangeSlider;
  }

  getButtonMin() {
    return this.rangeSliderButtonMin;
  }

  getButtonMax() {
    return this.rangeSliderButtonMax;
  }

  getFilled() {
    return this.rangeSliderFilled;
  }

};

export {GrsView};