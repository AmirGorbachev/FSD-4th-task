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
    expect(GrsViewVolume).toHaveBeenCalledTimes(1);
    expect(GrsViewButtons).toHaveBeenCalledTimes(1);
    expect(GrsViewScale).toHaveBeenCalledTimes(1);
  });
});

describe('GrsView.createEventLicteners:', () => {
  test('should add events and listeners of subViews', () => {

  });
});

describe('GrsView.updateView:', () => {
  test('should change classes by options and call a render method', () => {
    view.updateView(options);
    expect(view.addParameter).toBeCalled();
  });
});

describe('GrsView.render:', () => {
  test('should call render methods of subViews', () => {

  });
});

describe('GrsView.init:', () => {
  test('should call a methods for initialization of view', () => {

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
