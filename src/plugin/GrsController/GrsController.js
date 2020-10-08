"use strict";

import {GrsView} from "../GrsView/GrsView.js";
import {GrsModel} from "../GrsModel/GrsModel.js";

class GrsController {

  constructor(options) {
    this.model = new GrsModel(options);
    this.view = new GrsView();
  }

  init(container, options) {
    this.view.createSliderElements(container, options.minLimit, options.maxLimit);
    this.render();
    this.onMoveButton();
    this.onClickVolume();

    // this.model.updateOptions("minLimit", 25);
  }

  render() {
    this.view.getButtonMin().style.left = this.model.calcValuePercentage() + "%";
    this.view.getPointerMin().innerHTML = this.model.options.minValue;
    this.view.getFilled().style.width = this.view.getButtonMin().style.left;

    if (this.model.options.isVertical) {
      this.view.addVertical();
    } else {
      this.view.removeVertical();
    }
    if (this.model.options.isInterval) {
      this.view.addInterval();
    } else {
      this.view.removeInterval();
    }
    if (this.model.options.withPointers) {
      this.view.addPointers();
    } else {
      this.view.removePointers();
    }
    if (this.model.options.withScale) {
      this.view.addScale();
    } else {
      this.view.removeScale();
    }
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
      let rightEdge = this.view.calcCoords(this.view.getVolume()).width;
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
      this.model.updateOptions('minValue', this.model.calcValue(shiftX));

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
      if ((shiftX > 0)&&(shiftX < 100)) {
        this.view.getButtonMin().style.left = this.model.calcValuePercentage(shiftX) + "%";
        this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      }
      this.view.getPointerMin().innerHTML = this.model.calcValue(shiftX);
      // Обновление модели
      this.model.updateOptions('minValue', this.model.calcValue(shiftX));
    });
  }

}

export {GrsController};
