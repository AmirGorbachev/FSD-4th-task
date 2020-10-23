'use strict';

import { GrsViewVolume } from '../GrsView/GrsViewVolume';
import { GrsViewButton } from '../GrsView/GrsViewButton';
import { GrsViewScale } from '../GrsView/GrsViewScale';

type Parameter = 'isVertical' | 'isInterval' | 'withPointers' | 'withScale';

type Coordinates = {
  top: number;
  left: number;
  rigth: number;
  bottom: number;
  width: number;
  middleX: number;
};

interface Elements {
  rangeSlider: HTMLElement;
  buttonMin: HTMLElement;
  pointerMin: HTMLElement;
  buttonMax: HTMLElement;
  pointerMax: HTMLElement;
  volume: HTMLElement;
  filled: HTMLElement;
  scale: HTMLElement;
  scaleMin: HTMLElement;
  scaleMax: HTMLElement;
}

interface IGrsView {
  readonly elements: Elements;
  init(element: HTMLElement): void;
  getElement(element: keyof Elements): HTMLElement;
  calcCoords(element: keyof Elements): Coordinates;
  addParameter(parameter: Parameter): void;
  removeParameter(parameter: Parameter): void;
}

class GrsView implements IGrsView {
  readonly elements: Elements;

  constructor() {
    this.elements;
  }

  init(element) {
    this.elements.rangeSlider = document.createElement('div');
    this.elements.rangeSlider.className = 'green-range-slider grs';

    [
      this.elements.buttonMin,
      this.elements.pointerMin,
      this.elements.buttonMax,
      this.elements.pointerMax,
    ] = new GrsViewButton().initButtonMin();

    [this.elements.volume, this.elements.filled] = new GrsViewVolume().init();

    [
      this.elements.scale,
      this.elements.scaleMin,
      this.elements.scaleMax,
    ] = new GrsViewScale().init();

    this.elements.rangeSlider.append(
      this.elements.volume,
      this.elements.scale,
      this.elements.buttonMin,
      this.elements.buttonMax
    );

    element.append(this.elements.rangeSlider);
  }

  getElement(element): HTMLElement {
    return this.elements[element];
  }

  calcCoords(element) {
    let coordinates = this.elements[element].getBoundingClientRect();

    let coords: Coordinates = {
      top: coordinates.top + window.pageYOffset,
      left: coordinates.left + window.pageXOffset,
      rigth: coordinates.left + window.pageXOffset + coordinates.width,
      bottom: coordinates.top + window.pageYOffset + coordinates.height,
      width: coordinates.width,
      middleX:
        (coordinates.left +
          window.pageXOffset +
          coordinates.left +
          window.pageXOffset +
          coordinates.width) /
        2,
    };

    return coords;
  }

  addParameter(parameter: Parameter): void {
    this.elements.rangeSlider.classList.add(`grs-${parameter}`);
  }

  removeParameter(parameter: Parameter): void {
    this.elements.rangeSlider.classList.remove(`grs-${parameter}`);
  }
}

export { IGrsView, GrsView };
