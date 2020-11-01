import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';

type IElements = Array<HTMLDivElement | HTMLSpanElement>;

interface IConfig {
  isInterval: boolean;
}

interface IGrsViewVolume {
  volume: HTMLElement;
  filled: HTMLElement;
  observer: IGrsObserver;
  getElements(): IElements;
  render(config: IConfig): void;
  onClick(config: IConfig): void;
}

class GrsViewVolume implements IGrsViewVolume {
  volume: HTMLElement;
  filled: HTMLElement;
  observer: IGrsObserver;

  constructor() {
    this.volume = document.createElement('div');
    this.volume.className = 'grs-volume';

    this.filled = document.createElement('div');
    this.filled.className = 'grs-filled';

    this.volume.append(this.filled);

    this.observer = new GrsObserver();
  }

  getElements(): IElements {
    return [this.volume, this.filled];
  }

  render(config: IConfig): void {
    if (config.isInterval) {
      this.filled.style.left = this.calcPersentOffset('minValue') + '%';
      this.filled.style.width =
        this.calcPersentOffset('maxValue') -
        this.calcPersentOffset('minValue') +
        '%';
    } else {
      this.filled.style.width = this.calcPersentOffset('minValue') + '%';
    }
  }

  onClick(config: IConfig): void {
    const handleClickVolume = () => {
      // Смещение кнопки в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      const shiftX =
        (((event as MouseEvent).clientX - this.calcCoords('volume').left) /
          this.calcCoords('volume').width) *
        100;

      // Уведомление об изменении
      if (
        config.isInterval &&
        shiftX > this.calcPersentOffset('maxValue')
      ) {
        this.observer.notifySubscribers({ option: 'maxValue', value: shiftX });
      } else {
        this.observer.notifySubscribers({ option: 'minValue', value: shiftX });
      }
    };

    this.volume.addEventListener('click', handleClickVolume);
  }
}

export { GrsViewVolume };
