import HeaderView from './views/header.js';
import QuestionView from './views/question.js';
import ConfirmView from './views/confirm.js';
import Router from '../router.js';

const ONE_SECOND = 1000;

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

  checkAnsweerSpeed() {
    const stateTime = this.model.state.time;

    if (stateTime <= 10) {
      return this.model.addAnswer(`slow`);
    } else if (stateTime > 20) {
      return this.model.addAnswer(`fast`);
    }

    return this.model.addAnswer(`correct`);
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
      if (this.model.state.time <= 5) {
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
      this.checkAnsweerSpeed();
    } else {
      this.model.addAnswer(`wrong`);
      if (!this.model.hasLifes()) {
        return this.endGame();
      }
      this.model.reduceLifes();
    }
    if (this.model.hasNextQuestion()) {
      this.model.nextQuestion();
      return this.startGame();
    } else {
      return this.endGame();
    }
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
