"use strict";

import {GrsView} from "./GrsView.js";
import {GrsModel} from "./GrsModel.js";

let grsView = new GrsView();
let grsModel = new GrsModel();

class GrsController {

  constructor(model, view) {
    this.model = model;
    this.view = view;
  }

  init() {
    this.view.createSliderElements("green-range-slider-here");
    // console.log( this.model.getCoords(this.view.getElement()) );
    // console.log( $(this.view.getElement()).data("key", this.model) );
    // console.log( $(this.view.getElement()).data("key") );
  }

}

let grsController = new GrsController(grsModel, grsView);
grsController.init();

// export {GrsController};