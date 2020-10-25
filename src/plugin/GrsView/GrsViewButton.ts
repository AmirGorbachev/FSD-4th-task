'use strict';

interface IElements {
  [index: number]: HTMLDivElement | HTMLSpanElement;
}

interface IGrsViewButton {
  buttonMin: HTMLDivElement;
  pointerMin: HTMLSpanElement;
  buttonMax: HTMLDivElement;
  pointerMax: HTMLSpanElement;
  init(): IElements;
}

class GrsViewButton implements IGrsViewButton {
  buttonMin: HTMLDivElement;
  pointerMin: HTMLSpanElement;
  buttonMax: HTMLDivElement;
  pointerMax: HTMLSpanElement;

  constructor() {}

  init() {
    const buttonMin: HTMLDivElement = document.createElement('div');
    buttonMin.className = 'grs-button-min';

    const pointerMin: HTMLSpanElement = document.createElement('span');
    pointerMin.className = 'grs-pointer-min';

    buttonMin.append(pointerMin);

    this.buttonMin = buttonMin;
    this.pointerMin = pointerMin;

    const buttonMax: HTMLDivElement = document.createElement('div');
    buttonMax.className = 'grs-button-max';

    const pointerMax: HTMLSpanElement = document.createElement('span');
    pointerMax.className = 'grs-pointer-max';

    buttonMax.append(pointerMax);

    this.buttonMax = buttonMax;
    this.pointerMax = pointerMax;

    return [this.buttonMin, this.pointerMin, this.buttonMax, this.pointerMax];
  }
}

export { GrsViewButton };
