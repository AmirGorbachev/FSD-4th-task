import { IGrsView, GrsView } from '../GrsView/GrsView.ts';
import { IGrsModel, GrsModel } from '../GrsModel/GrsModel.ts';
import { IOptions } from '../GrsOptions/GrsOptions.ts';

interface IGrsController {
  model: IGrsModel;
  view: IGrsView;
  init(container: HTMLElement): void;
  updateModel(options: IOptions): void;
  updateView(): void;
  render(): void;
  onMoveButton(): void;
  onClickVolume(): void;
  onClickScale(): void;
}

class GrsController implements IGrsController {
  readonly model: IGrsModel;
  readonly view: IGrsView;

  constructor(options: IOptions) {
    this.model = new GrsModel(options);
    this.view = new GrsView();
  }

  init(container) {
    this.view.init(container);
    this.updateView();
    this.onMoveButton();
    this.onClickVolume();
    this.onClickScale();
  }

  updateModel(options) {
    for (let key in options) {
      this.model.updateOption(key, options[key]);
    }
    this.updateView();
  }

  updateView() {
    // Проверка параметров отрисовки
    this.model.getOption('isVertical')
      ? this.view.addParameter('isVertical')
      : this.view.removeParameter('isVertical');

    this.model.getOption('isInterval')
      ? this.view.addParameter('isInterval')
      : this.view.removeParameter('isInterval');

    this.model.getOption('withPointers')
      ? this.view.addParameter('withPointers')
      : this.view.removeParameter('withPointers');

    this.model.getOption('withScale')
      ? this.view.addParameter('withScale')
      : this.view.removeParameter('withScale');

    // Значения шкалы (лимитов)
    this.view.getElement('scaleMin').innerHTML = String(
      this.model.getOption('minLimit')
    );
    this.view.getElement('scaleMax').innerHTML = String(
      this.model.getOption('maxLimit')
    );

    // Отрисовка элементов
    this.render();
  }

  render() {
    // Ползунок min
    this.view.getElement('buttonMin').style.left =
      this.model.calcPersentOffset('minValue') + '%';
    this.view.getElement('pointerMin').innerHTML = String(
      this.model.getOption('minValue')
    );
    // Ползунок max
    if (this.model.getOption('isInterval')) {
      this.view.getElement('buttonMax').style.left =
        this.model.calcPersentOffset('maxValue') + '%';
      this.view.getElement('pointerMax').innerHTML = String(
        this.model.getOption('maxValue')
      );
    }
    // Шкала прогресса filled
    if (this.model.getOption('isInterval')) {
      this.view.getElement('filled').style.left = this.view.getElement(
        'buttonMin'
      ).style.left;
      this.view.getElement('filled').style.width =
        this.model.calcPersentOffset('maxValue') -
        this.model.calcPersentOffset('minValue') +
        '%';
    } else {
      this.view.getElement('filled').style.width = this.view.getElement(
        'buttonMin'
      ).style.left;
    }
  }

  onMoveButton() {
    // Кнопка минимальная или максимальная
    let isElementButtonMin;

    // События
    let onMouseDown = (event: MouseEvent) => {
      isElementButtonMin = (event.currentTarget as HTMLElement).classList.contains(
        'grs-button-min'
      );
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }

    let onMouseMove = (event: MouseEvent) => {
      // Сброс действия по умолчанию (выделение текста)
      event.preventDefault();

      // Новая позиция кнопки
      let newPosition = event.clientX - this.view.calcCoords('volume').left;

      // Границы смещения
      let leftEdge, rightEdge;
      if (isElementButtonMin) {
        leftEdge = 0;
        rightEdge = this.model.getOption('isInterval')
          ? this.view.calcCoords('buttonMax').middleX -
            this.view.calcCoords('volume').left
          : this.view.calcCoords('volume').rigth;
      } else {
        leftEdge =
          this.view.calcCoords('buttonMin').middleX -
          this.view.calcCoords('volume').left;
        rightEdge = this.view.calcCoords('volume').width;
      }
      // Проверка выхода за границы
      if (newPosition < leftEdge) {
        newPosition = leftEdge;
      } else if (newPosition > rightEdge) {
        newPosition = rightEdge;
      }

      // Смещение кнопки в процентах
      // ((смещение / ширина слайдера) * 100%)
      let shiftX = (newPosition / this.view.calcCoords('volume').width) * 100;

      // Обновление модели
      if (isElementButtonMin) {
        this.model.updateOption('minValue', this.model.calcValue(shiftX));
      } else {
        this.model.updateOption('maxValue', this.model.calcValue(shiftX));
      }
      // Отрисовка элементов
      this.render();
    }

    let onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    this.view
      .getElement('buttonMin')
      .addEventListener('mousedown', onMouseDown);
    this.view
      .getElement('buttonMax')
      .addEventListener('mousedown', onMouseDown);
  }

  onClickVolume() {
    this.view.getElement('volume').addEventListener('click', () => {
      // Смещение кнопки в процентах
      // ((клик - позиция слайдера) / ширина слайдера) * 100%
      let shiftX =
        (((event as MouseEvent).clientX - this.view.calcCoords('volume').left) /
          this.view.calcCoords('volume').width) *
        100;
      // Обновление модели
      if (
        this.model.getOption('isInterval') &&
        shiftX > this.model.calcPersentOffset('maxValue')
      ) {
        this.model.updateOption('maxValue', this.model.calcValue(shiftX));
      } else {
        this.model.updateOption('minValue', this.model.calcValue(shiftX));
      }
      // Отрисовка элементов
      this.render();
    });
  }

  onClickScale() {
    this.view.getElement('scaleMin').addEventListener('click', () => {
      // Обновление модели
      this.model.updateOption('minValue', this.model.calcValue(0));
      // Отрисовка элементов
      this.render();
    });
    this.view.getElement('scaleMax').addEventListener('click', () => {
      // Обновление модели
      if (this.model.getOption('isInterval')) {
        this.model.updateOption('maxValue', this.model.calcValue(100));
      } else {
        this.model.updateOption('minValue', this.model.calcValue(100));
      }
      // Отрисовка элементов
      this.render();
    });
  }
}

export { IGrsController, GrsController };
