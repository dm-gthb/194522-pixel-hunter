import AbstractView from './abstract.js';
import resultsChartTemplate from '../templates/results-chart.js';

export default class FailScreenView extends AbstractView {
  constructor(results, questionsQuantity) {
    super();
    this.results = results;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChart = resultsChartTemplate(this.results, this.questionsQuantity);
    return `<section class="result">
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${resultsChart}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>
    </table>
  </section>`;
  }
}
