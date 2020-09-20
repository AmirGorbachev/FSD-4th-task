class RangeSlider {
  constructor() {}
  getCoords(element) {
    let coords = element.getBoundingClientRect();
    let RangeSlider = {};

    this.top = coords.top + window.pageYOffset;
    this.left = coords.left + window.pageXOffset;
    this.rigth = coords.left + window.pageXOffset +
                 coords.width;
    this.bottom = coords.top + window.pageYOffset +
                  coords.height
    this.width = coords.width;

    console.log(this)
    console.log(element)
  }
}

let rangeSliderObj = new RangeSlider();

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

    rangeSliderObj.getCoords(rangeSlider);
  }
}

/**/

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