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

    document.addEventListener("mousemove", () => {
      if(this.model.calcCoords(this.view.getButtonMin()).left < this.model.calcCoords(this.view.getButtonMax()).left) {
        this.view.getButtonMin().style.left =  event.clientX + "%";
        console.log("hi")
      }
    })

    console.log(this.model.calcCoords(this.view.getButtonMin()).left)

    console.log(this.model.calcCoords(this.view.getButtonMax()).left)
/*
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(e) {
      e.preventDefault();//предотвратить запуск выделения элементов

      let pos = e.clientX;

      let maxLeft = pos - parent.coords.left;
    }

    function onMouseUp(e) {

    }
*/
  }

}

export {GrsController};