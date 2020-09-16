// Стили плагина
import "./slider_plugin.sass";

document.addEventListener('DOMContentLoaded', () => {
  createSliderElements("slider-here");
});

let slider = new Slider();

class Slider {
  constructor() {}
}

function createSliderElements(nameContainer) {
  let containers = document.getElementsByClassName(nameContainer);

  for (let container of containers) {
    let sliderElements = "";
    sliderElements = "<div class=\"element\">Element</div>";

    container.innerHTML = sliderElements;
  }
}
