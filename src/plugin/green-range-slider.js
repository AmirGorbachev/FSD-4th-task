// Стили плагина
import "./green-range-slider.sass";
import {GrsController} from "./GrsController/GrsController.js";

// Шаблон jQuery плагина
;(function ($, window, document, undefined) {
  let pluginName = "greenRangeSlider",
      defaults = {
        min: 0,
        max: 5
      };
  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.grsController = new GrsController();

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