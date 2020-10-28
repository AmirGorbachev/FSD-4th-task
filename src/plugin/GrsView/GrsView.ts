import { GrsViewVolume } from './GrsViewVolume.ts';
import { GrsViewButton } from './GrsViewButton.ts';
import { GrsViewScale } from './GrsViewScale.ts';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver.ts';

type Parameter = 'isVertical' | 'isInterval' | 'withPointers' | 'withScale';

type Coordinates = {
  top: number;
  left: number;
  rigth: number;
  bottom: number;
  width: number;
  middleX: number;
};

interface IElements {
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
  readonly elements: IElements;
  init(domElement: HTMLElement): void;
  getElement(element: keyof IElements): HTMLElement;
  calcCoords(element: keyof IElements): Coordinates;
  addParameter(parameter: Parameter): void;
  removeParameter(parameter: Parameter): void;
}

class GrsView implements IGrsView {
  readonly elements: IElements;

  constructor() {
    this.elements = {} as IElements;
  }

  init(domElement: HTMLElement) {
    this.elements.rangeSlider = document.createElement('div');
    this.elements.rangeSlider.className = 'green-range-slider grs';

    [
      this.elements.buttonMin,
      this.elements.pointerMin,
      this.elements.buttonMax,
      this.elements.pointerMax,
    ] = new GrsViewButton().init();

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

    domElement.append(this.elements.rangeSlider);
  }

  getElement(element: keyof IElements) {
    return this.elements[element];
  }

  calcCoords(element: keyof IElements) {
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

  addParameter(parameter: Parameter) {
    this.elements.rangeSlider.classList.add(`grs-${parameter}`);
  }

  removeParameter(parameter: Parameter) {
    this.elements.rangeSlider.classList.remove(`grs-${parameter}`);
  }
}

export { IGrsView, GrsView };
