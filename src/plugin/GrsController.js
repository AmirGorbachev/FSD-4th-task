"use strict";

import {GrsView} from "./GrsView.js";
import {GrsModel} from "./GrsModel.js";

class GrsController {

  constructor() {
    this.model = new GrsModel();
    this.view = new GrsView();
  }

  init(elementContainer, options) {
    this.view.createSliderElements(elementContainer, options.min, options.max);
    this.model.moveRange(elementContainer,
                         this.view.getElement(),
                         this.view.getFilled(),
                         this.view.getButtonMin(),
                         this.view.getButtonMax());
  }

}

export {GrsController};