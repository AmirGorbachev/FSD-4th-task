import { IOptions } from '../GrsOptions/GrsOptions.ts';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver.ts';

interface IGrsModel {
  observer: IGrsObserver;
  getOption(option: keyof IOptions): number | boolean;
  getOptions(): IOptions;
  updateOptions(options: IOptions): void;
  calcValue(persentOffset: number): number;
}

class GrsModel implements IGrsModel {
  private options: IOptions;
  observer: IGrsObserver;

  constructor(options: IOptions) {
    this.options = options;
    this.observer = new GrsObserver();
  }

  getOption(option: keyof IOptions) {
    return this.options[option];
  }

  getOptions() {
    return this.options;
  }

  updateOptions(options: IOptions) {
    let key: keyof IOptions;
    for (key in options) {
      this.options[key] = options[key];
    }

    this.observer.notifySubscribers();
    // console.log(`${this.options[key] = this.options[key]}`);
    // console.log(this.options);
  }

  calcValue(persentOffset: number) {
    let value: number =
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

export { IGrsModel, GrsModel };
