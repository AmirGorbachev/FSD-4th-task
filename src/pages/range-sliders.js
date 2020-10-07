// Стили
import "./range-sliders.sass";
// Подключение плагина
import "../plugin/green-range-slider.js";

$("#grs-one").greenRangeSlider({
  minLimit: 50,
  maxLimit: 100,
  minValue: 17,
  maxValue: 63,
  step: 5,
  isVertical: false,
  isInterval: false,
  withPointers: true,
  withScale: true
});
$("#grs-one").greenRangeSlider("update", {
  maxLimit: 25,
});
$("#grs-two").greenRangeSlider();
