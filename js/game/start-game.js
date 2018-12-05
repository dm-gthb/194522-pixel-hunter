import {INIT_GAME} from '../data/game-data.js';
import {gameQuestions} from '../data/game-data.js';
import backButtonHandler from './back-button-handler.js';
import showScreen from './show-screen.js';
import {renderElement} from './utils.js';
import {changeQuestion} from './utils.js';
import {stillHaveLifes} from './utils.js';
import {reduceLifes} from './utils.js';
import results from './results.js';
import gameHeaderTemplate from './templates/game-header.js';
import resultsChartTemplate from './templates/results-chart.js';
import QuestionOneImageView from './views/question-one-image.js';
import QuestionTwoImagesView from './views/question-two-images.js';
import QuestionThreeImagesView from './views/question-three-images.js';
import WinScreenView from './views/win-screen.js';
import FailScreenView from './views/fail-screen.js';

const screenContainerElement = document.querySelector(`#main`);

const renderGameScreen = (state) => {
  const questionsQantity = gameQuestions.length;
  let currentQuestionNumber = parseInt(game.question, 10);
  let gameType = gameQuestions[state.question].questionType;
  let questionView;
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

  screenContainerElement.appendChild(renderElement(gameHeaderTemplate(state)));
  screenContainerElement.appendChild(questionView.element);
  screenContainerElement.appendChild(renderElement(resultsChartTemplate(results, questionsQantity)));
  backButtonHandler();
};

let game;

const startGame = () => {
  game = Object.assign({}, INIT_GAME);
  renderGameScreen(game);
};

export default startGame;
