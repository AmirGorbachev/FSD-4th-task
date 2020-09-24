// Стили плагина
import "./green-range-slider.sass";
import {GrsController} from "./GrsController/GrsController.js";

// Шаблон jQuery плагина
;(function ($, window, document, undefined) {
  let pluginName = "greenRangeSlider",
      defaults = {
        minLimit: 0,
        maxLimit: 100,
        minValue: 25,
        maxValue: 75,
        step: 1,
        isVertical: false,
        isInterval: false,
        withPointers: true,
        withScale: true
      };
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.grsController = new GrsController(this.options);

    this.init();
  };
  Plugin.prototype.init = function() {

    this.grsController.init(this.element, this.options);

  };
  $.fn[pluginName] = function(options) {
    return this.each(function() {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new Plugin(this, options));
      };
    });
  };
})(jQuery, window, document);