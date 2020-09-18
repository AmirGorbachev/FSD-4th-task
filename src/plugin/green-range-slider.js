// Стили плагина
import "./green-range-slider.sass";

let rangeSlider = new RangeSlider();

document.addEventListener('DOMContentLoaded', () => {
  createSliderElements("green-range-slider-here");
});

function createSliderElements(nameContainer) {
  let containers = document.getElementsByClassName(nameContainer);

  for (let container of containers) {
    let rangeSlider = document.createElement("div");
    rangeSlider.className = "green-range-slider grs";

    let rangeSliderButtonMin = document.createElement("div");
    rangeSliderButtonMin.className = "grs-button-min";
    let rangeSliderButtonMax = document.createElement("div");
    rangeSliderButtonMax.className = "grs-button-max";
    let rangeSliderFilled = document.createElement("div");
    rangeSliderFilled.className = "grs-filled";

    rangeSlider.append(rangeSliderButtonMin,
                       rangeSliderFilled,
                       rangeSliderButtonMax);

    container.append(rangeSlider);

    /**/

    getCoords(rangeSlider);
  }
}

/**/

class RangeSlider {
  constructor() {

  }

  getCoords() {
    let coords = elem.getBoundingClientRect();
    let RangeSlider = {};

    RangeSlider.top = coords.top +
               window.pageYOffset;
    RangeSlider.left = coords.left +
                window.pageXOffset;
    RangeSlider.rigth = coords.left +
                 window.pageXOffset +
                 coords.width;
    RangeSlider.bottom = coords.top +
                  window.pageYOffset +
                  coords.height
    RangeSlider.width = coords.width;

    console.log(RangeSlider)
    console.log("next")
  }
}

let rangeSlider = new RangeSlider();

function getCoords(elem) {
  let coords = elem.getBoundingClientRect();
  let RangeSlider = {};

  RangeSlider.top = coords.top +
             window.pageYOffset;
  RangeSlider.left = coords.left +
              window.pageXOffset;
  RangeSlider.rigth = coords.left +
               window.pageXOffset +
               coords.width;
  RangeSlider.bottom = coords.top +
                window.pageYOffset +
                coords.height
  RangeSlider.width = coords.width;

  console.log(RangeSlider)
  console.log("next")
}

function moveRange() {

}

function onMouseMove() {

}

function onMouseUp() {

}