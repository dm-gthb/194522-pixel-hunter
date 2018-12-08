import AbstractView from './abstract.js';
import QuestionOneImageView from './question-one-image.js';
import QuestionTwoImagesView from './question-two-images.js';
import QuestionThreeImagesView from './question-three-images.js';

export default class QuestionView extends AbstractView {
  constructor(question, results, questionsQuantity) {
    super();
    this.question = question;
    this.results = results;
    this.questionsQuantity = questionsQuantity;
    this.view = null;
  }

  onAnswer() {}

  get element() {
    switch (this.question.questionType) {
      case `1-img`:
        this.view = new QuestionOneImageView(this.question, this.results, this.questionsQuantity);
        break;

      case `2-img`:
        this.view = new QuestionTwoImagesView(this.question, this.results, this.questionsQuantity);
        break;

      case `3-img`:
        this.view = new QuestionThreeImagesView(this.question, this.results, this.questionsQuantity);
        break;
    }

    this.view.onAnswer = this.onAnswer;

    if (this._element) {
      return this._element;
    }

    this._element = this.view.element;
    return this._element;
  }
}
