import AbstractView from '../../abstract-view.js';
import resultsChartTemplate from '../../results-chart-template.js';
import {debug} from '../../settings.js';
import {resizeImage} from '../utils.js';
import {AnswerOption} from '../../data/enum.js';

export default class QuestionTwoImagesView extends AbstractView {
  constructor(question, answers, questionsQuantity) {
    super();
    this.question = question;
    this.answers = answers;
    this.questionsQuantity = questionsQuantity;
  }

  get template() {
    const resultsChart = resultsChartTemplate(this.answers, this.questionsQuantity);
    return `<section class="game">
  <p class="game__task">${this.question.question}</p>
  <form class="game__content">
    ${this.question.answers.map((answer, i) =>
    `<div class="game__option">
      ${resizeImage(answer.image, i)}
      <img src="${answer.image.url}" alt="Option ${i + 1}" width="${answer.image.width}" height="${answer.image.height}">
      <label class="game__answer game__answer--photo" ${debug.enable && answer.type === AnswerOption.PHOTO ? debug.styleRight : ``}>
        <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint" ${debug.enable && answer.type === AnswerOption.PAINTING ? debug.styleRight : ``}>
        <input class="visually-hidden" name="question${i + 1}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>`).join(``)}
  </form>
  ${resultsChart}
</section>`;
  }

  onAnswer() {}

  bind() {
    const formElement = this.element.querySelector(`.game__content`);
    const questionsWrappers = Array.from(formElement.querySelectorAll(`.game__option`));
    const imagesToAnswer = questionsWrappers.length;
    let answersRightParts = 0;
    let isAnswerRight;

    questionsWrappers.forEach((wrapper, i) => {
      const options = wrapper.querySelectorAll(`input[name="question${i + 1}"]`);
      options.forEach((option) => {
        option.addEventListener(`change`, () => {
          if (option.value === this.question.answers[i].type) {
            answersRightParts++;
          } else {
            answersRightParts--;
          }
          isAnswerRight = answersRightParts === imagesToAnswer;
        });
      });
    });

    const onFormChange = () => {
      const allOptions = Array.from(formElement.querySelectorAll(`input[type="radio"]`));
      const answers = allOptions.filter((input) => input.checked);
      if (answers.length === imagesToAnswer) {
        this.onAnswer(isAnswerRight);
      }
    };

    formElement.addEventListener(`change`, onFormChange);
  }
}
