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
    this.view.getButtonMin().style.left = this.model.calcValuePercentage("minValue") + "%";
    this.view.getPointerMin().innerHTML = this.model.getOption("minValue");
    this.view.getFilled().style.width = this.view.getButtonMin().style.left;

    if (this.model.getOption("isInterval")) {
      this.view.getButtonMax().style.left = this.model.calcValuePercentage("maxValue") + "%";
      this.view.getPointerMax().innerHTML = this.model.getOption("maxValue");
    }

    this.view.getScaleMin().innerHTML = this.model.getOption("minLimit");
    this.view.getScaleMax().innerHTML = this.model.getOption("maxLimit");

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

    this.view.getButtonMin().addEventListener("mousedown", onMouseDownBindThis);

    function onMouseDown() {
      document.addEventListener("mousemove", onMouseMoveBindThis);
      document.addEventListener("mouseup", onMouseUpBindThis);
    }

    function onMouseMove(event) {
      // Сброс действия по умолчанию (выделение текста)
      event.preventDefault();

      // Смещение бегунка buttonMin
      let newPosition = event.clientX -
                        this.view.calcCoords(this.view.getVolume()).left;
      // Границы смещения
      let leftEdge = 0;
      let rightEdge = (this.model.getOption("isInterval")) ?
                      (this.view.calcCoords(this.view.getButtonMax()).left -
                      this.view.calcCoords(this.view.getVolume()).left) :
                      (this.view.calcCoords(this.view.getVolume()).rigth);
      // Проверка выхода за границы
      if (newPosition < leftEdge) {
        newPosition = leftEdge;
      } else if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }
      // Смещение кнопки в процентах
      // ((смещение / ширина слайдера) * 100%)
      shiftX = (newPosition / this.view.calcCoords(this.view.getVolume()).width) * 100;
      // Отрисовка и вывод результата
      this.view.getButtonMin().style.left = this.model.calcValuePercentage(shiftX) + "%";
      this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      this.view.getPointerMin().innerHTML = this.model.calcValue(shiftX);
    }

    function onMouseUp() {
      // Обновление модели
      this.model.updateOption('minValue', this.model.calcValue(shiftX));

      document.removeEventListener('mousemove', onMouseMoveBindThis);
      document.removeEventListener('mouseup', onMouseUpBindThis);
    }
  }

  onClickVolume() {
    this.view.getVolume().addEventListener("click", () => {

      // Вычисляем смещение в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      let shiftX = ((event.clientX -
                   this.view.calcCoords(this.view.getVolume()).left) /
                   this.view.calcCoords(this.view.getVolume()).width) * 100;
      if ((this.model.getOption("isInterval")) &&
         (shiftX > this.model.calcValuePercentage("maxValue"))) {
        this.view.getButtonMax().style.left = this.model.calcValuePercentage(shiftX) + "%";
        this.view.getPointerMax().innerHTML = this.model.calcValue(shiftX);
        // Обновление модели
        this.model.updateOption('maxValue', this.model.calcValue(shiftX));
        // Отрисовка шкалы прогресса
        this.view.getFilled().style.left = this.view.getButtonMin().style.left;
        this.view.getFilled().style.width = this.view.getButtonMax().style.left - this.view.getButtonMin().style.left;
      } else {
        this.view.getButtonMin().style.left = this.model.calcValuePercentage(shiftX) + "%";
        this.view.getPointerMin().innerHTML = this.model.calcValue(shiftX);
        // Обновление модели
        this.model.updateOption('minValue', this.model.calcValue(shiftX));
        // Отрисовка шкалы прогресса
        this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      }

    });
  }

  onClickScale() {
    this.view.getScaleMin().addEventListener("click", () => {
      this.view.getButtonMin().style.left = "0%";
      this.view.getPointerMin().innerHTML = this.model.calcValue(0);
      this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      // Обновление модели
      this.model.updateOption('minValue', this.model.calcValue(0));
    })
    this.view.getScaleMax().addEventListener("click", () => {
      if (this.model.getOption("isInterval")) {
        this.view.getButtonMax().style.left = "100%";
        this.view.getPointerMax().innerHTML = this.model.calcValue(100);
        // this.view.getFilled().style.width = this.view.getButtonMin().style.left;
        // Обновление модели
        this.model.updateOption('maxValue', this.model.calcValue(100));
      } else {
        this.view.getButtonMin().style.left = "100%";
        this.view.getPointerMin().innerHTML = this.model.calcValue(100);
        this.view.getFilled().style.width = this.view.getButtonMin().style.left;
        // Обновление модели
        this.model.updateOption('minValue', this.model.calcValue(100));
      }
    })
  }

}

export {GrsController};
