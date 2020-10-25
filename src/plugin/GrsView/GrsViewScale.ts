'use strict';

interface IElements {
  [index: number]: HTMLDivElement | HTMLSpanElement;
}

interface IGrsViewScale {
  init(): IElements;
}

class GrsViewScale implements IGrsViewScale {
  constructor() {}

  init() {
    const scale: HTMLDivElement = document.createElement('div');
    scale.className = 'grs-scale';

    const scaleMin: HTMLSpanElement = document.createElement('span');
    scaleMin.className = 'grs-scale-min';

    const scaleMax: HTMLSpanElement = document.createElement('span');
    scaleMax.className = 'grs-scale-max';

    scale.append(scaleMin, scaleMax);

    return [scale, scaleMin, scaleMax];
  }
}

export { GrsViewScale };
