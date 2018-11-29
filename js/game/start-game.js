import {INIT_GAME} from '../data/game-data.js';
import {gameQuestions} from '../data/game-data.js';
import renderElement from '../render-element.js';
import oneImageGameTemplate from './question-template--one-image.js';
import twoImageGameTemplate from './question-template--two-images.js';
import threeImageGameTemplate from './question-template--three-images.js';
import backButtonHandler from '../back-button-handler.js';
import showScreen from '../show-screen.js';
import failScreenTemplate from './fail-screen-template.js';
import winScreenTemplate from './win-screen-template.js';
import {changeQuestion} from './utils.js';
import {stillHaveLifes} from './utils.js';
import {reduceLifes} from './utils.js';
import results from './results.js';

const screenContainerElement = document.querySelector(`#main`);
let game;

const startGame = () => {
  game = Object.assign({}, INIT_GAME);
  const questionsQantity = gameQuestions.length;
  let currentQuestionNumber = parseInt(game.question, 10);

  const renderGameScreen = (state) => {
    let gameType = gameQuestions[state.question].questionType;
    let currentGameTemplate;

    switch (gameType) {
      case `1-img`:
        currentGameTemplate = oneImageGameTemplate(state);
        break;
      case `2-img`:
        currentGameTemplate = twoImageGameTemplate(state);
        break;
      case `3-img`:
        currentGameTemplate = threeImageGameTemplate(state);
        break;
    }

    const handleNextQuestion = () => {
      currentQuestionNumber++;
      if (currentQuestionNumber < questionsQantity) {
        game = changeQuestion(game, currentQuestionNumber);
        renderGameScreen(game);
      } else {
        showScreen(renderElement(winScreenTemplate(results, game.lifes)));
      }
    };

    const gameElement = renderElement(currentGameTemplate);
    screenContainerElement.innerHTML = ``;
    screenContainerElement.appendChild(gameElement);
    backButtonHandler();

    const formElement = document.querySelector(`.game__content`);

    const isRight = () => {
      return Math.random() > 0.5 ? true : false;
    };

    formElement.addEventListener(`click`, () => {
      if (isRight()) {
        results.push(100);
        handleNextQuestion();
      } else {
        results.push(0);
        if (!stillHaveLifes(game)) {
          showScreen(renderElement(failScreenTemplate(results)));
          return;
        }
        game = reduceLifes(game);
        handleNextQuestion();
      }
    });
  };

  renderGameScreen(game);
};

export default startGame;
