// Стили плагина
import './green-range-slider.sass';
import {
  IGrsController,
  GrsController,
} from './GrsController/GrsController.ts';
import { IOptions, defaultOptions } from './GrsOptions/GrsOptions.ts';

interface IGreenRangeSlider {
  element: HTMLElement;
  options: IOptions;
  _defaults: IOptions;
  _name: string;
  controller: IGrsController;
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
}

interface IMethods {
  init(this: typeof $.fn, options: IOptions): typeof $.fn;
  update(this: typeof $.fn, options: IOptions): typeof $.fn;
}

let methods: IMethods = {
  init: function (this: typeof $.fn, options: IOptions) {
    return this.each(function (this: HTMLElement) {
      if (!$.data(this, pluginName)) {
        $.data(this, pluginName, new GreenRangeSlider(this, options));
      } else {
        $.error(`jQuery.${pluginName} уже создан для этого элемента`);
      }
    });
  },

  update: function (this: typeof $.fn, options: IOptions) {
    return this.each(function (this: HTMLElement) {
      $.data(this, pluginName).controller.updateModel(options);
    });
  },
};

$.fn.extend({
  [pluginName]: function(this: typeof $.fn, method: keyof IMethods | IOptions) {
    if (methods[method as keyof IMethods]) {
      return methods[method as keyof IMethods].apply(
        this,
        Array.prototype.slice.call(arguments, 1) as [any]
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.call(this, method);
    } else {
      $.error(`Метод с именем ${method} не существует для jQuery.${pluginName}`);
    }
  }
});
