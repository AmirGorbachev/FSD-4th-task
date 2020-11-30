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
  beforeAll(() => {
    view.initElements($slider, options);
  });

  test('should add slider in DOM', () => {
    expect($('#slider').has('.green-range-slider')[0]).toBeDefined();
  });

  test('should add elements of slider in DOM', () => {
    expect($('#slider').children('.volume')).toBeTruthy();
    expect($('#slider').children('.scale')).toBeTruthy();
    expect($('#slider').children('.buttonMin')).toBeTruthy();
    expect($('#slider').children('.buttonMax')).toBeTruthy();
  });

  test('should call a class of subViews', () => {
    expect(GrsViewVolume).toHaveBeenCalled();
    expect(GrsViewButtons).toHaveBeenCalled();
    expect(GrsViewScale).toHaveBeenCalled();
  });
});

describe('GrsView.createEventLicteners:', () => {
  beforeAll(() => {
    view.createEventLicteners(options);
  });

  test('should add events of subViews', () => {
    expect(view.subView.volume.onClick).toBeCalled();
    expect(view.subView.scale.onClick).toBeCalled();
    expect(view.subView.buttons.onMoveButton).toBeCalled();
  });

  test('should add listeners of subViews', () => {
    expect(view.subView.volume.addSubscriber).toBeCalled();
    expect(view.subView.scale.addSubscriber).toBeCalled();
    expect(view.subView.buttons.addSubscriber).toBeCalled();
  });
});

describe('GrsView.updateView:', () => {
  test('should change classes by options', () => {
    const spyOnAddParameter = jest.spyOn(view, 'addParameter');
    const spyOnRemoveParameter = jest.spyOn(view, 'removeParameter');

    view.updateView(options);

    expect(spyOnAddParameter).toHaveBeenCalled();
    expect(spyOnRemoveParameter).toHaveBeenCalled();
  });

  test('should call a render method', () => {
    const spyOnRender = jest.spyOn(view, 'render');

    view.updateView(options);

    expect(spyOnRender).toHaveBeenCalled();
  });
});

describe('GrsView.render:', () => {
  test('should call render methods of subViews', () => {
    view.render(options);

    expect(view.subView.buttons.render).toBeCalled();
    expect(view.subView.volume.render).toBeCalled();
    expect(view.subView.scale.render).toBeCalled();
  });
});

describe('GrsView.init:', () => {
  test('should call a methods for initialization of view', () => {
    const spyOnInitElements = jest.spyOn(view, 'initElements');
    const spyOnUpdateView = jest.spyOn(view, 'updateView');
    const spyOnCreateEventLicteners = jest.spyOn(view, 'createEventLicteners');

    view.init($slider, options);

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
