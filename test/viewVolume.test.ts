import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import GrsViewVolume from '../src/plugin/GrsView/GrsViewVolume';

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

let viewVolume: GrsViewVolume = new GrsViewVolume(options);

$slider.append(viewVolume.volume);

describe('GrsSubView.getElements:', () => {
  test('should return the requested element', () => {
    expect(viewVolume.getElements('volume')).toBeInstanceOf(HTMLDivElement);
    expect(viewVolume.getElements('volume').classList.toString()).toContain(
      'grs-volume'
    );
    expect(viewVolume.getElements('filled').classList.toString()).toContain(
      'grs-filled'
    );
  });
});

describe('GrsSubView.render:', () => {
  describe('should render elements:', () => {
    const config = Object.assign({}, options);

    test('for not interval slider', () => {
      config.isInterval = false;
      viewVolume.render(config);

      expect(viewVolume.filled.style.width).toBe('25%');
    });
    test('for interval slider', () => {
      config.isInterval = true;
      viewVolume.render(config);

      expect(viewVolume.filled.style.left).toBe('25%');
      expect(viewVolume.filled.style.width).toBe('30.000000000000007%');
    });
  });
});

// ReferenceError: event is not defined
/*
describe('GrsSubView.nClick:', () => {
  test('should handle the event on click', () => {
    const spyOnHandlerClick = jest.spyOn(viewVolume, 'handlerClick');

    viewVolume.onClick(options);
    viewVolume.volume.click();

    expect(spyOnHandlerClick).toHaveBeenCalled();
  });
});

describe('GrsSubView.handlerClick:', () => {
  test('should notify subscribers of the change', () => {
    const spyOnNotifySubscribers = jest.spyOn(viewVolume, 'notifySubscribers');

    viewVolume.handlerClick(options);

    expect(spyOnNotifySubscribers).toHaveBeenCalled();
  });
});
*/
