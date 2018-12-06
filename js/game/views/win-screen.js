import AbstractView from './abstract.js';
import resultsChartTemplate from '../templates/results-chart.js';

export default class WinScreenView extends AbstractView {
  constructor(results, lifes, questionsQuantity) {
    super();
    this.results = results;
    this.lifes = lifes;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const RIGHT_ANSWER_POINTS = 100;
    const REST_LIFE_POINTS = 50;
    const resultsChart = resultsChartTemplate(this.results, this.questionsQuantity);
    const rightAnswersArray = this.results.filter((result) => result === `right`);
    const pointsByLifes = this.lifes * REST_LIFE_POINTS;
    const pointsByRightAnswers = rightAnswersArray.length * RIGHT_ANSWER_POINTS;

    let lifesBonusTemplate = ``;
    if (this.lifes > 0) {
      lifesBonusTemplate = `<tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">${this.lifes} <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">${pointsByLifes}</td>
        </tr>`;
    }

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
    <section class="result">
      <h2 class="result__title">Победа!</h2>
      <table class="result__table">
        <tr>
          <td class="result__number">1.</td>
          <td colspan="2">
            ${resultsChart}
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">${pointsByRightAnswers}</td>
        </tr>
        ${lifesBonusTemplate}
        <tr>
          <td colspan="5" class="result__total  result__total--final">${pointsByRightAnswers + pointsByLifes}</td>
        </tr>
      </table>
    </section>`;
  }
}
