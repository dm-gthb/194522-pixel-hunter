import AbstractView from '../../abstract-view.js';

export default class ConfirmView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<section class="modal">
    <form class="modal__inner">
      <button class="modal__close" type="button">
        <span class="visually-hidden">Закрыть</span>
      </button>
      <h2 class="modal__title">Подтверждение</h2>
      <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
      <div class="modal__button-wrapper">
        <button class="modal__btn">Ок</button>
        <button class="modal__btn">Отмена</button>
      </div>
    </form>
  </section>`;
  }

  onCloseButtonClick() {}
  onAgreeButtonClick() {}
  onDisagreeButtonClick() {}

  bind() {
    const closeButtonElements = this.element.querySelector(`.modal__close`);
    const optionsButtonsElements = this.element.querySelectorAll(`.modal__btn`);

    closeButtonElements.addEventListener(`click`, () => this.onCloseButtonClick());
    optionsButtonsElements[0].addEventListener(`click`, () => this.onAgreeButtonClick());
    optionsButtonsElements[1].addEventListener(`click`, () => this.onDisagreeButtonClick());
  }
}
