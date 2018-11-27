import {gameQuestions} from '../data/game-data.js';
import renderElement from '../render-element.js';
import oneImageGameTemplate from './game-question-template--one-image.js';
import twoImageGameTemplate from './game-question-template--two-images.js';
import threeImageGameTemplate from './game-question-template--three-images.js';
import backButtonHandler from '../back-button-handler.js';

const screenContainerElement = document.querySelector(`#main`);

const renderGameScreen = (state) => {
  let gameType = gameQuestions[state.question].questionType;
  const currentQuestionNumber = parseInt(state.question, 10);
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

  const gameElement = renderElement(currentGameTemplate);
  screenContainerElement.innerHTML = ``;
  screenContainerElement.appendChild(gameElement);

  const formElement = document.querySelector(`.game__content`);

  formElement.addEventListener(`click`, () => {
    renderGameScreen(Object.assign({}, state, {
      question: currentQuestionNumber + 1
    }));
  });

  backButtonHandler();
};

export default renderGameScreen;
