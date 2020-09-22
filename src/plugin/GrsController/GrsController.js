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
    let coords = this.model.calcCoords(this.view.getElement());

    let f;
    let value;
    let parent = {
      element: container,
      coords: this.model.calcCoords(container)
    }

    let maxRange = coords.right;
    let widthRange = coords.width;

    let onMouseDownBindThis = onMouseDown.bind(this);
    let onMouseMoveBindThis = onMouseMove.bind(this);
    let onMouseUpBindThis = onMouseUp.bind(this);

    this.view.getButtonMin().addEventListener("mousedown", onMouseDownBindThis);

    function onMouseDown() {
      document.addEventListener("mousemove", onMouseMoveBindThis);
      document.addEventListener("mouseup", onMouseUpBindThis);
    }

    let test = this.model.calcCoords(this.view.getButtonMin()).left;

    function onMouseMove(event) {
      event.preventDefault();
      if(this.model.calcCoords(this.view.getButtonMin()).left < this.model.calcCoords(this.view.getButtonMax()).left) {
        this.view.getButtonMin().style.left = (event.clientX - test) + "px";
      } else if(this.model.calcCoords(this.view.getButtonMin()).left = this.model.calcCoords(this.view.getButtonMax()).left) {
        // this.view.getButtonMin().style.left = this.view.getButtonMax().style.left;
      } else {
        this.view.getButtonMin().style.left = this.view.getButtonMax().style.left;
      }
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMoveBindThis);
      document.removeEventListener('mouseup', onMouseUpBindThis);
    }
  }

}

export {GrsController};