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
    this.moveRange(container);
  }

  moveRange(container) {
    let onMouseDownBindThis = onMouseDown.bind(this);
    let onMouseMoveBindThis = onMouseMove.bind(this);
    let onMouseUpBindThis = onMouseUp.bind(this);

    this.view.getFilled().style.width = this.view.getButtonMin().style.left;

    this.view.getButtonMin().addEventListener("mousedown", onMouseDownBindThis);

    function onMouseDown() {
      this._shiftX = event.clientX -
                     this.model.calcCoords(this.view.getButtonMin()).left;

      document.addEventListener("mousemove", onMouseMoveBindThis);
      document.addEventListener("mouseup", onMouseUpBindThis);
    }

    function onMouseMove(event) {
      // Отмена выделения
      event.preventDefault();

      // Движение бегунка buttonMin
      let newPosition = event.clientX - this._shiftX -
                        this.model.calcCoords(this.view.getElement()).left;
      if (newPosition < 0) {
        newPosition = 0;
      }
      let rightEdge = this.model.calcCoords(this.view.getElement()).width;
      let leftEdge = this.model.calcCoords(this.view.getElement()).left;
      if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }
      this.view.getButtonMin().style.left = Math.floor((newPosition /
        this.model.calcCoords(this.view.getElement()).width) * 100) + "%";

      // Отрисовка прогресс-бара
      this.view.getFilled().style.width = Math.floor((newPosition /
        this.model.calcCoords(this.view.getElement()).width) * 100) + "%";
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMoveBindThis);
      document.removeEventListener('mouseup', onMouseUpBindThis);
    }
  }

}

export {GrsController};
