import { IGrsObserver, GrsObserver } from '../GrsObserver/GrsObserver';

type IElements = Array<HTMLDivElement | HTMLSpanElement>;

interface IConfig {
  minValue: number;
  maxValue: number;
  isInterval: boolean;
}

interface IGrsViewButton {
  buttonMin: HTMLElement;
  pointerMin: HTMLElement;
  buttonMax: HTMLElement;
  pointerMax: HTMLElement;
  observer: IGrsObserver;
  getElements(): IElements;
}

class GrsViewButton implements IGrsViewButton {
  buttonMin: HTMLElement;
  pointerMin: HTMLElement;
  buttonMax: HTMLElement;
  pointerMax: HTMLElement;
  observer: IGrsObserver;

  constructor() {
    this.buttonMin = document.createElement('div');
    this.buttonMin.className = 'grs-button-min';

    this.pointerMin = document.createElement('span');
    this.pointerMin.className = 'grs-pointer-min';

    this.buttonMin.append(this.pointerMin);

    this.buttonMax = document.createElement('div');
    this.buttonMax.className = 'grs-button-max';

    this.pointerMax = document.createElement('span');
    this.pointerMax.className = 'grs-pointer-max';

    this.buttonMax.append(this.pointerMax);

    this.observer = new GrsObserver();
  }

  getElements(): IElements {
    return [this.buttonMin, this.pointerMin, this.buttonMax, this.pointerMax];
  }

  render(config: IConfig): void {
    // Ползунок min
    this.buttonMin.style.left =
      this.calcPersentOffset('minValue') + '%';
    this.pointerMin.innerHTML = String(config.minValue);
    // Ползунок max
    if (config.isInterval) {
      this.buttonMax.style.left =
        this.calcPersentOffset('maxValue') + '%';
      this.pointerMax.innerHTML = String(config.maxValue);
    }
  }

  onMoveButton(): void {
    // Кнопка минимальная или максимальная
    let isElementButtonMin: boolean;

    // События
    const onMouseDown = (event: MouseEvent) => {
      isElementButtonMin = (event.currentTarget as HTMLElement).classList.contains(
        'grs-button-min'
      );
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (event: MouseEvent) => {
      // Сброс действия по умолчанию (выделение текста)
      event.preventDefault();

      // Новая позиция кнопки
      let newPosition = event.clientX - this.calcCoords('volume').left;

      // Границы смещения
      let leftEdge, rightEdge;
      if (isElementButtonMin) {
        leftEdge = 0;
        rightEdge = this.options.isInterval
          ? this.calcCoords('buttonMax').middleX -
            this.calcCoords('volume').left
          : this.calcCoords('volume').rigth;
      } else {
        leftEdge =
          this.calcCoords('buttonMin').middleX - this.calcCoords('volume').left;
        rightEdge = this.calcCoords('volume').width;
      }
      // Проверка выхода за границы
      if (newPosition < leftEdge) {
        newPosition = leftEdge;
      } else if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }

      // Смещение кнопки в процентах
      // ((смещение / ширина слайдера) * 100%)
      const shiftX = (newPosition / this.calcCoords('volume').width) * 100;

      // Уведомление об изменении
      if (isElementButtonMin) {
        this.observer.notifySubscribers({ option: 'minValue', value: shiftX });
      } else {
        this.observer.notifySubscribers({ option: 'maxValue', value: shiftX });
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    this.buttonMin.addEventListener('mousedown', onMouseDown);
    this.buttonMax.addEventListener('mousedown', onMouseDown);
  }
}

export { GrsViewButton };
