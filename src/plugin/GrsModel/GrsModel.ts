"use strict";

// interface  IGrsModel  {
//   options: Object;
// }

type options = {
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  step: number;
  isVertical: boolean;
  isInterval: boolean;
  withPointers: boolean;
  withScale: boolean;
};

class GrsModel {
  private options: options;

  constructor(options: options) {
    this.options = options;
  }

  public getOption(option): void {
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
      keyof options,
      "isVertical" | "isInterval" | "withPointers" | "withScale"
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

export { GrsModel };
