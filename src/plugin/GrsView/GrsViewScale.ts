'use strict';

interface IGrsViewScale {
  scale: HTMLDivElement;
  scaleMin: HTMLSpanElement;
  scaleMax: HTMLSpanElement;
}

class GrsViewScale implements IGrsViewScale {
  scale: HTMLDivElement;
  scaleMin: HTMLSpanElement;
  scaleMax: HTMLSpanElement;

  constructor() {}

  init() {
    const scale: HTMLDivElement = document.createElement('div');
    scale.className = 'grs-scale';

    const scaleMin: HTMLSpanElement = document.createElement('span');
    scaleMin.className = 'grs-scale-min';

    const scaleMax: HTMLSpanElement = document.createElement('span');
    scaleMax.className = 'grs-scale-max';

    scale.append(scaleMin, scaleMax);

    this.scale = scale;
    this.scaleMin = scaleMin;
    this.scaleMax = scaleMax;

    return [this.scale, this.scaleMin, this.scaleMax];
  }
}

export { GrsViewScale };
