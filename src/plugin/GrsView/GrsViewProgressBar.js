"use strict";

class GrsViewProgressBar {

  constructor() {
    this.progressBar = document.createElement("div");
    this.progressBar.className = "green-range-slider grs-progress-bar";
  }

  getProgressBar() {
    return this.progressBar;
  }
}

export {GrsViewProgressBar};