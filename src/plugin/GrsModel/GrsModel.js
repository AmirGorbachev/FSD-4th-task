"use strict";

class GrsModel {

  constructor() {}

  calcCoords(element) {
    let coordinates = element.getBoundingClientRect();

    this.coords = {
      top: coordinates.top + window.pageYOffset,
      left: coordinates.left + window.pageXOffset,
      rigth: coordinates.left + window.pageXOffset +
                   coordinates.width,
      bottom: coordinates.top + window.pageYOffset +
                    coordinates.height,
      width: coordinates.width
    };

    return this.coords;
  }

}

export {GrsModel};