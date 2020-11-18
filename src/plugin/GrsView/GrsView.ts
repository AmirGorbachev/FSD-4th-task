import GrsViewVolume from './GrsViewVolume';
import GrsViewButtons from './GrsViewButtons';
import GrsViewScale from './GrsViewScale';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';
import { IOptions } from '../GrsOptions/GrsOptions';

type Parameter = 'isVertical' | 'isInterval' | 'withPointers' | 'withScale';

interface ISubView {
  volume: GrsViewVolume;
  buttons: GrsViewButtons;
  scale: GrsViewScale;
}

class GrsView {
  subView: ISubView;
  readonly element: HTMLElement;
  observer: IGrsObserver;

  constructor() {
    this.subView = {} as ISubView;
    this.observer = new GrsObserver();

    this.element = document.createElement('div');
    this.element.className = 'green-range-slider grs';
  }

  init(container: HTMLElement, options: IOptions): void {
    this.initElements(container, options);

    this.updateView(options);

    this.createEventLicteners(options);
  }

  initElements(container: HTMLElement, options: IOptions): void {
    this.subView.volume = new GrsViewVolume(options);

    this.subView.buttons = new GrsViewButtons(
      options,
      this.subView.volume.volume as HTMLDivElement
    );

    this.subView.scale = new GrsViewScale(options);

    this.element.append(
      this.subView.volume.getElements('volume'),
      this.subView.scale.getElements('scale'),
      this.subView.buttons.getElements('buttonMin'),
      this.subView.buttons.getElements('buttonMax')
    );

    container.append(this.element);
  }

  createEventLicteners(options: IOptions): void {
    this.subView.volume.onClick(options);
    this.subView.scale.onClick(options);
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

  updateView(options: IOptions): void {
    // Проверка параметров отрисовки
    options.isVertical
      ? this.addParameter('isVertical')
      : this.removeParameter('isVertical');

    options.isInterval
      ? this.addParameter('isInterval')
      : this.removeParameter('isInterval');

    options.withPointers
      ? this.addParameter('withPointers')
      : this.removeParameter('withPointers');

    options.withScale
      ? this.addParameter('withScale')
      : this.removeParameter('withScale');

    // Отрисовка элементов
    this.render(options);
  }

  render(options: IOptions): void {
    // Ползунокbи
    this.subView.buttons.render(options);
    // Шкала прогресса filled
    this.subView.volume.render(options);
    // Шкала значений
    this.subView.scale.render(options);
  }

  addParameter(parameter: Parameter): void {
    this.element.classList.add(`grs-${parameter}`);
  }

  removeParameter(parameter: Parameter): void {
    this.element.classList.remove(`grs-${parameter}`);
  }
}

export {GrsView};
