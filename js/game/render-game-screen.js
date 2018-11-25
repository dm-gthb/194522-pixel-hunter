import renderElement from '../render-element.js';
import {allGameQuestions} from '../data/game-data.js';
import gameTemplate from './game-screen.js';
import gameHeaderTemplate from './game-header-template.js';
import backButtonHandler from '../back-button-handler.js';

const screenContainerElement = document.querySelector(`#main`);

const renderGameScreen = (state) => {
  const currentQuestionNumber = parseInt(state.question, 10);
  const currentStateQuestion = allGameQuestions[state.question];
  const currentGameTemplate = gameTemplate(currentStateQuestion);
  const gameElement = renderElement(currentGameTemplate);

  const currentHeaderTemplate = gameHeaderTemplate(state);
  const headerElement = renderElement(currentHeaderTemplate);

  screenContainerElement.innerHTML = ``;
  screenContainerElement.appendChild(headerElement);
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
