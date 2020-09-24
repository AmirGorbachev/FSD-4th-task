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
    this.onMoveButton();
    this.onClickSlider();

    this.model.updateOptions("minLimit", 25);
  }

  onMoveButton() {
    let onMouseDownBindThis = onMouseDown.bind(this);
    let onMouseMoveBindThis = onMouseMove.bind(this);
    let onMouseUpBindThis = onMouseUp.bind(this);

    this.view.getPointerMin().innerHTML = parseInt(this.view.getButtonMin().style.left);
    this.view.getFilled().style.width = this.view.getButtonMin().style.left;

    this.view.getButtonMin().addEventListener("mousedown", onMouseDownBindThis);

    function onMouseDown() {
      document.addEventListener("mousemove", onMouseMoveBindThis);
      document.addEventListener("mouseup", onMouseUpBindThis);
    }

    function onMouseMove(event) {
      // Отмена выделения
      event.preventDefault();

      // Движение бегунка buttonMin
      let newPosition = event.clientX -
                        this.model.calcCoords(this.view.getProgressBar()).left;
      let leftEdge = 0;
      let rightEdge = this.model.calcCoords(this.view.getProgressBar()).width;
      // Выход за границы
      if (newPosition < leftEdge) {
        newPosition = leftEdge;
      } else if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }
      // Смещение кнопки в процентах
      // ((смещение / ширина слайдера) * 100%)
      this.view.getButtonMin().style.left = ((newPosition /
        this.model.calcCoords(this.view.getProgressBar()).width) * 100) + "%";
      // Отрисовка прогресс-бара (ширина = смещению)
      this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      this.view.getPointerMin().innerHTML = parseInt(this.view.getButtonMin().style.left);
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMoveBindThis);
      document.removeEventListener('mouseup', onMouseUpBindThis);
    }
  }

  onClickSlider() {
    this.view.getProgressBar().addEventListener("mousedown", () => {
      // Отмена выделения
      event.preventDefault();
      // Вычисляем смещение в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      let shiftX = ((event.clientX -
                   this.model.calcCoords(this.view.getProgressBar()).left) /
                   this.model.calcCoords(this.view.getProgressBar()).width) * 100;
      if ((shiftX > 0)&&(shiftX < 100)) {
        this.view.getButtonMin().style.left = shiftX + "%";
        this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      }
      this.view.getPointerMin().innerHTML = parseInt(this.view.getButtonMin().style.left);
    });
  }

}

export {GrsController};