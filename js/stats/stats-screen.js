import AbstractView from '../abstract-view.js';
import resultTableTemplate from './templates/result-table-template.js';
import Router from '../router.js';

export default class StatsScreeen extends AbstractView {
  constructor(model) {
    super();
    this.model = model;
  }

  get template() {
    const resultTable = resultTableTemplate(this.model.answers, this.model.state.lifes, this.model.getQuestionsQuantity());
    return `<header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>
    ${resultTable}`;
  }

  bind() {
    const backButtonElement = this.element.querySelector(`.back`);
    backButtonElement.addEventListener(`click`, () => Router.showGreeting());
    this._resultsHistoryContainer = this.element.querySelector(`section.result`);
  }

  showResultsHistory(previousGames) {
    previousGames.reverse();
    const resultsHistoryMarkup = `${previousGames.map((previousGame, i) => {
      return resultTableTemplate(previousGame.stats, previousGame.lives, this.model.getQuestionsQuantity(), i + 1);
    }).join(``)}`;

    this._resultsHistoryContainer.innerHTML = resultsHistoryMarkup;
  }

  showResultsLoadingError(errorMessage) {
    const message = `<p>Previous Games Results Couldn't Be Loaded<br>${errorMessage}</p>`;
    this._resultsHistoryContainer.insertAdjacentHTML(`beforeend`, message);
  }
}
