import { IGrsView } from '../GrsView/GrsView';
import { IGrsModel } from '../GrsModel/GrsModel';
import { IOptions } from '../GrsOptions/GrsOptions';

interface IGrsController {
  model: IGrsModel;
  view: IGrsView;
  init(container: HTMLElement): void;
  updateView(): void;
  updateModel(data: { option: string; value: number | boolean }): void;
}

class GrsController implements IGrsController {
  readonly model: IGrsModel;

  readonly view: IGrsView;

  constructor(model: IGrsModel, view: IGrsView) {
    this.model = model;
    this.view = view;
  }

  init(container: HTMLElement): void {
    this.view.init(container, this.model.getOptions());

    this.model.observer.addSubscriber(this.updateView.bind(this));

    this.view.observer.addSubscriber(this.updateModel.bind(this));
  }

  updateView(): void {
    this.view.updateView(this.model.getOptions());
  }

  updateModel(data: { option: string; value: number | boolean }): void {
    if (data.option === 'minValue') {
      this.model.updateOptions({
        minValue: this.model.calcValue(data.value as number),
      } as IOptions);
    } else if (data.option === 'maxValue') {
      this.model.updateOptions({
        maxValue: this.model.calcValue(data.value as number),
      } as IOptions);
    }
  }
}

export { IGrsController, GrsController };
