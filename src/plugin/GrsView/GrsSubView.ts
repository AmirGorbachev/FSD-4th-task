import { GrsObserver } from '../GrsObserver/GrsObserver';
import { IOptions } from '../GrsOptions/GrsOptions';

type Coordinates = {
  top: number;
  left: number;
  rigth: number;
  bottom: number;
  width: number;
  middleX: number;
};

export default abstract class GrsSubView extends GrsObserver {
  options: IOptions;

  constructor(options: IOptions) {
    super();
    this.options = options;
  }

  calcCoords(element: HTMLDivElement): Coordinates {
    const coordinates = element.getBoundingClientRect();

    const coords: Coordinates = {
      top: coordinates.top + window.pageYOffset,
      left: coordinates.left + window.pageXOffset,
      rigth: coordinates.left + window.pageXOffset + coordinates.width,
      bottom: coordinates.top + window.pageYOffset + coordinates.height,
      width: coordinates.width,
      middleX:
        (coordinates.left +
          window.pageXOffset +
          coordinates.left +
          window.pageXOffset +
          coordinates.width) /
        2,
    };

    return coords;
  }

  calcPersentOffset(value: number, minLimit: number, maxLimit: number): number {
    const result: number = ((value - minLimit) / (maxLimit - minLimit)) * 100;

    return result;
  }
}
