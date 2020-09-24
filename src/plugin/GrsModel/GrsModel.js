"use strict";

class GrsModel {

  constructor(options) {
    this.options = options;
  }

  calcCoords(element) {
    let coordinates = element.getBoundingClientRect();

    this.coords = {
      left: coordinates.left + window.pageXOffset,
      rigth: coordinates.left + window.pageXOffset +
             coordinates.width,
      width: coordinates.width
    };

    return this.coords;
  }

  updateOptions(option, value) {
    this.options[option] = value;
  }

}

export {GrsModel};