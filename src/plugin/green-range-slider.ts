// Стили плагина
import './green-range-slider.sass';
import { IGrsController, GrsController } from './GrsController/GrsController.ts';
import { IOptions, defaultOptions } from './GrsOptions/GrsOptions.ts';

interface IGreenRangeSlider {
    element: HTMLElement,
    options: IOptions,
    _defaults: IOptions,
    _name: string,
    controller: IGrsController
}

const pluginName: string = 'greenRangeSlider';

let defaults: IOptions = defaultOptions;

class GreenRangeSlider implements IGreenRangeSlider {
  element: HTMLElement;
  options: IOptions;
  _defaults: IOptions;
  _name: string;
  controller: IGrsController;

  constructor(element: HTMLElement, options: IOptions) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.controller = new GrsController(this.options);
    this.controller.init(this.element);
  }
};

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
