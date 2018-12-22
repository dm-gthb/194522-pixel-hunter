import AbstractView from '../../abstract-view.js';
import QuestionOneImageView from './question-one-image.js';
import QuestionTwoImagesView from './question-two-images.js';
import QuestionThreeImagesView from './question-three-images.js';

export default class QuestionView extends AbstractView {
  constructor(question, answers, questionsQuantity) {
    super();
    this.question = question;
    this.answers = answers;
    this.questionsQuantity = questionsQuantity;
    this.view = null;
  }

  onAnswer() {}

  get element() {
    switch (this.question.type) {
      case `tinder-like`:
        this.view = new QuestionOneImageView(this.question, this.answers, this.questionsQuantity);
        break;

      case `two-of-two`:
        this.view = new QuestionTwoImagesView(this.question, this.answers, this.questionsQuantity);
        break;

      case `one-of-three`:
        this.view = new QuestionThreeImagesView(this.question, this.answers, this.questionsQuantity);
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
