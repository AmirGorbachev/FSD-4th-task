import { IGrsView} from '../GrsView/GrsView.ts';
import { IGrsModel} from '../GrsModel/GrsModel.ts';
import { IOptions } from '../GrsOptions/GrsOptions.ts';

interface IGrsController {
  model: IGrsModel;
  view: IGrsView;
  init(container: HTMLElement): void;
  updateView(): void;
}

class GrsController implements IGrsController {
  readonly model: IGrsModel;
  readonly view: IGrsView;

  constructor(model: IGrsModel, view: IGrsView) {
    this.model = model;
    this.view = view;
  }

  init(container: HTMLElement) {
    this.view.init(container);
    this.updateView();

    this.model.observer.addSubscriber(this.updateView.bind(this));

    this.view.observer.addSubscriber(this.updateModel.bind(this));
  }

  updateView() {
    this.view.updateView(this.model.getOptions());
  }

  updateModel(data: { option: string; value: number | boolean }) {
    // console.log(data);
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
