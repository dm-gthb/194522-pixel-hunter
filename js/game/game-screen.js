import HeaderView from './views/header.js';
import QuestionView from './views/question.js';
import WinScreenView from './views/win-screen.js';
import FailScreenView from './views/fail-screen.js';

export default class GamePresenter {
  constructor(model) {
    this.model = model;
    this.header = new HeaderView(this.model.state);
    this.question = new QuestionView(this.model.getCurrentQuestion(), this.model._results, this.model.getQuestionsQuantity());

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.question.element);

    this._timer = null;
  }

  get element() {
    return this.root;
  }

  startGame() {
    this.model.restartTimer();
    this.changeQuestion();
    this._timer = setInterval(() => {
      this.model.tick();
      this.updateTimeDisplay(this.model.state.time);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  answer(answerResult) {
    this.stopTimer();
    if (answerResult) {
      this.model.addAnswer(`right`);
      if (this.model.hasNextQuestion()) {
        this.model.nextQuestion();
        this.startGame();
      } else {
        this.endGame(true);
      }
    } else {
      this.model.addAnswer(`wrong`);
      if (!this.model.hasLifes()) {
        this.endGame(false);
      } else {
        if (!this.model.hasNextQuestion()) {
          this.endGame(true);
        } else {
          this.model.reduceLifes();
          this.model.nextQuestion();
          this.startGame();
        }
      }
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
    const question = new QuestionView(this.model.getCurrentQuestion(), this.model._results, this.model.getQuestionsQuantity());
    question.onAnswer = (isRightAnswer) => this.answer(isRightAnswer);
    this.changeContentView(question);
  }

  endGame(isWin) {
    this.updateHeader();
    let gameOver;
    gameOver = isWin ? new WinScreenView(this.model._results, this.model.state.lifes, this.model.getQuestionsQuantity()) : new FailScreenView(this.model._results, this.model.getQuestionsQuantity());
    this.changeContentView(gameOver);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.question.element);
    this.question = view;
  }
}
