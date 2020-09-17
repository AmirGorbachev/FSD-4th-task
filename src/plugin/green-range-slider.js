// Стили плагина
import "./green-range-slider.sass";

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
  }
}
