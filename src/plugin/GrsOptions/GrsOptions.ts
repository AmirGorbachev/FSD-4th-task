'use strict';

interface IOptions {
  minLimit: number;
  maxLimit: number;
  minValue: number;
  maxValue: number;
  step: number;
  isVertical: boolean;
  isInterval: boolean;
  withPointers: boolean;
  withScale: boolean;
}

const defaultOptions: IOptions = {
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

export { IOptions, defaultOptions };
