import AbstractView from './abstract.js';
import resultsChartTemplate from '../templates/results-chart.js';
import {debug} from '../../settings.js';

export default class QuestionOneImageView extends AbstractView {
  constructor(question, results, questionsQuantity) {
    super();
    this.question = question;
    this.results = results;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChart = resultsChartTemplate(this.results, this.questionsQuantity);
    const answer = this.question.answers[0];
    return `<section class="game">
      <p class="game__task">${this.question.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.question.answers[0].image.url}" alt="Option 1" width="${this.question.answers[0].image.width}" height="${this.question.answers[0].image.height}">
          <label class="game__answer  game__answer--photo" ${debug.enable && this.question.answers[0].type === `photo` ? debug.styleRight : ``}>
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint" ${debug.enable && this.question.answers[0].type === `painting` ? debug.styleRight : ``}>
            <input class="visually-hidden" name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
      ${resultsChart}
    </section>`;
  }

  onAnswer() {}

  bind() {
    const formElement = this.element.querySelector(`.game__content`);
    const options = Array.from(formElement.querySelectorAll(`input`));
    options.forEach((option) => {
      option.addEventListener(`change`, () => {
        const selectedOption = option.value;
        const rightAnswer = this.question.answers[0].type;
        const isAnswerRight = selectedOption === rightAnswer;
        this.onAnswer(isAnswerRight);
      });
    });
  }
}
