// Стили плагина
import './green-range-slider.sass';
import GrsModel from './GrsModel/GrsModel';
import GrsView from './GrsView/GrsView';
import GrsController from './GrsController/GrsController';
import { IOptions, defaultOptions } from './GrsOptions/GrsOptions';

interface IGreenRangeSlider {
  container: HTMLElement;
  model: GrsModel;
  view: GrsView;
  controller: GrsController;
}

const pluginName = 'greenRangeSlider';

class GreenRangeSlider implements IGreenRangeSlider {
  container: HTMLElement;

  model: GrsModel;

  view: GrsView;

  controller: GrsController;

  constructor(element: HTMLElement, defaults: IOptions, options: IOptions) {
    this.container = element;
    this.model = new GrsModel($.extend({}, defaults, options));
    this.view = new GrsView();
    this.controller = new GrsController(this.model, this.view);

    this.controller.init(this.container);
  }
}

interface IMethods {
  init(this: typeof $.fn, options: IOptions): typeof $.fn;
  update(this: typeof $.fn, options: IOptions): typeof $.fn;
}

const methods: IMethods = {
  init(this: typeof $.fn, options: IOptions) {
    return this.each(function (this: HTMLElement) {
      if (!$.data(this, pluginName)) {
        $.data(
          this,
          pluginName,
          new GreenRangeSlider(this, defaultOptions, options)
        );
      } else {
        $.error(`jQuery.${pluginName} уже создан для этого элемента`);
      }
    });
  },

  update(this: typeof $.fn, options: IOptions) {
    return this.each(function (this: HTMLElement) {
      $.data(this, pluginName).model.updateOptions(options);
    });
  },
};

$.fn.extend({
  [pluginName](this: typeof $.fn, method: keyof IMethods | IOptions) {
    if (methods[method as keyof IMethods]) {
      return methods[method as keyof IMethods].apply(
        this,
        Array.prototype.slice.call(arguments, 1) as [IOptions]
      );
    } else if (typeof method === 'object' || !method) {
      return methods.init.call(this, method);
    } else {
      $.error(
        `Метод с именем ${method} не существует для jQuery.${pluginName}`
      );
    }
  },
});
