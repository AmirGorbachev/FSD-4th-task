import { GrsViewVolume } from './GrsViewVolume';
import { GrsViewButtons } from './GrsViewButtons';
import { GrsViewScale } from './GrsViewScale';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';
import { IOptions } from '../GrsOptions/GrsOptions';

type OptionsExluded =
  | 'isVertical'
  | 'isInterval'
  | 'withPointers'
  | 'withScale';

type Parameter = OptionsExluded;

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

interface ISubView {
  volume: GrsViewVolume;
  buttons: GrsViewButtons;
  scale: GrsViewScale;
}

interface IGrsView {
  options: IOptions;
  subView: ISubView;
  readonly elements: IElements;
  observer: IGrsObserver;
  init(container: HTMLElement, options: IOptions): void;
  addParameter(parameter: Parameter): void;
  removeParameter(parameter: Parameter): void;
  updateView(options: IOptions): void;
  render(): void;
}

class GrsView implements IGrsView {
  options: IOptions;
  subView: ISubView;
  readonly elements: IElements;
  observer: IGrsObserver;

  constructor() {
    this.options = {} as IOptions;
    this.subView = {} as ISubView;
    this.elements = {} as IElements;
    this.observer = new GrsObserver();
  }

  init(container: HTMLElement, options: IOptions): void {
    this.elements.rangeSlider = document.createElement('div');
    this.elements.rangeSlider.className = 'green-range-slider grs';

    this.subView.volume = new GrsViewVolume(options);

    this.subView.buttons = new GrsViewButtons(
      options,
      this.subView.volume.getElements()[0] as HTMLDivElement
    );

    this.subView.scale = new GrsViewScale(options);

    this.elements.rangeSlider.append(
      this.subView.volume.getElements()[0],
      this.subView.scale.getElements()[0],
      this.subView.buttons.getElements()[0],
      this.subView.buttons.getElements()[2]
    );

    container.append(this.elements.rangeSlider);

    this.options = options;

    this.updateView(this.options);

    this.subView.volume.onClick(this.options);
    this.subView.scale.onClick(this.options);
    this.subView.buttons.onMoveButton();

    this.subView.volume.observer.addSubscriber(
      (data: { option: string; value: number | boolean }) => {
        this.observer.notifySubscribers(data);
      }
    );

    this.subView.scale.observer.addSubscriber(
      (data: { option: string; value: number | boolean }) => {
        this.observer.notifySubscribers(data);
      }
    );

    this.subView.buttons.observer.addSubscriber(
      (data: { option: string; value: number | boolean }) => {
        this.observer.notifySubscribers(data);
      }
    );
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

    // Отрисовка элементов
    this.render();
  }

  render(): void {
    // Ползунокbи
    this.subView.buttons.render(this.options);
    // Шкала прогресса filled
    this.subView.volume.render(this.options);
    // Шкала значений
    this.subView.scale.render(this.options.minLimit, this.options.maxLimit);
  }
}

export { IGrsView, GrsView };
