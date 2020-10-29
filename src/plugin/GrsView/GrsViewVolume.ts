type IElements = Array<HTMLDivElement | HTMLSpanElement>;

interface IGrsViewVolume {
  init(): IElements;
}

class GrsViewVolume implements IGrsViewVolume {
  init(): IElements {
    const volume = document.createElement('div');
    volume.className = 'grs-volume';

    const filled = document.createElement('div');
    filled.className = 'grs-filled';

    volume.append(filled);

    return [volume, filled];
  }
}

export { GrsViewVolume };
