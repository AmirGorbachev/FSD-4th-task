"use strict";

class GrsModel {

  constructor(options) {
    this.options = options;
  }

  updateOptions(option, value) {
    this.options[option] = value;
    console.log(`${option} - ${value}`);
  }

}

export {GrsModel};