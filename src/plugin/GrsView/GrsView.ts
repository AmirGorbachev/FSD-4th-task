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
  init(domElement: HTMLElement, options: IOptions): void;
  getElement(element: keyof IElements): HTMLElement;
  calcCoords(element: keyof IElements): Coordinates;
  calcPersentOffset(key: Exclude<keyof IOptions, OptionsExluded>): number;
  addParameter(parameter: Parameter): void;
  removeParameter(parameter: Parameter): void;
  updateView(options: IOptions): void;
  render(): void;
  onMoveButton(): void;
  onClickVolume(): void;
  onClickScale(): void;
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

  init(domElement: HTMLElement, options: IOptions) {
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

    this.options = options;

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

  onMoveButton() {
    // Кнопка минимальная или максимальная
    let isElementButtonMin: boolean;

    // События
    let onMouseDown = (event: MouseEvent) => {
      isElementButtonMin = (event.currentTarget as HTMLElement).classList.contains(
        'grs-button-min'
      );
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    let onMouseMove = (event: MouseEvent) => {
      // Сброс действия по умолчанию (выделение текста)
      event.preventDefault();

      // Новая позиция кнопки
      let newPosition = event.clientX - this.calcCoords('volume').left;

      // Границы смещения
      let leftEdge, rightEdge;
      if (isElementButtonMin) {
        leftEdge = 0;
        rightEdge = this.options.isInterval
          ? this.calcCoords('buttonMax').middleX -
            this.calcCoords('volume').left
          : this.calcCoords('volume').rigth;
      } else {
        leftEdge =
          this.calcCoords('buttonMin').middleX - this.calcCoords('volume').left;
        rightEdge = this.calcCoords('volume').width;
      }
      // Проверка выхода за границы
      if (newPosition < leftEdge) {
        newPosition = leftEdge;
      } else if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }

      // Смещение кнопки в процентах
      // ((смещение / ширина слайдера) * 100%)
      let shiftX = (newPosition / this.calcCoords('volume').width) * 100;

      // Уведомление об изменении
      if (isElementButtonMin) {
        this.observer.notifySubscribers({ option: 'minValue', value: shiftX });
      } else {
        this.observer.notifySubscribers({ option: 'maxValue', value: shiftX });
      }

      // Отрисовка элементов
      this.render();
    };

    let onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    this.getElement('buttonMin').addEventListener('mousedown', onMouseDown);
    this.getElement('buttonMax').addEventListener('mousedown', onMouseDown);
  }

  onClickVolume() {
    this.getElement('volume').addEventListener('click', () => {
      // Смещение кнопки в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      let shiftX =
        (((event as MouseEvent).clientX - this.calcCoords('volume').left) /
          this.calcCoords('volume').width) *
        100;

      // Уведомление об изменении
      if (
        this.options.isInterval &&
        shiftX > this.calcPersentOffset('maxValue')
      ) {
        this.observer.notifySubscribers({ option: 'maxValue', value: shiftX });
      } else {
        this.observer.notifySubscribers({ option: 'minValue', value: shiftX });
      }
      // Отрисовка элементов
      this.render();
    });
  }

  onClickScale() {
    this.getElement('scaleMin').addEventListener('click', () => {
      // Уведомление об изменении
      this.observer.notifySubscribers({ option: 'minValue', value: 0 });
      // Отрисовка элементов
      this.render();
    });
    this.getElement('scaleMax').addEventListener('click', () => {
      // Уведомление об изменении
      if (this.options.isInterval) {
        this.observer.notifySubscribers({ option: 'maxValue', value: 100 });
      } else {
        this.observer.notifySubscribers({ option: 'minValue', value: 100 });
      }
      // Отрисовка элементов
      this.render();
    });
  }
}

export { IGrsView, GrsView };
