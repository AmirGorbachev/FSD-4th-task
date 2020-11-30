import { IOptions } from '../GrsOptions/GrsOptions';
import GrsObserver from '../GrsObserver/GrsObserver';

export default class GrsModel extends GrsObserver{
  private options: IOptions;

  constructor(options: IOptions) {
    super();
    this.options = options;
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
    this.notifySubscribers();
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
