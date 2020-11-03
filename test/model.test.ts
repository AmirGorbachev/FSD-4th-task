import { IOptions} from '../src/plugin/GrsOptions/GrsOptions';
import { GrsModel } from '../src/plugin/GrsModel/GrsModel';

describe('GrsModel.getOptions:', () => {

  test('should been defined', () => {

    const options: IOptions = {
      minLimit: 0,
      maxLimit: 100,
      minValue: 25,
      maxValue: 75,
      step: 1,
      isVertical: false,
      isInterval: false,
      withPointers: true,
      withScale: true,
    }
    const model: GrsModel = new GrsModel(options);
    expect(model.getOptions()).toBeDefined();

  });

});