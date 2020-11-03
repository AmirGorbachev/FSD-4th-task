import { GrsViewVolume } from './GrsViewVolume';
import { GrsViewButton } from './GrsViewButton';
import { GrsViewScale } from './GrsViewScale';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';
import { IOptions } from '../GrsOptions/GrsOptions';

type OptionsExluded =
  | 'isVertical'
  | 'isInterval'
  | 'withPointers'
  | 'withScale';

type Parameter = OptionsExluded;

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

  init(container: HTMLElement, options: IOptions): void {
    this.elements.rangeSlider = document.createElement('div');
    this.elements.rangeSlider.className = 'green-range-slider grs';

    [this.elements.volume, this.elements.filled] = new GrsViewVolume(
      options
    ).getElements();

    [
      this.elements.buttonMin,
      this.elements.pointerMin,
      this.elements.buttonMax,
      this.elements.pointerMax,
    ] = new GrsViewButton(
      options,
      this.elements.volume as HTMLDivElement
    ).getElements();

    [
      this.elements.scale,
      this.elements.scaleMin,
      this.elements.scaleMax,
    ] = new GrsViewScale(options).getElements();

    this.elements.rangeSlider.append(
      this.elements.volume,
      this.elements.scale,
      this.elements.buttonMin,
      this.elements.buttonMax
    );

    container.append(this.elements.rangeSlider);

    this.options = options;

    this.updateView(this.options);
    this.onMoveButton();
    this.onClickVolume();
    this.onClickScale();
  }

  calcCoords(element: keyof IElements): Coordinates {
    const coordinates = this.elements[element].getBoundingClientRect();

    const coords: Coordinates = {
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

  calcPersentOffset(key: Exclude<keyof IOptions, OptionsExluded>): number {
    const value: number = this.options[key] as number;

    const result: number =
      ((value - this.options.minLimit) /
        (this.options.maxLimit - this.options.minLimit)) *
      100;

    return result;
  }

  addParameter(parameter: Parameter): void {
    this.elements.rangeSlider.classList.add(`grs-${parameter}`);
  }

  removeParameter(parameter: Parameter): void {
    this.elements.rangeSlider.classList.remove(`grs-${parameter}`);
  }

  updateView(options: IOptions): void {
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
    this.elements.scaleMin.innerHTML = String(this.options.minLimit);
    this.elements.scaleMax.innerHTML = String(this.options.maxLimit);

    // Отрисовка элементов
    this.render();
  }

  render(): void {
    // Ползунок min
    this.elements.buttonMin.style.left =
      this.calcPersentOffset('minValue') + '%';
    this.elements.pointerMin.innerHTML = String(this.options.minValue);
    // Ползунок max
    if (this.options.isInterval) {
      this.elements.buttonMax.style.left =
        this.calcPersentOffset('maxValue') + '%';
      this.elements.pointerMax.innerHTML = String(this.options.maxValue);
    }
    // Шкала прогресса filled
    if (this.options.isInterval) {
      this.elements.filled.style.left = this.elements.buttonMin.style.left;
      this.elements.filled.style.width =
        this.calcPersentOffset('maxValue') -
        this.calcPersentOffset('minValue') +
        '%';
    } else {
      this.elements.filled.style.width = this.elements.buttonMin.style.left;
    }
  }

  onMoveButton(): void {
    // Кнопка минимальная или максимальная
    let isElementButtonMin: boolean;

    // События
    const onMouseDown = (event: MouseEvent) => {
      isElementButtonMin = (event.currentTarget as HTMLElement).classList.contains(
        'grs-button-min'
      );
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event: MouseEvent) => {
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
      const shiftX = (newPosition / this.calcCoords('volume').width) * 100;

      // Уведомление об изменении
      if (isElementButtonMin) {
        this.observer.notifySubscribers({ option: 'minValue', value: shiftX });
      } else {
        this.observer.notifySubscribers({ option: 'maxValue', value: shiftX });
      }

      // Отрисовка элементов
      this.render();
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    this.elements.buttonMin.addEventListener('mousedown', onMouseDown);
    this.elements.buttonMax.addEventListener('mousedown', onMouseDown);
  }

  onClickVolume(): void {
    const handleCliclVolume = () => {
      // Смещение кнопки в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      const shiftX =
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
    };

    this.elements.volume.addEventListener('click', handleCliclVolume);
  }

  onClickScale(): void {
    const handleClickScaleMin = () => {
      // Уведомление об изменении
      this.observer.notifySubscribers({ option: 'minValue', value: 0 });
      // Отрисовка элементов
      this.render();
    };

    const handleClickScaleMax = () => {
      // Уведомление об изменении
      if (this.options.isInterval) {
        this.observer.notifySubscribers({ option: 'maxValue', value: 100 });
      } else {
        this.observer.notifySubscribers({ option: 'minValue', value: 100 });
      }
      // Отрисовка элементов
      this.render();
    };

    this.elements.scaleMin.addEventListener('click', handleClickScaleMin);
    this.elements.scaleMax.addEventListener('click', handleClickScaleMax);
  }
}

export { IGrsView, GrsView };
