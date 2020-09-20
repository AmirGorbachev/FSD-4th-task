"use strict";

class GrsModel {

  constructor() {}

  getCoords(element) {
    let coords = element.getBoundingClientRect();
    let RangeSlider = {};

    this._top = coords.top + window.pageYOffset;
    this._left = coords.left + window.pageXOffset;
    this._rigth = coords.left + window.pageXOffset +
                 coords.width;
    this._bottom = coords.top + window.pageYOffset +
                  coords.height
    this._width = coords.width;

    console.log(this)
    console.log(element)
  }

}

export {GrsModel};

// function moveRange() {

// }

// function onMouseMove() {

// }

// function onMouseUp() {

// }