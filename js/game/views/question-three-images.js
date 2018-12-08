import AbstractView from './abstract.js';
import resultsChartTemplate from '../templates/results-chart.js';

export default class QuestionThreeImagesView extends AbstractView {
  constructor(question, results, questionsQuantity) {
    super();
    this.question = question;
    this.results = results;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChart = resultsChartTemplate(this.results, this.questionsQuantity);
    return `<section class="game">
  <p class="game__task">${this.question.questionText}</p>
  <form class="game__content  game__content--triple">
    ${this.question.answers.map((answer, i) =>
    `<div class="game__option"><img src="${answer.image}" alt="Option ${i + 1}" width="304" height="455"></div>`).join(``)}
    </form>
    ${resultsChart}
</section>`;
  }

  onAnswer() {}

  bind() {
    const options = Array.from(this.element.querySelectorAll(`.game__option img`));
    options.forEach((option, i) => {
      option.addEventListener(`click`, () => {
        let isAnswerRight = this.question.answers[i].value === this.question.soughtFor;
        this.onAnswer(isAnswerRight);
      });
    });
  }
}
