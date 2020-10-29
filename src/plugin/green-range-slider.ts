// Стили плагина
import './green-range-slider.sass';
import { IGrsModel, GrsModel } from './GrsModel/GrsModel.ts';
import { IGrsView, GrsView } from './GrsView/GrsView.ts';
import {
  IGrsController,
  GrsController,
} from './GrsController/GrsController.ts';
import { IOptions, defaultOptions } from './GrsOptions/GrsOptions.ts';

interface IGreenRangeSlider {
  container: HTMLElement;
  model: IGrsModel;
  view: IGrsView;
  controller: IGrsController;
}

const pluginName = 'greenRangeSlider';

class GreenRangeSlider implements IGreenRangeSlider {
  container: HTMLElement;

  model: IGrsModel;

  view: IGrsView;

  controller: IGrsController;

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
        $.data(this, pluginName, new GreenRangeSlider(this, defaultOptions, options));
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
  [pluginName](
    this: typeof $.fn,
    method: keyof IMethods | IOptions
  ) {
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
