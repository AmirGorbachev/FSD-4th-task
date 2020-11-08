import { IOptions } from '../src/plugin/GrsOptions/GrsOptions';
import { GrsModel } from '../src/plugin/GrsModel/GrsModel';

const defaultOptions: IOptions = {
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
let model: GrsModel = new GrsModel(defaultOptions);

beforeEach(() => {
  model = new GrsModel(defaultOptions);
});

describe('GrsModel.getOption:', () => {
  test('should return value of choosen option', () => {
    expect(model.getOption('minLimit')).toBe(17);
    expect(model.getOption('maxLimit')).toBe(63);
    expect(model.getOption('minValue')).toBe(25);
    expect(model.getOption('maxValue')).toBe(55);
    expect(model.getOption('step')).toBe(5);
    expect(model.getOption('isVertical')).toBe(false);
    expect(model.getOption('isInterval')).toBe(false);
    expect(model.getOption('withPointers')).toBe(true);
    expect(model.getOption('withScale')).toBe(true);
  });
});

describe('GrsModel.getOptions:', () => {
  test('should return options', () => {
    expect(model.getOptions()).toBe(defaultOptions);
  });
});

describe('GrsModel.updateOptions:', () => {
  beforeAll(() => {
    const newOptions: IOptions = {
      minValue: 35,
      withScale: true,
      isInterval: true,
    } as IOptions;
    model.updateOptions(newOptions);
  });

  afterAll(() => {
    model.updateOptions(defaultOptions);
  })

  test('should change choosen value of options', () => {
    expect(model.getOption('minValue')).toBe(35);
    expect(model.getOption('withScale')).toBe(true);
    expect(model.getOption('isInterval')).toBe(true);
  });

  test('should not change value of options which was not choosen', () => {
    expect(model.getOption('minLimit')).toBe(17);
    expect(model.getOption('maxLimit')).toBe(63);
    expect(model.getOption('minValue')).toBe(35);
    expect(model.getOption('step')).toBe(5);
    expect(model.getOption('isVertical')).toBe(false);
    expect(model.getOption('withPointers')).toBe(true);
    expect(model.getOption('withScale')).toBe(true);
  });
});

describe('GrsModel.calcValue:', () => {
  test('should return correct value for that step', () => {
    expect(model.calcValue(0)).toBe(17);
    expect(model.calcValue(25)).toBe(30);
    expect(model.calcValue(50)).toBe(40);
    expect(model.calcValue(75)).toBe(50);
    expect(model.calcValue(100)).toBe(63);
  });
});
