import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import { GrsView } from '../src/plugin/GrsView/GrsView';
import GrsViewVolume from '../src/plugin/GrsView/GrsViewVolume';
import GrsViewButtons from '../src/plugin/GrsView/GrsViewButtons';
import GrsViewScale from '../src/plugin/GrsView/GrsViewScale';
jest.mock('../src/plugin/GrsView/GrsViewVolume');
jest.mock('../src/plugin/GrsView/GrsViewButtons');
jest.mock('../src/plugin/GrsView/GrsViewScale');

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
let view: GrsView = new GrsView();

document.body.innerHTML = '<div>' + '  <div id="slider" />' + '</div>';
const $slider: HTMLElement = ($('#slider') as unknown) as HTMLElement;

describe('GrsView.initElements:', () => {
  test('should add elements of slider in DOM', () => {
    view.initElements($slider, options);

    expect($('#slider').has('.green-range-slider')[0]).toBeDefined();
  });
  test('should call a class of subViews', () => {
    expect(GrsViewVolume).toHaveBeenCalled();
    expect(GrsViewButtons).toHaveBeenCalled();
    expect(GrsViewScale).toHaveBeenCalled();
  });
});
///// To-do: write a test
describe('GrsView.createEventLicteners:', () => {
  test('should add events and listeners of subViews', () => {
    // view.createEventLicteners(options);

    // expect(view.).toBeCalled();
  });
});

describe('GrsView.updateView:', () => {
  test('should change classes by options and call a render method', () => {
    const spyOnAddParameter = jest.spyOn(view, 'addParameter');
    const spyOnRemoveParameter = jest.spyOn(view, 'removeParameter');

    view.updateView(options);

    expect(spyOnAddParameter).toHaveBeenCalled();
    expect(spyOnRemoveParameter).toHaveBeenCalled();
  });
});
///// To-do: fix 'render' doesn't exist because GrsViewScale is mock
describe('GrsView.render:', () => {
  test('should call render methods of subViews', () => {
    // view.render(options);

    // expect(view.subView.buttons.render).toHaveBeenCalled();
  });
});

describe('GrsView.init:', () => {
  test('should call a methods for initialization of view', () => {
    view.init($slider, options);

    const spyOnInitElements = jest.spyOn(view, 'initElements');
    const spyOnUpdateView = jest.spyOn(view, 'updateView');
    const spyOnCreateEventLicteners = jest.spyOn(view, 'createEventLicteners');

    expect(spyOnInitElements).toHaveBeenCalled();
    expect(spyOnUpdateView).toHaveBeenCalled();
    expect(spyOnCreateEventLicteners).toHaveBeenCalled();
  });
});

describe('GrsView.addParameter:', () => {
  test('should add class by the entered parameter', () => {
    view.addParameter('isInterval');

    expect($(view.element).hasClass('grs-isInterval')).toBeTruthy();
  });
});

describe('GrsView.removeParameter:', () => {
  test('should remove class by the entered parameter', () => {
    view.removeParameter('isInterval');

    expect($(view.element).hasClass('grs-isInterval')).toBeFalsy();
  });
});
