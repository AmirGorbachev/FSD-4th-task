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

  init(elementContainer) {
    this.view.createSliderElements(elementContainer);
  }

}

// Шаблон jQuery плагина
;(function ($, window, document, undefined) {
  let pluginName = "greenRangeSlider",
      defaults = {
        propertyName: "value",
      };
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.grsController = new GrsController(new GrsModel(), new GrsView());

    this.init();
  };
  Plugin.prototype.init = function() {

    this.grsController.init(this.element);

  };
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      };
    });
  };
})(jQuery, window, document);