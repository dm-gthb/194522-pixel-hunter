import AbstractView from '../../abstract-view.js';
import resultsChartTemplate from '../../results-chart-template.js';
import {debug} from '../../settings.js';
import {resizeImage} from '../utils.js';
import {AnswerOption} from '../../data/enum.js';

export default class QuestionOneImageView extends AbstractView {
  constructor(question, answers, questionsQuantity) {
    super();
    this.question = question;
    this.answers = answers;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChart = resultsChartTemplate(this.answers, this.questionsQuantity);
    const answer = this.question.answers[0];
    return `<section class="game">
      <p class="game__task">${this.question.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          ${resizeImage(answer.image)}
          <img src="${this.question.answers[0].image.url}" alt="Option 1" width="${this.question.answers[0].image.width}" height="${this.question.answers[0].image.height}">
          <label class="game__answer  game__answer--photo" ${debug.enable && this.question.answers[0].type === AnswerOption.PHOTO ? debug.styleRight : ``}>
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint" ${debug.enable && this.question.answers[0].type === AnswerOption.PAINTING ? debug.styleRight : ``}>
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
