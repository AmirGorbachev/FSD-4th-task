"use strict";

import {GrsView} from "../GrsView/GrsView.js";
import {GrsModel} from "../GrsModel/GrsModel.js";

class GrsController {

  constructor(options) {
    this.model = new GrsModel(options);
    this.view = new GrsView();
  }

  init(container) {
    this.view.createSliderElements(container,
                                   this.model.getOption("minLimit"),
                                   this.model.getOption("maxLimit"));
    this.render();
    this.onMoveButton();
    this.onClickVolume();
    this.onClickScale();
  }

  render() {
    this.view.getElement("buttonMin").style.left =
      this.model.calcValuePercentage("minValue") + "%";
    this.view.getElement("pointerMin").innerHTML =
      this.model.getOption("minValue");
    this.view.getElement("filled").style.width =
      this.view.getElement("buttonMin").style.left;

    if (this.model.getOption("isInterval")) {
      this.view.getElement("buttonMax").style.left
        = this.model.calcValuePercentage("maxValue") + "%";
      this.view.getElement("pointerMax").innerHTML
        = this.model.getOption("maxValue");
    }

    this.view.getElement("scaleMin").innerHTML =
      this.model.getOption("minLimit");
    this.view.getElement("scaleMax").innerHTML =
      this.model.getOption("maxLimit");

    this.model.getOption("isVertical") ?
      this.view.addVertical() : this.view.removeVertical();

    this.model.getOption("isInterval") ?
      this.view.addInterval() : this.view.removeInterval();

    this.model.getOption("withPointers") ?
      this.view.addPointers() : this.view.removePointers();

    this.model.getOption("withScale") ?
      this.view.addScale() : this.view.removeScale();
  }

  updateModel(options) {
    for (let key in options) {
      this.model.updateOption(key, options[key]);
    }
    this.render();
  }

  onMoveButton() {
    let onMouseDownBindThis = onMouseDown.bind(this);
    let onMouseMoveBindThis = onMouseMove.bind(this);
    let onMouseUpBindThis = onMouseUp.bind(this);
    // Смещение ползунка от 0 до 100%
    let shiftX;

    this.view.getElement("buttonMin")
             .addEventListener("mousedown", onMouseDownBindThis);

    function onMouseDown() {
      document.addEventListener("mousemove", onMouseMoveBindThis);
      document.addEventListener("mouseup", onMouseUpBindThis);
    }

    function onMouseMove(event) {
      // Сброс действия по умолчанию (выделение текста)
      event.preventDefault();

      // Смещение бегунка buttonMin
      let newPosition = event.clientX -
        this.view.calcCoords("volume").left;
      // Границы смещения
      let leftEdge = 0;
      let rightEdge = (this.model.getOption("isInterval")) ?
        (this.view.calcCoords("buttonMax").left -
        this.view.calcCoords("volume").left) :
        (this.view.calcCoords("volume").rigth);
      // Проверка выхода за границы
      if (newPosition < leftEdge) {
        newPosition = leftEdge;
      } else if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }
      // Смещение кнопки в процентах
      // ((смещение / ширина слайдера) * 100%)
      shiftX = (newPosition /
        this.view.calcCoords("volume").width) * 100;
      // Отрисовка и вывод результата
      this.view.getElement("buttonMin").style.left =
        this.model.calcValuePercentage(shiftX) + "%";
      this.view.getElement("filled").style.width =
        this.view.getElement("buttonMin").style.left;
      this.view.getElement("pointerMin").innerHTML =
        this.model.calcValue(shiftX);
    }

    function onMouseUp() {
      // Обновление модели
      this.model.updateOption("minValue", this.model.calcValue(shiftX));

      document.removeEventListener("mousemove", onMouseMoveBindThis);
      document.removeEventListener("mouseup", onMouseUpBindThis);
    }
  }

  onClickVolume() {
    this.view.getElement("volume").addEventListener("click", () => {

      // Вычисляем смещение в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      let shiftX = ((event.clientX -
        this.view.calcCoords("volume").left) /
        this.view.calcCoords("volume").width) * 100;
      if ((this.model.getOption("isInterval")) &&
          (shiftX > this.model.calcValuePercentage("maxValue"))) {
        this.view.getElement("buttonMax").style.left =
          this.model.calcValuePercentage(shiftX) + "%";
        this.view.getElement("pointerMax").innerHTML =
          this.model.calcValue(shiftX);
        // Обновление модели
        this.model.updateOption("maxValue", this.model.calcValue(shiftX));
        // Отрисовка шкалы прогресса
        this.view.getElement("filled").style.left =
          this.view.getElement("buttonMin").style.left;
        this.view.getElement("filled").style.width =
          this.view.getElement("buttonMax").style.left -
          this.view.getElement("buttonMin").style.left;
      } else {
        this.view.getElement("buttonMin").style.left =
          this.model.calcValuePercentage(shiftX) + "%";
        this.view.getElement("pointerMin").innerHTML =
          this.model.calcValue(shiftX);
        // Обновление модели
        this.model.updateOption("minValue", this.model.calcValue(shiftX));
        // Отрисовка шкалы прогресса
        this.view.getElement("filled").style.width =
          this.view.getElement("buttonMin").style.left;
      }

    });
  }

  onClickScale() {
    this.view.getElement("scaleMin").addEventListener("click", () => {
      this.view.getElement("buttonMin").style.left = "0%";
      this.view.getElement("pointerMin").innerHTML = this.model.calcValue(0);
      this.view.getElement("filled").style.width =
        this.view.getElement("buttonMin").style.left;
      // Обновление модели
      this.model.updateOption("minValue", this.model.calcValue(0));
    })
    this.view.getElement("scaleMax").addEventListener("click", () => {
      if (this.model.getOption("isInterval")) {
        this.view.getElement("buttonMax").style.left = "100%";
        this.view.getElement("pointerMax").innerHTML =
          this.model.calcValue(100);
        // this.view.getElement("filled").style.width =
          // this.view.getElement("buttonMin").style.left;
        // Обновление модели
        this.model.updateOption("maxValue", this.model.calcValue(100));
      } else {
        this.view.getElement("buttonMin").style.left = "100%";
        this.view.getElement("pointerMin").innerHTML =
          this.model.calcValue(100);
        this.view.getElement("filled").style.width =
          this.view.getElement("buttonMin").style.left;
        // Обновление модели
        this.model.updateOption("minValue", this.model.calcValue(100));
      }
    })
  }

}

export {GrsController};
