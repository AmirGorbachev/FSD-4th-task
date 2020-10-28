import { IGrsView} from '../GrsView/GrsView.ts';
import { IGrsModel} from '../GrsModel/GrsModel.ts';
import { IOptions } from '../GrsOptions/GrsOptions.ts';

interface IGrsController {
  model: IGrsModel;
  view: IGrsView;
  init(container: HTMLElement): void;
  updateView(): void;
}

class GrsController implements IGrsController {
  readonly model: IGrsModel;
  readonly view: IGrsView;

  constructor(model: IGrsModel, view: IGrsView) {
    this.model = model;
    this.view = view;
  }

  init(container: HTMLElement) {
    this.view.init(container);

    this.model.observer.addSubscriber(this.updateView.bind(this));
  }

  updateView() {
    this.view.updateView(this.model.getOptions());
  }

  onMoveButton() {
    // Кнопка минимальная или максимальная
    let isElementButtonMin: boolean;

    // События
    let onMouseDown = (event: MouseEvent) => {
      isElementButtonMin = (event.currentTarget as HTMLElement).classList.contains(
        'grs-button-min'
      );
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

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
        this.model.updateOptions({minValue: this.model.calcValue(shiftX)} as IOptions);
      } else {
        this.model.updateOptions({maxValue: this.model.calcValue(shiftX)} as IOptions);
      }
      // Отрисовка элементов
      this.view.render();
    };

    let onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

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
        this.model.updateOptions({maxValue: this.model.calcValue(shiftX)} as IOptions);
      } else {
        this.model.updateOptions({minValue: this.model.calcValue(shiftX)} as IOptions);
      }
      // Отрисовка элементов
      this.view.render();
    });
  }

  onClickScale() {
    this.view.getElement('scaleMin').addEventListener('click', () => {
      // Обновление модели
      this.model.updateOptions({minValue: this.model.calcValue(0)} as IOptions);
      // Отрисовка элементов
      this.view.render();
    });
    this.view.getElement('scaleMax').addEventListener('click', () => {
      // Обновление модели
      if (this.model.getOption('isInterval')) {
        this.model.updateOptions({maxValue: this.model.calcValue(100)} as IOptions);
      } else {
        this.model.updateOptions({minValue: this.model.calcValue(100)} as IOptions);
      }
      // Отрисовка элементов
      this.view.render();
    });
  }
}

export { IGrsController, GrsController };
