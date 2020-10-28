import { IOptions } from '../GrsOptions/GrsOptions.ts';
import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver.ts';

type OptionsExluded =
  | 'isVertical'
  | 'isInterval'
  | 'withPointers'
  | 'withScale';

interface IGrsModel {
  observer: IGrsObserver;
  getOption(option: keyof IOptions): number | boolean;
  updateOption(option: keyof IOptions, value: number | boolean): void;
  calcValue(persentOffset: number): number;
  calcPersentOffset(key: Exclude<keyof IOptions, OptionsExluded>): number;
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

  updateOption(option: keyof IOptions, value: number | boolean) {
    this.options[option] = value;
    // console.log(`${String(option)} - ${value}`);
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

  calcPersentOffset(key: Exclude<keyof IOptions, OptionsExluded>) {
    let value: number = this.options[key] as number;

    let result: number =
      ((value - this.options.minLimit) /
        (this.options.maxLimit - this.options.minLimit)) *
      100;

    return result;
  }
}

export { IGrsModel, GrsModel };
