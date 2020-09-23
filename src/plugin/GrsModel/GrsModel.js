"use strict";

class GrsModel {

  constructor() {}

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

}

export {GrsModel};