import HeaderView from './views/header.js';
import QuestionView from './views/question.js';
import Router from '../router.js';

const ONE_SECOND = 1000;

export default class GameScreen {
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
    this.header.onBackButtonClick = () => Router.showGreeting();
    this._timer = setInterval(() => {
      this.model.tick();
      this.updateTimeDisplay(this.model.state.time);
    }, ONE_SECOND);
  }

  stopTimer() {
    clearInterval(this._timer);
  }

  answer(answerResult) {
    this.stopTimer();

    if (answerResult) {
      this.model.addAnswer(`right`);
    } else {
      this.model.addAnswer(`wrong`);
      if (!this.model.hasLifes()) {
        return this.endGame(false);
      }
      this.model.reduceLifes();
    }
    if (this.model.hasNextQuestion()) {
      this.model.nextQuestion();
      return this.startGame();
    } else {
      return this.endGame(true);
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
    Router.showStats(isWin, this.model);
  }

  changeContentView(view) {
    this.root.replaceChild(view.element, this.question.element);
    this.question = view;
  }
}
