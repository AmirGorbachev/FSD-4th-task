// Стили плагина
import './green-range-slider.sass';
import { GrsController } from './GrsController/GrsController';

// Добавление в область видимости jQuery
(function ($, window, document, undefined) {
  interface IOptions {
    minLimit: number;
    maxLimit: number;
    minValue: number;
    maxValue: number;
    step: number;
    isVertical: boolean;
    isInterval: boolean;
    withPointers: boolean;
    withScale: boolean;
  };

  const pluginName: string = 'greenRangeSlider';

  let defaults: IOptions = {
    minLimit: 0,
    maxLimit: 100,
    minValue: 25,
    maxValue: 75,
    step: 1,
    isVertical: false,
    isInterval: false,
    withPointers: true,
    withScale: true,
  };

  let GreenRangeSlider = function(element: HTMLElement, options: IOptions): void {
    this.element = element;
    this.options = $.extend({}, defaults, options);

    this._defaults = defaults;
    this._name = pluginName;

    this.controller = new GrsController(this.options);

    this.controller.init(this.element);
  }

  let methods = {
    init: function (options) {
      return this.each(function () {
        if (!$.data(this, pluginName)) {
          $.data(this, pluginName, new GreenRangeSlider(this, options));
        } else {
          $.error(`jQuery.${pluginName} уже создан для этого элемента`);
        }
      });
    },

    update: function (options) {
      return this.each(function () {
        $.data(this, pluginName).controller.updateModel(options);
      });
    },
  };

  $.fn[pluginName] = function (method) {
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error(
        `Метод с именем ${method} не существует для jQuery.${pluginName}`
      );
    }
  };
})(jQuery, window, document);
