type IElements = Array<HTMLDivElement | HTMLSpanElement>;

interface IGrsViewButton {
  init(): IElements;
}

class GrsViewButton implements IGrsViewButton {
  init(): IElements {
    const buttonMin: HTMLDivElement = document.createElement('div');
    buttonMin.className = 'grs-button-min';

    const pointerMin: HTMLSpanElement = document.createElement('span');
    pointerMin.className = 'grs-pointer-min';

    buttonMin.append(pointerMin);

    const buttonMax: HTMLDivElement = document.createElement('div');
    buttonMax.className = 'grs-button-max';

    const pointerMax: HTMLSpanElement = document.createElement('span');
    pointerMax.className = 'grs-pointer-max';

    buttonMax.append(pointerMax);

    return [buttonMin, pointerMin, buttonMax, pointerMax];
  }
}

export { GrsViewButton };
