import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import { GrsModel } from '../src/plugin/GrsModel/GrsModel';
import { GrsView } from '../src/plugin/GrsView/GrsView';
import { GrsController } from '../src/plugin/GrsController/GrsController';
jest.mock('../src/plugin/GrsModel/GrsModel');
jest.mock('../src/plugin/GrsView/GrsView');

const $ = require('jquery');

const options: IOptions = {
  minLimit: 17,
  maxLimit: 63,
  minValue: 25,
  maxValue: 55,
  step: 5,
  isVertical: false,
  isInterval: false,
  withPointers: true,
  withScale: true,
};
let model: GrsModel = new GrsModel(options);
let view: GrsView = new GrsView();

let controller: GrsController = new GrsController(model, view);

document.body.innerHTML = '<div><div id="slider"></div></div>';
const $slider: HTMLElement = ($('#slider') as unknown) as HTMLElement;

describe('GrsController.init:', () => {
  beforeAll(() => {
    controller.init($slider);
  });

  test('should call init method of view', () => {
    expect(controller.view.init).toBeCalled();
  });

  test('should create listeners', () => {
    expect(controller.view.addSubscriber).toBeCalled();
    expect(controller.model.addSubscriber).toBeCalled();
  });
});

describe('GrsController.updateView:', () => {
  test('should call method "updateView" of view', () => {
    controller.updateView();

    expect(controller.view.updateView).toBeCalled();
  });
});

describe('GrsController.updateModel:', () => {
  test('should call method "updateModel" of model', () => {
    controller.updateModel({ option: 'isVertical', value: false });

    expect(controller.model.updateOptions).toBeCalled();
  });
});
