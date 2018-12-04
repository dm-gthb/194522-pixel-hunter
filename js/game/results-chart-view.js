import AbstractView from './abstract-view.js';

export default class ResultsChartView extends AbstractView {
  constructor(results, questionsQuantity) {
    super();
    this.results = results;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    return `<ul class="stats">
    ${this.results.map((result) => {
    if (result === `right`) {
      return `<li class="stats__result stats__result--correct"></li>`;
    } else {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }
  }).join(``)}
    ${new Array(this.questionsQuantity - this.results.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>`;
  }
}
