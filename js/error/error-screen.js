import AbstractView from '../game/views/abstract.js';

export default class ErrorScreen extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<section class="modal">
    <div class="modal__inner">
      <h2 class="modal__title">Произошла ошибка!</h2>
      <p class="modal__text modal__text--error">${this.error.message}</p>
    </div>
  </section>`;
  }
}