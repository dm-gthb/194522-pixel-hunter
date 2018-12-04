import AbstractView from './abstract-view.js';
import ResultsChartView from './results-chart-view.js';

export default class FailScreenView extends AbstractView {
  constructor(results, questionsQuantity) {
    super();
    this.results = results;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChartView = new ResultsChartView(this.results, this.questionsQuantity);
    const resultsChartTemplate = resultsChartView.template;
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
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${resultsChartTemplate}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
  </section>`;
  }
}
