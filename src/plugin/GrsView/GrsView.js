"use strict";

class GrsView {

  contructor() {

  }

  createSliderElements(element, min, max) {
      this.rangeSlider = document.createElement("div");
      this.rangeSlider.className = "green-range-slider grs";

      this.ButtonMin = document.createElement("div");
      this.ButtonMin.className = "grs-button-min";
      this.ButtonMin.style = "left: 15%";

      // this.ButtonMax = document.createElement("div");
      // this.ButtonMax.className = "grs-button-max";

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

      this.Scale.append(this.ScaleMin,
                        this.ScaleMax);

      this.rangeSlider.append(this.Filled,
                              this.ButtonMin,
                              // this.ButtonMax,
                              this.Scale);

      element.append(this.rangeSlider);
  }

  getElement() {
    return this.rangeSlider;
  }

  getButtonMin() {
    return this.ButtonMin;
  }

  // getButtonMax() {
  //   return this.ButtonMax;
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