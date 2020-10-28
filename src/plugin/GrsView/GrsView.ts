import { GrsViewVolume } from './GrsViewVolume.ts';
import { GrsViewButton } from './GrsViewButton.ts';
import { GrsViewScale } from './GrsViewScale.ts';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver.ts';
import { IOptions } from '../GrsOptions/GrsOptions.ts';

type OptionsExluded =
  | 'isVertical'
  | 'isInterval'
  | 'withPointers'
  | 'withScale';

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
  options: IOptions;
  readonly elements: IElements;
  observer: IGrsObserver;
  init(domElement: HTMLElement): void;
  getElement(element: keyof IElements): HTMLElement;
  calcCoords(element: keyof IElements): Coordinates;
  calcPersentOffset(key: Exclude<keyof IOptions, OptionsExluded>): number;
  addParameter(parameter: Parameter): void;
  removeParameter(parameter: Parameter): void;
  updateView(options: IOptions): void;
  render(): void;
}

class GrsView implements IGrsView {
  options: IOptions;
  readonly elements: IElements;
  observer: IGrsObserver;

  constructor() {
    this.options = {} as IOptions;
    this.elements = {} as IElements;
    this.observer = new GrsObserver();
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

    this.updateView(this.options);
    this.onMoveButton();
    this.onClickVolume();
    this.onClickScale();
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

  calcPersentOffset(key: Exclude<keyof IOptions, OptionsExluded>) {
    let value: number = this.options[key] as number;

    let result: number =
      ((value - this.options.minLimit) /
        (this.options.maxLimit - this.options.minLimit)) *
      100;

    return result;
  }

  addParameter(parameter: Parameter) {
    this.elements.rangeSlider.classList.add(`grs-${parameter}`);
  }

  removeParameter(parameter: Parameter) {
    this.elements.rangeSlider.classList.remove(`grs-${parameter}`);
  }

  updateView(options: IOptions) {
    this.options = options;
    // Проверка параметров отрисовки
    this.options.isVertical
      ? this.addParameter('isVertical')
      : this.removeParameter('isVertical');

    this.options.isInterval
      ? this.addParameter('isInterval')
      : this.removeParameter('isInterval');

    this.options.withPointers
      ? this.addParameter('withPointers')
      : this.removeParameter('withPointers');

    this.options.withScale
      ? this.addParameter('withScale')
      : this.removeParameter('withScale');

    // Значения шкалы (лимитов)
    this.getElement('scaleMin').innerHTML = String(this.options.minLimit);
    this.getElement('scaleMax').innerHTML = String(this.options.maxLimit);

    // Отрисовка элементов
    this.render();
  }

  render() {
    // Ползунок min
    this.getElement('buttonMin').style.left =
      this.calcPersentOffset('minValue') + '%';
    this.getElement('pointerMin').innerHTML = String(this.options.minValue);
    // Ползунок max
    if (this.options.isInterval) {
      this.getElement('buttonMax').style.left =
        this.calcPersentOffset('maxValue') + '%';
      this.getElement('pointerMax').innerHTML = String(this.options.maxValue);
    }
    // Шкала прогресса filled
    if (this.options.isInterval) {
      this.getElement('filled').style.left = this.getElement(
        'buttonMin'
      ).style.left;
      this.getElement('filled').style.width =
        this.calcPersentOffset('maxValue') -
        this.calcPersentOffset('minValue') +
        '%';
    } else {
      this.getElement('filled').style.width = this.getElement(
        'buttonMin'
      ).style.left;
    }
  }
}

export { IGrsView, GrsView };
