"use strict";

class GrsModel {

  constructor(options) {
    this.options = options;
  }

  getOptions() {
    return this.options;
  }

  updateOptions(option, value) {
    this.options[option] = value;
    console.log(`${option} - ${value}`);
    console.log(this.options);
  }

  calcValue(persentOffset) {
    let value = ((this.options.maxLimit - this.options.minLimit) *
                (persentOffset / 100)) + this.options.minLimit;

    let result = Math.round(value / this.options.step) * this.options.step;

    if (result <= this.options.minLimit) {
      result = this.options.minLimit;
    } else if (result >= this.options.maxLimit) {
      result = this.options.maxLimit;
    };

    return result;
  }

  calcValuePercentage(persentOffset) {
    let value = (persentOffset !== undefined) ?
                this.calcValue(persentOffset) :
                this.options.minValue;

    let result = (value - this.options.minLimit) /
                 (this.options.maxLimit - this.options.minLimit) * 100;

    return result;
  }

}

export {GrsModel};