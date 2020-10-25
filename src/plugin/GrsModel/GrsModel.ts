'use strict';

import { IOptions } from '../GrsOptions/GrsOptions.ts';

interface IGrsModel {
  getOption(option: keyof IOptions): number | boolean;
  updateOption(option: string, value: number | boolean): void;
  calcValue(persentOffset: number): number;
  calcPersentOffset(
    key: Exclude<
      keyof IOptions,
      'isVertical' | 'isInterval' | 'withPointers' | 'withScale'
    >
  ): number;
}

class GrsModel implements IGrsModel {
  private options: IOptions;

  constructor(options: IOptions) {
    this.options = options;
  }

  public getOption(option: keyof IOptions): number | boolean {
    return this.options[option];
  }

  public updateOption(option: string, value: number | boolean): void {
    this.options[option] = value;
    // console.log(`${option} - ${value}`);
    // console.log(this.options);
  }

  public calcValue(persentOffset: number): number {
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

  public calcPersentOffset(
    key: Exclude<
      keyof IOptions,
      'isVertical' | 'isInterval' | 'withPointers' | 'withScale'
    >
  ): number {
    let value: number = this.options[key];

    let result: number =
      ((value - this.options.minLimit) /
        (this.options.maxLimit - this.options.minLimit)) *
      100;

    return result;
  }
}

export { IGrsModel, GrsModel };
