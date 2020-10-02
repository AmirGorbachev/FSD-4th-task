"use strict";

class GrsModel {

  constructor(options) {
    this.options = options;
  }

  calcCoords(element) {
    let coordinates = element.getBoundingClientRect();

    let coords = {
      top: coordinates.top + window.pageYOffset,
      left: coordinates.left + window.pageXOffset,
      rigth: coordinates.left + window.pageXOffset +
             coordinates.width,
      bottom: coordinates.top + window.pageYOffset +
              coordinates.height,
      width: coordinates.width
    };

    return coords;
  }

  updateOptions(option, value) {
    this.options[option] = value;
    console.log(`${option} - ${value}`);
  }

}

export {GrsModel};