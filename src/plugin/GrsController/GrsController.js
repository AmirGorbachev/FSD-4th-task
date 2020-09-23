"use strict";

import {GrsView} from "../GrsView/GrsView.js";
import {GrsModel} from "../GrsModel/GrsModel.js";

class GrsController {

  constructor() {
    this.model = new GrsModel();
    this.view = new GrsView();
  }

  init(container, options) {
    this.view.createSliderElements(container, options.min, options.max);
    this.onMoveButton();
    this.onClickSlider();
  }

  onMoveButton() {
    let onMouseDownBindThis = onMouseDown.bind(this);
    let onMouseMoveBindThis = onMouseMove.bind(this);
    let onMouseUpBindThis = onMouseUp.bind(this);

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
                        this.model.calcCoords(this.view.getElement()).left;
      if (newPosition < 0) {
        newPosition = 0;
      }
      let rightEdge = this.model.calcCoords(this.view.getElement()).width;

      if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }
      this.view.getButtonMin().style.left = ((newPosition /
        this.model.calcCoords(this.view.getElement()).width) * 100) + "%";

      // Отрисовка прогресс-бара (ширина = смещению)
      this.view.getFilled().style.width = this.view.getButtonMin().style.left;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMoveBindThis);
      document.removeEventListener('mouseup', onMouseUpBindThis);
    }
  }

  onClickSlider() {
    this.view.getElement().addEventListener("mousedown", () => {
      // Отмена выделения
      event.preventDefault();
      // Вычисляем смещение в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      let shiftX = ((event.clientX -
                   this.model.calcCoords(this.view.getElement()).left) /
                   this.model.calcCoords(this.view.getElement()).width) * 100;
      if ((shiftX > 0)&&(shiftX < 100)) {
        this.view.getButtonMin().style.left = shiftX + "%";
        this.view.getFilled().style.width = this.view.getButtonMin().style.left;
      }
    });
  }

}

export {GrsController};
