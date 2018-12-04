import {INIT_GAME} from '../data/game-data.js';
import {gameQuestions} from '../data/game-data.js';
import GameHeaderView from './game-header-view.js';
import QuestionOneImageView from './question-one-image-view.js';
import QuestionTwoImagesView from './question-two-images-view.js';
import QuestionThreeImagesView from './question-three-images-view.js';
import backButtonHandler from '../back-button-handler.js';
import showScreen from '../show-screen.js';
import {changeQuestion} from './utils.js';
import {stillHaveLifes} from './utils.js';
import {reduceLifes} from './utils.js';
import results from './results.js';
import ResultsChartView from './results-chart-view.js';
import WinScreenView from './win-screen-view.js';
import FailScreenView from './fail-screen-view.js';

const screenContainerElement = document.querySelector(`#main`);

const renderGameScreen = (state) => {
  const questionsQantity = gameQuestions.length;
  let currentQuestionNumber = parseInt(game.question, 10);
  let gameType = gameQuestions[state.question].questionType;
  let questionView;
  const gameHeaderView = new GameHeaderView(state);
  const resultsView = new ResultsChartView(results, questionsQantity);
  const winScreen = new WinScreenView(results, game.lifes, questionsQantity);
  const failScreen = new FailScreenView(results, questionsQantity);

  const continueToNext = () => {
    currentQuestionNumber++;
    if (currentQuestionNumber < questionsQantity) {
      game = changeQuestion(game, currentQuestionNumber);
      renderGameScreen(game);
    } else {
      showScreen(winScreen.element);
    }
  };

  const handleAnswer = (isRight) => {
    if (isRight) {
      results.push(`right`);
      continueToNext();
    } else {
      results.push(`wrong`);
      if (!stillHaveLifes(game)) {
        showScreen(failScreen.element);
        return;
      }
      game = reduceLifes(game);
      continueToNext();
    }
  };

  switch (gameType) {
    case `1-img`:
      questionView = new QuestionOneImageView(gameQuestions[state.question]);
      break;

    case `2-img`:
      questionView = new QuestionTwoImagesView(gameQuestions[state.question]);
      break;

    case `3-img`:
      questionView = new QuestionThreeImagesView(gameQuestions[state.question]);
      break;
  }

  screenContainerElement.innerHTML = ``;
  questionView.handleAnswer = (isRightAnswer) => handleAnswer(isRightAnswer);

  screenContainerElement.appendChild(gameHeaderView.element);
  screenContainerElement.appendChild(questionView.element);
  screenContainerElement.appendChild(resultsView.element);
  backButtonHandler();
};

let game;

const startGameUp1 = () => {
  game = Object.assign({}, INIT_GAME);
  renderGameScreen(game);
};

export default startGameUp1;
