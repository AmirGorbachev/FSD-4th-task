'use strict';

interface IGrsViewVolume {
  volume: HTMLDivElement;
  filled: HTMLDivElement;
}

class GrsViewVolume {
  volume: HTMLDivElement;
  filled: HTMLDivElement;

  constructor() {}

  init() {
    let volume = document.createElement('div');
    volume.className = 'grs-volume';

    let filled = document.createElement('div');
    filled.className = 'grs-filled';

    volume.append(filled);

    this.volume = volume;
    this.filled = filled;

    return [this.volume, this.filled];
  }


}

export {GrsViewVolume};