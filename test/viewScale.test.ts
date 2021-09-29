import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import GrsViewScale from '../src/plugin/GrsView/GrsViewScale';

const $ = require('jquery');
document.body.innerHTML = '<div>' + '  <div id="slider" />' + '</div>';
const $slider: HTMLElement = ($('#slider') as unknown) as HTMLElement;

const options: IOptions = {
  minLimit: 0,
  maxLimit: 100,
  minValue: 25,
  maxValue: 55,
  step: 5,
  isVertical: false,
  isInterval: false,
  withPointers: true,
  withScale: true,
};

let viewScale: GrsViewScale = new GrsViewScale(options);

$slider.append(viewScale.scale);

describe('GrsViewScale.getElements:', () => {
  test('should return the requested element', () => {
    expect(viewScale.getElements('scale')).toBeInstanceOf(HTMLDivElement);
    expect(viewScale.getElements('scale').classList.toString()).toContain(
      'grs-scale'
    );
    expect(viewScale.getElements('scaleMin')).toBeInstanceOf(HTMLSpanElement);
    expect(viewScale.getElements('scaleMin').classList.toString()).toContain(
      'grs-scale-min'
    );
    expect(viewScale.getElements('scaleMax')).toBeInstanceOf(HTMLSpanElement);
    expect(viewScale.getElements('scaleMax').classList.toString()).toContain(
      'grs-scale-max'
    );
  });
});

describe('GrsViewScale.render:', () => {
  test('should render elements:', () => {

  });
});

describe('GrsViewScale.onClick:', () => {
  test('should handle the event on click', () => {

  });
  test('should notify subscribers of the change', () => {

  });
});
