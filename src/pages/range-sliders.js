// Стили
import "./range-sliders.sass";
// Подключение плагина
import "../plugin/green-range-slider.js";

$("#grs-one").greenRangeSlider({
  minLimit: 10,
  maxLimit: 80,
  minValue: 17,
  maxValue: 63,
  step: 2,
  isVertical: false,
  isInterval: false,
  withPointers: true,
  withScale: true
});
$("#grs-one").greenRangeSlider("update", {
  maxLimit: 25,
});
$("#grs-two").greenRangeSlider();
