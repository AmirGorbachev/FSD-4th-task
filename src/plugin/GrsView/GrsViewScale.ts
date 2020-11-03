import { GrsSubView } from './GrsSubView';
import { IOptions } from '../GrsOptions/GrsOptions';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';

type IElements = Array<HTMLDivElement | HTMLSpanElement>;

interface IConfig {
  isInterval: boolean;
}

class GrsViewScale extends GrsSubView {
  scale: HTMLDivElement;
  scaleMin: HTMLSpanElement;
  scaleMax: HTMLSpanElement;
  observer: IGrsObserver;

  constructor(options: IOptions) {
    super(options);

    this.scale = document.createElement('div');
    this.scale.className = 'grs-scale';

    this.scaleMin = document.createElement('span');
    this.scaleMin.className = 'grs-scale-min';

    this.scaleMax = document.createElement('span');
    this.scaleMax.className = 'grs-scale-max';

    this.scale.append(this.scaleMin, this.scaleMax);

    this.observer = new GrsObserver();
  }

  getElements(): IElements {
    return [this.scale, this.scaleMin, this.scaleMax];
  }

  render(options: IOptions): void {
    this.scaleMin.innerHTML = String(options.minLimit);
    this.scaleMax.innerHTML = String(options.maxLimit);
  }

  onClick(config: IConfig): void {
    const handleClickScaleMin = () => {
      // Уведомление об изменении
      this.observer.notifySubscribers({ option: 'minValue', value: 0 });
    };

    const handleClickScaleMax = () => {
      // Уведомление об изменении
      if (config.isInterval) {
        this.observer.notifySubscribers({ option: 'maxValue', value: 100 });
      } else {
        this.observer.notifySubscribers({ option: 'minValue', value: 100 });
      }
    };

    this.scaleMin.addEventListener('click', handleClickScaleMin);
    this.scaleMax.addEventListener('click', handleClickScaleMax);
  }
}

export { GrsViewScale };
