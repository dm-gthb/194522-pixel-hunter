import AbstractView from '../../abstract-view.js';
import QuestionOneImageView from './question-one-image.js';
import QuestionTwoImagesView from './question-two-images.js';
import QuestionThreeImagesView from './question-three-images.js';
import {QuestionType} from '../../data/game-data.js';

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
      case QuestionType.TINDER_LIKE:
        this.view = new QuestionOneImageView(this.question, this.answers, this.questionsQuantity);
        break;

      case QuestionType.TWO_OF_TWO:
        this.view = new QuestionTwoImagesView(this.question, this.answers, this.questionsQuantity);
        break;

      case QuestionType.ONE_OF_THREE:
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
