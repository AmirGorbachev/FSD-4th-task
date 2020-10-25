interface IElements {
  [index: number]: HTMLDivElement;
}

interface IGrsViewVolume {
  init(): IElements;
}

class GrsViewVolume implements IGrsViewVolume {
  constructor() {}

  init() {
    let volume = document.createElement('div');
    volume.className = 'grs-volume';

    let filled = document.createElement('div');
    filled.className = 'grs-filled';

    volume.append(filled);

    return [volume, filled];
  }
}

export {GrsViewVolume};