import GrsSubView from './GrsSubView';
import { IOptions } from '../GrsOptions/GrsOptions';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';

interface IConfig {
  isInterval: boolean;
}

export default class GrsViewVolume extends GrsSubView {
  volume: HTMLDivElement;
  filled: HTMLDivElement;
  observer: IGrsObserver;

  constructor(options: IOptions) {
    super(options);

    this.volume = document.createElement('div');
    this.volume.className = 'grs-volume';

    this.filled = document.createElement('div');
    this.filled.className = 'grs-filled';

    this.volume.append(this.filled);

    this.observer = new GrsObserver();
  }

  getElements(element: 'volume' | 'filled'): HTMLDivElement {
    return this[element];
  }

  render(config: IConfig): void {
    if (config.isInterval) {
      this.filled.style.left =
        this.calcPersentOffset(
          this.options.minValue,
          this.options.minLimit,
          this.options.maxLimit
        ) + '%';
      this.filled.style.width =
        this.calcPersentOffset(
          this.options.maxValue,
          this.options.minLimit,
          this.options.maxLimit
        ) -
        this.calcPersentOffset(
          this.options.minValue,
          this.options.minLimit,
          this.options.maxLimit
        ) +
        '%';
    } else {
      this.filled.style.width =
        this.calcPersentOffset(
          this.options.minValue,
          this.options.minLimit,
          this.options.maxLimit
        ) + '%';
    }
  }

  onClick(config: IConfig): void {
    const handleClickVolume = () => {
      // Смещение кнопки в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      const shiftX =
        (((event as MouseEvent).clientX - this.calcCoords(this.volume).left) /
          this.calcCoords(this.volume).width) *
        100;

      // Уведомление об изменении
      if (
        config.isInterval &&
        shiftX >
          this.calcPersentOffset(
            this.options.maxValue,
            this.options.minLimit,
            this.options.maxLimit
          )
      ) {
        this.observer.notifySubscribers({ option: 'maxValue', value: shiftX });
      } else {
        this.observer.notifySubscribers({ option: 'minValue', value: shiftX });
      }
    };

    this.volume.addEventListener('click', handleClickVolume);
  }
}
