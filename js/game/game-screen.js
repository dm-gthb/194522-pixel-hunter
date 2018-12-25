import HeaderView from './views/header.js';
import QuestionView from './views/question.js';
import ConfirmView from './views/confirm.js';
import Router from '../router.js';
import {ResultType} from '../data/enum.js';

const ONE_SECOND = 1000;

const RestSeconds = {
  VERY_FEW: 5,
  FEW: 10,
  STANDARD: 20
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.confirmPopup = new ConfirmView();
    this.question = new QuestionView(this.model.getCurrentQuestion(), this.model._answers, this.model.getQuestionsQuantity());

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.question.element);

    this._timer = null;
  }

  get element() {
    return this.root;
  }

  checkAnswerSpeed() {
    const stateTime = this.model.state.time;

    if (stateTime <= RestSeconds.FEW) {
      return this.model.addAnswer(ResultType.SLOW);
    } else if (stateTime > RestSeconds.STANDARD) {
      return this.model.addAnswer(ResultType.FAST);
    }

    return this.model.addAnswer(ResultType.CORRECT);
  }

  startGame() {
    this.model.restartTimer();
    this.changeQuestion();
    this.header.onBackButtonClick = () => {
      this.showConfirmPopup();
    };
    this._timer = setInterval(() => {
      this.model.tick();
      this.updateTimeDisplay(this.model.state.time);
      if (this.model.state.time < 0) {
        this.answer(false);
      }
      if (this.model.state.time <= RestSeconds.VERY_FEW) {
        this.header.blinkTimeDisplay();
      }
    }, ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  showConfirmPopup() {
    this.root.appendChild(this.confirmPopup.element);
    this.confirmPopup.onAgreeButtonClick = () => {
      Router.showGreeting();
      this.stopTimer();
    };
    this.confirmPopup.onDisagreeButtonClick = () => this.hideConfirmPopup();
    this.confirmPopup.onCloseButtonClick = () => this.hideConfirmPopup();
  }

  hideConfirmPopup() {
    this.root.removeChild(this.confirmPopup.element);
  }

  answer(answerResult) {
    this.stopTimer();
    if (answerResult) {
      this.checkAnswerSpeed();
    } else {
      this.model.addAnswer(ResultType.WRONG);
      if (!this.model.hasLifes()) {
        return this.endGame();
      }
      this.model.reduceLifes();
    }
    if (this.model.hasNextQuestion()) {
      this.model.nextQuestion();
      return this.startGame();
    }

    return this.endGame();
  }

  updateTimeDisplay(seconds) {
    this.header.updateTimeDisplay(seconds);
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  changeQuestion() {
    this.updateHeader();
    const question = new QuestionView(this.model.getCurrentQuestion(), this.model._answers, this.model.getQuestionsQuantity());
    question.onAnswer = (isRightAnswer) => this.answer(isRightAnswer);
    this.changeContentView(question);
  }

  endGame() {
    Router.showStats(this.model);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.question.element);
    this.question = view;
  }
}
