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

  moveRange(container, rangeSlider, filled, buttonMin, buttonMax) {
    let coords = this.calcCoords(rangeSlider);

    let f;
    let value;
    let parent = {
      element: container,
      coords: this.calcCoords(container)
    }
    let indicator = document.createElement("div");
    indicator.className = "indicator";
    rangeSlider.appendChild(indicator)

    document.addEventListener("mousemove", () => {
      let test = event.clientX;
      if (buttonMin.style.left > 0) {
        buttonMin.style.left =  test + "%"
      }
    })
/*
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
      e.preventDefault();//предотвратить запуск выделения элементов

      let pos = e.clientX;

      let maxLeft = pos - parent.coords.left;
    }

    function onMouseUp(e) {

    }
*/
  }

}

export {GrsModel};

// function moveRange() {

// }

// function onMouseMove() {

// }

// function onMouseUp() {

// }