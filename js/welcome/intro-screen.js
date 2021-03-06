import AbstractView from '../abstract-view.js';
import Router from '../router.js';

const NEW_BACKGROUND_URL = `url("../img/egg_distort.png")`;
const FIFTY_MILLISECONDS = 50;

export default class IntroScreen extends AbstractView {
  constructor() {
    super();
    this.symbolIndex = 0;
    this.symbolsSeq = `/–\\|`;
  }

  get template() {
    return `<div class="intro__loading"></div>
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>`;
  }

  startLoadingAnimation() {
    const loadingSymbols = this.element.querySelector(`.intro__loading`);
    this.symbolIndex = ++this.symbolIndex >= this.symbolsSeq.length ? 0 : this.symbolIndex;
    loadingSymbols.textContent = this.symbolsSeq[this.symbolIndex];
    this.timeout = setTimeout(() => this.startLoadingAnimation(), FIFTY_MILLISECONDS);
  }

  stopLoadingAnimation() {
    clearInterval(this.timeout);
  }

  changeBackground() {
    this.element.querySelector(`.intro`).style.backgroundImage = NEW_BACKGROUND_URL;
  }

  bind() {
    const nextScreenButtonElement = this.element.querySelector(`.intro__asterisk`);
    nextScreenButtonElement.addEventListener(`click`, () => {
      Router.showGreeting();
    });
  }
}
