// Стили
import "./range-sliders.sass";
// Подключение плагина
import "../plugin/green-range-slider.js";

$("#grs-one").greenRangeSlider({
  minLimit: 17,
  maxLimit: 63,
  minValue: 25,
  maxValue: 55,
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
