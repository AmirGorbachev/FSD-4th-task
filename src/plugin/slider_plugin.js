// Стили плагина
import "./slider_plugin.sass";

document.addEventListener('DOMContentLoaded', () => {
  createSliderElements();
});

let slider = new Slider();

class Slider {
  constructor() {}
}

function createSliderElements() {
  let containers = document.getElementsByClassName("slider-here");

  for (let container of containers) {
    let sliderElements = "";
    sliderElements = "<div class=\"element\">Element</div>";

    container.innerHTML = sliderElements;
  }
}
