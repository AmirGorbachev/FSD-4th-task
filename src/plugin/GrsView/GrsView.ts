import GrsViewVolume from './GrsViewVolume';
import GrsViewButtons from './GrsViewButtons';
import GrsViewScale from './GrsViewScale';
import GrsObserver from '../GrsObserver/GrsObserver';
import { IOptions } from '../GrsOptions/GrsOptions';

type Parameter = 'isVertical' | 'isInterval' | 'withPointers' | 'withScale';

interface ISubView {
  volume: GrsViewVolume;
  buttons: GrsViewButtons;
  scale: GrsViewScale;
}

export default class GrsView extends GrsObserver{
  subView: ISubView;
  readonly element: HTMLElement;

  constructor() {
    super();

    this.subView = {} as ISubView;

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

    this.subView.volume.addSubscriber(
      (data: { option: string; value: number | boolean }) => {
        this.notifySubscribers(data);
      }
    );

    this.subView.scale.addSubscriber(
      (data: { option: string; value: number | boolean }) => {
        this.notifySubscribers(data);
      }
    );

    this.subView.buttons.addSubscriber(
      (data: { option: string; value: number | boolean }) => {
        this.notifySubscribers(data);
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
