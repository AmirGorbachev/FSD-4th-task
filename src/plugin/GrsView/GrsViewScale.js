"use strict";

class GrsViewScale {

  constructor() {}

  init(minLimit, maxLimit) {
    let scale = document.createElement("div");
    scale.className = "grs-scale";

    let scaleMin = document.createElement("span");
    scaleMin.className = "grs-scale-min";
    scaleMin.innerHTML = minLimit;

    this.scaleMin = scaleMin;

    let scaleMax = document.createElement("span");
    scaleMax.className = "grs-scale-max";
    scaleMax.innerHTML = maxLimit;

    this.scaleMax = scaleMax;

    let scaleStrips = document.createElement("div");
    scaleStrips.className = "grs-scale-strips";

    scale.append(scaleMin,
                 scaleStrips,
                 scaleMax);


    this.scale = scale;

    return [this.scale, this.scaleMin, this.scaleMax];
  }


}

export {GrsViewScale};