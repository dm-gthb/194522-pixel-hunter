import AbstractView from '../game/views/abstract.js';
import Router from '../router.js';

export default class IntroScreen extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;
  }

  bind() {
    const nextScreenButtonElement = this.element.querySelector(`.intro__asterisk`);
    nextScreenButtonElement.addEventListener(`click`, () => {
      Router.showGreeting();
    });
  }
}
