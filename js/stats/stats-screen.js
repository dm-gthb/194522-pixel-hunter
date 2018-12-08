import AbstractView from '../game/views/abstract.js';
import winStatsTemplate from './templates/win-stats.js';
import failStatsTemplate from './templates/fail-stats.js';

export default class StatsScreeen extends AbstractView {
  constructor(win, model) {
    super();
    this.win = win;
    this.model = model;
  }

  get template() {
    return this.win ? winStatsTemplate(this.model.results, this.model.state.lifes, this.model.getQuestionsQuantity()) : failStatsTemplate(this.model.results, this.model.getQuestionsQuantity());
  }
}
