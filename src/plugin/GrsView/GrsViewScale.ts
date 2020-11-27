import GrsSubView from './GrsSubView';
import { IOptions } from '../GrsOptions/GrsOptions';

interface IConfig {
  isInterval: boolean;
}

export default class GrsViewScale extends GrsSubView {
  scale: HTMLDivElement;
  scaleMin: HTMLSpanElement;
  scaleMax: HTMLSpanElement;

  constructor(options: IOptions) {
    super(options);

    this.scale = document.createElement('div');
    this.scale.className = 'grs-scale';

    this.scaleMin = document.createElement('span');
    this.scaleMin.className = 'grs-scale-min';

    this.scaleMax = document.createElement('span');
    this.scaleMax.className = 'grs-scale-max';

    this.scale.append(this.scaleMin, this.scaleMax);
  }

  getElements(
    element: 'scale' | 'scaleMin' | 'scaleMax'
  ): HTMLDivElement | HTMLSpanElement {
    return this[element];
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
