// Стили плагина
import "./green-range-slider.sass";
import {GrsController} from "./GrsController/GrsController.js";

// Добавление в область видимости jQuery
(function ($, window, document, undefined) {

  let pluginName = "greenRangeSlider";

  let defaults = {
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

  function GreenRangeSlider(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.controller = new GrsController(this.options);

    this.init();
  };

  GreenRangeSlider.prototype.init = function() {
    this.controller.init(this.element, this.options);
  };

  let methods = {
    init: function(options) {
      return this.each(function() {

        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, new GreenRangeSlider(this, options));
        } else {
          $.error(`jQuery.${pluginName} уже создан для этого элемента`);
        };

      });
    },

    update: function(options) {
      return this.each(function() {

        let keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++) {
          // console.log(`${keys[i]} - ${options[keys[i]]}`);
        }

      });
    }
  };

  $.fn[pluginName] = function(method) {
      if ( methods[method] ) {
        return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
      } else if ( typeof method === 'object' || ! method ) {
        return methods.init.apply( this, arguments );
      } else {
        $.error( `Метод с именем ${method} не существует для jQuery.${pluginName}` );
      }
  };

})(jQuery, window, document);