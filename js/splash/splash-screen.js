import AbstractView from '../abstract-view.js';

export default class SplashScreen extends AbstractView {
  constructor() {
    super();
    this.symbolIndex = 0;
    this.symbolsSeq = `/–\\|`;
  }

  get template() {
    return `<div></div>`;
  }

  start() {
    this.symbolIndex = ++this.symbolIndex >= this.symbolsSeq.length ? 0 : this.symbolIndex;
    this.element.textContent = this.symbolsSeq[this.symbolIndex];
    this.timeout = setTimeout(() => this.start(), 50);
  }

  stop() {
    clearInterval(this.timeout);
  }
}
