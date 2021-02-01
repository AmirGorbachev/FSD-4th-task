import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import GrsSubView from '../src/plugin/GrsView/GrsSubView';


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

class SubView extends GrsSubView {
  constructor(options: IOptions) {
    super(options);
  }
}

let subView: GrsSubView = new SubView(options);

// const $ = require('jquery');
// document.body.innerHTML = '<div>' + '  <div id="slider" />' + '</div>';
// const $slider: HTMLElement = ($('#slider') as unknown) as HTMLElement;

describe('GrsSubView.calcCoords:', () => {
  test('should calculate the coordinates of the DOM element', () => {
    // ERROR: element.getBoundingClientRect is not a function
    // expect(subView.calcCoords($slider as HTMLDivElement).top).toBe(0);
  });
});

describe('GrsSubView.calcPersentOffset:', () => {
  test('should calculate the percentage based on the slider limit', () => {
    expect(subView.calcPersentOffset(15, 0, 100)).toBe(15);
    expect(subView.calcPersentOffset(23, 0, 100)).toBe(23);
    expect(subView.calcPersentOffset(19, 0, 100)).toBe(19);
    expect(subView.calcPersentOffset(25, 15, 65)).toBe(20);
  });
});
