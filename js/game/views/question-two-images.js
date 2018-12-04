import AbstractView from './abstract.js';

export default class QuestionTwoImagesView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<section class="game">
  <p class="game__task">${this.question.questionText}</p>
  <form class="game__content">
    ${this.question.answers.map((answer, i) =>
    `<div class="game__option">
      <img src="${answer.image}" alt="Option ${i + 1}" width="468" height="458">
      <label class="game__answer game__answer--photo">
        <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>
    </div>`).join(``)}
  </form>
</section>`;
  }

  handleAnswer() {}

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
          if (option.value === this.question.answers[i].value) {
            answersRightParts++;
          } else {
            answersRightParts--;
          }
          isAnswerRight = answersRightParts === imagesToAnswer;
        });
      });
    });

    const formElementChangeHandler = () => {
      const allOptions = Array.from(formElement.querySelectorAll(`input[type="radio"]`));
      const answers = allOptions.filter((input) => input.checked);
      if (answers.length === imagesToAnswer) {
        this.handleAnswer(isAnswerRight);
      }
    };

    formElement.addEventListener(`change`, formElementChangeHandler);
  }
}
