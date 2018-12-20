import AbstractView from '../abstract-view.js';
import Router from '../router.js';

export default class IntroScreen extends AbstractView {
  constructor() {
    super()
    this.symbolIndex = 0;
    this.symbolsSeq = `/–\\|`;
  }

  get template() {
    return `<div class="intro__loading"></div>
    <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </section>
    <section class="greeting central--blur">
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
      <p class="greeting__challenge-text">Правила игры просты:</p>
      <ul class="greeting__challenge-list">
        <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
        <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
        <li>Фотореализм обманчив и коварен.</li>
        <li>Помни, главное — смотреть очень внимательно.</li>
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Продолжить</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>
  </section>`;
  }

  startLoadingAnimation() {
    const loadingSymbols = this.element.querySelector(`.intro__loading`);
    this.symbolIndex = ++this.symbolIndex >= this.symbolsSeq.length ? 0 : this.symbolIndex;
    loadingSymbols.textContent = this.symbolsSeq[this.symbolIndex];
    this.timeout = setTimeout(() => this.startLoadingAnimation(), 50);
  }

  stopLoadingAnimation() {
    clearInterval(this.timeout);
  }

  hideIntro() {
    this.element.querySelector(`.intro`).style.backgroundImage = `url("../img/egg_distort.png")`;
  }

  replaceBlocks() {
    this.element.replaceChild(this.element.querySelector(`.greeting`) ,this.element.querySelector(`.intro`));
  }

  showGreeting() {
    this.element.querySelector(`.greeting`).style.display = 'flex';
    const loadingSymbols = this.element.querySelector(`.intro__loading`);
    loadingSymbols.style.display = `none`;
  }

  bind() {
    const nextScreenButtonElement = this.element.querySelector(`.intro__asterisk`);
    nextScreenButtonElement.addEventListener(`click`, () => {
      Router.showGreeting();
    });
  }
}
