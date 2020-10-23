"use strict";

import { GrsViewVolume } from "../GrsView/GrsViewVolume";
import { GrsViewButton } from "../GrsView/GrsViewButton";
import { GrsViewScale } from "../GrsView/GrsViewScale";

interface Elements {
  rangeSlider: HTMLElement;
  buttonMin: HTMLElement;
  pointerMin: HTMLElement;
  buttonMax: HTMLElement;
  pointerMax: HTMLElement;
  volume: HTMLElement;
  filled: HTMLElement;
  scale: HTMLElement;
  scaleMin: HTMLElement;
  scaleMax: HTMLElement;
}

interface IGrsView {
  readonly elements: Elements;
  init(element): void;
  getElement(element: keyof Elements): HTMLElement;
  calcCoords(element): {
    top: number;
    left: number;
    rigth: number;
    bottom: number;
    width: number;
    middleX: number;
  };
  addVertical(): void;
  removeVertical(): void;
  addInterval(): void;
  removeInterval(): void;
  addPointers(): void;
  removePointers(): void;
  addScale(): void;
  removeScale(): void;
}

class GrsView {
  readonly elements: Elements;

  constructor() {
    this.elements;
  }

  init(element) {
    this.elements.rangeSlider = document.createElement("div");
    this.elements.rangeSlider.className = "green-range-slider grs";

    [
      this.elements.buttonMin,
      this.elements.pointerMin,
      this.elements.buttonMax,
      this.elements.pointerMax,
    ] = new GrsViewButton().initButtonMin();

    [this.elements.volume, this.elements.filled] = new GrsViewVolume().init();

    [
      this.elements.scale,
      this.elements.scaleMin,
      this.elements.scaleMax,
    ] = new GrsViewScale().init();

    this.elements.rangeSlider.append(
      this.elements.volume,
      this.elements.scale,
      this.elements.buttonMin,
      this.elements.buttonMax
    );

    element.append(this.elements.rangeSlider);
  }

  getElement(element): HTMLElement {
    return this.elements[element];
  }

  calcCoords(element) {
    let coordinates = this.elements[element].getBoundingClientRect();

    let coords = {
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

  addVertical(): void {
    this.elements.rangeSlider.classList.add("grs-is-vertical");
  }
  removeVertical(): void {
    this.elements.rangeSlider.classList.remove("grs-is-vertical");
  }

  addInterval(): void {
    this.elements.rangeSlider.classList.add("grs-is-interval");
  }
  removeInterval(): void {
    this.elements.rangeSlider.classList.remove("grs-is-interval");
  }

  addPointers(): void {
    this.elements.rangeSlider.classList.add("grs-with-pointers");
  }
  removePointers(): void {
    this.elements.rangeSlider.classList.remove("grs-with-pointers");
  }

  addScale(): void {
    this.elements.rangeSlider.classList.add("grs-with-scale");
  }
  removeScale(): void {
    this.elements.rangeSlider.classList.remove("grs-with-scale");
  }
}

export { IGrsView, GrsView };
