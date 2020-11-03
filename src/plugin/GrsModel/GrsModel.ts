import { IOptions } from '../GrsOptions/GrsOptions';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';

class GrsModel {
  private options: IOptions;

  observer: IGrsObserver;

  constructor(options: IOptions) {
    this.options = options;
    this.observer = new GrsObserver();
  }

  getOption(option: keyof IOptions): number | boolean {
    return this.options[option];
  }

  getOptions(): IOptions {
    return this.options;
  }

  updateOptions(options: IOptions): void {
    let key: keyof IOptions;
    for (key in options) {
      this.options[key] = options[key];
    }
    // Уведомление об изменении
    this.observer.notifySubscribers();
  }

  calcValue(persentOffset: number): number {
    const value: number =
      (this.options.maxLimit - this.options.minLimit) * (persentOffset / 100) +
      this.options.minLimit;

    let result: number =
      Math.round(value / this.options.step) * this.options.step;

    if (result <= this.options.minLimit) {
      result = this.options.minLimit;
    } else if (result >= this.options.maxLimit) {
      result = this.options.maxLimit;
    }

    return result;
  }
}

export { GrsModel };
