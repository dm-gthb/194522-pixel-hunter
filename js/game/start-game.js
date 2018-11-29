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

  let checkIsAnswerRight;
  let isRight;

  const renderGameScreen = (state) => {
    let gameType = gameQuestions[state.question].questionType;
    let currentGameTemplate;

    const continueToNext = () => {
      currentQuestionNumber++;
      if (currentQuestionNumber < questionsQantity) {
        game = changeQuestion(game, currentQuestionNumber);
        renderGameScreen(game);
      } else {
        showScreen(renderElement(winScreenTemplate(results, game.lifes)));
      }
    };

    const handleAnswer = () => {
      if (isRight) {
        results.push(`right`);
        continueToNext();
      } else {
        results.push(`wrong`);
        if (!stillHaveLifes(game)) {
          showScreen(renderElement(failScreenTemplate(results)));
          return;
        }
        game = reduceLifes(game);
        continueToNext();
      }
    };

    switch (gameType) {
      case `1-img`:
        currentGameTemplate = oneImageGameTemplate(state);
        checkIsAnswerRight = () => {
          const formElement = document.querySelector(`.game__content`);
          const options = Array.from(formElement.querySelectorAll(`input`));

          options.forEach((option) => {
            option.addEventListener(`change`, () => {
              const selectedOption = option.value;
              const rightAnswer = gameQuestions[state.question].answer.value;
              isRight = selectedOption === rightAnswer ? true : false;
              handleAnswer();
            });
          });
        };
        break;

      case `2-img`:
        currentGameTemplate = twoImageGameTemplate(state);
        checkIsAnswerRight = () => {
          const formElement = document.querySelector(`.game__content`);
          const questionsWrappers = Array.from(formElement.querySelectorAll(`.game__option`));
          const imagesToAnswer = questionsWrappers.length;
          let answersRightParts = 0;

          questionsWrappers.forEach((wrapper, i) => {
            const options = wrapper.querySelectorAll(`input[name="question${i + 1}"]`);
            options.forEach((option) => {
              option.addEventListener(`change`, () => {
                if (option.value === gameQuestions[state.question].answers[i].value) {
                  answersRightParts++;
                } else {
                  answersRightParts--;
                }
                isRight = answersRightParts === imagesToAnswer ? true : false;
              });
            });
          });

          const formElementChangeHandler = () => {
            const allOptions = Array.from(formElement.querySelectorAll(`input[type="radio"]`));
            const answers = allOptions.filter((input) => input.checked);
            if (answers.length === imagesToAnswer) {
              handleAnswer();
            }
          };

          formElement.addEventListener(`change`, formElementChangeHandler);
        };
        break;

      case `3-img`:
        currentGameTemplate = threeImageGameTemplate(state);
        checkIsAnswerRight = () => {
          const options = Array.from(document.querySelectorAll(`.game__option img`));
          options.forEach((option, i) => {
            option.addEventListener(`click`, () => {
              if (gameQuestions[state.question].answers[i].value === gameQuestions[state.question].soughtFor) {
                isRight = true;
              } else {
                isRight = false;
              }
              handleAnswer();
            });
          });
        };
        break;
    }

    const gameElement = renderElement(currentGameTemplate);
    screenContainerElement.innerHTML = ``;
    screenContainerElement.appendChild(gameElement);
    backButtonHandler();
    checkIsAnswerRight();
  };

  renderGameScreen(game);
};

export default startGame;
