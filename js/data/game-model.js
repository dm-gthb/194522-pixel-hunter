import {INIT_GAME} from './game-data.js';
import {changeQuestion} from '../game/utils.js';
import {tick} from '../game/utils.js';
import {reduceLifes} from '../game/utils.js';
import {restartTimer} from '../game/utils.js';

const getQuestionNumber = (state) => parseInt(state.question, 10);

export default class GameModel {
  constructor(data, playerName) {
    this.data = data;
    this.playerName = playerName;
    this.restart();
    this._results = [];
  }

  get state() {
    return this._state;
  }

  get results() {
    return this._results;
  }

  hasNextQuestion() {
    return getQuestionNumber(this._state) + 1 < this.data.length;
  }

  hasLifes() {
    return this._state.lifes > 0;
  }

  getQuestionsQuantity() {
    return this.data.length;
  }

  getCurrentQuestion() {
    return this.data[this._state.question];
  }

  restartTimer() {
    this._state = restartTimer(this._state);
  }

  reduceLifes() {
    this._state = reduceLifes(this._state);
  }

  restart() {
    this._state = INIT_GAME;
  }

  nextQuestion() {
    this._state = changeQuestion(this._state, this._state.question + 1);
  }

  addAnswer(result) {
    this._results.push(result);
  }

  tick() {
    this._state = tick(this._state);
  }
}
