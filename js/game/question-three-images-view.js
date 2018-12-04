import AbstractView from './abstract-view.js';

export default class QuestionThreeImagesView extends AbstractView {
  constructor(question) {
    super();
    this.question = question;
  }

  get template() {
    return `<section class="game">
  <p class="game__task">${this.question.questionText}</p>
  <form class="game__content  game__content--triple">
    ${this.question.answers.map((answer, i) =>
    `<div class="game__option"><img src="${answer.image}" alt="Option ${i + 1}" width="304" height="455"></div>`).join(``)}
    </form>
</section>`;
  }

  handleAnswer() {}

  bind() {
    const options = Array.from(this.element.querySelectorAll(`.game__option img`));
    options.forEach((option, i) => {
      option.addEventListener(`click`, () => {
        let isAnswerRight = this.question.answers[i].value === this.question.soughtFor;
        this.handleAnswer(isAnswerRight);
      });
    });
  }
}
