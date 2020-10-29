type IElements = Array<HTMLDivElement | HTMLSpanElement>;

interface IGrsViewScale {
  init(): IElements;
}

/* typescript-eslint no-empty-function: ["error", { "allow": ["constructors"] }]*/
class GrsViewScale implements IGrsViewScale {
  init(): IElements {
    const scale: HTMLDivElement = document.createElement('div');
    scale.className = 'grs-scale';

    const scaleMin: HTMLSpanElement = document.createElement('span');
    scaleMin.className = 'grs-scale-min';

    const scaleMax: HTMLSpanElement = document.createElement('span');
    scaleMax.className = 'grs-scale-max';

    scale.append(scaleMin, scaleMax);

    return [scale, scaleMin, scaleMax];
  }
}

export { GrsViewScale };
