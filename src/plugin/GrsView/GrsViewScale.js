"use strict";

class GrsViewScale {

  constructor() {}

  init(minLimit, maxLimit) {
    let scale = document.createElement("div");
    scale.className = "grs-scale";

    let scaleMin = document.createElement("span");
    scaleMin.className = "grs-scale-min";
    scaleMin.innerHTML = minLimit;

    let scaleMax = document.createElement("span");
    scaleMax.className = "grs-scale-max";
    scaleMax.innerHTML = maxLimit;

    scale.append(scaleMin,
                 scaleMax);

    this.scale = scale;
    this.scaleMin = scaleMin;
    this.scaleMax = scaleMax;

    return [this.scale, this.scaleMin, this.scaleMax];
  }


}

export {GrsViewScale};