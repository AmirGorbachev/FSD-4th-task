import GrsView from '../GrsView/GrsView';
import GrsModel from '../GrsModel/GrsModel';
import { IOptions } from '../GrsOptions/GrsOptions';

export default class GrsController {
  readonly model: GrsModel;
  readonly view: GrsView;

  constructor(model: GrsModel, view: GrsView) {
    this.model = model;
    this.view = view;
  }

  init(container: HTMLElement): void {
    this.view.init(container, this.model.getOptions());

    this.model.addSubscriber(this.updateView.bind(this));

    this.view.addSubscriber(this.updateModel.bind(this));
  }

  updateView(): void {
    this.view.updateView(this.model.getOptions());
  }

  updateModel(data: { option: string; value: number | boolean }): void {
    this.model.updateOptions({
      [data.option]: this.model.calcValue(data.value as number),
    } as IOptions);
  }
}

export { GrsController };
