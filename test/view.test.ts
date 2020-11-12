import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import { GrsView } from '../src/plugin/GrsView/GrsView';

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

describe('GrsView.initElements:', () => {
  test('should add elements of slider in DOM', () => {
    document.body.innerHTML = '<div>' + '  <div id="slider" />' + '</div>';
    const $slider: HTMLElement = ($('#slider') as unknown) as HTMLElement;

    view.initElements($slider, options);

    expect($('#slider').has('.green-range-slider')[0]).toBeDefined();
  });
});

describe('GrsView.createEventLicteners:', () => {
  test('should add events and listeners of subViews', () => {

  });
});

describe('GrsView.updateView:', () => {
  test('should change classes by options and call a render method', () => {

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

  });
});

describe('GrsView.removeParameter:', () => {
  test('should remove class by the entered parameter', () => {

  });
});
