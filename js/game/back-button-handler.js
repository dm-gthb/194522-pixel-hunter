import showScreen from './show-screen.js';
import IntroScreenView from './views/intro-screen.js';
import GreetingScreenView from './views/greeting-screen.js';
import RulesScreenView from './views/rules-screen.js';
import startGame from './start-game.js';

const introScreen = new IntroScreenView();
const greetingScreen = new GreetingScreenView();
const rulesScreen = new RulesScreenView();

const backButtonHandler = () => {
  const backButtonElemet = document.querySelector(`.back`);

  if (backButtonElemet) {
    backButtonElemet.addEventListener(`click`, () => {
      showScreen(introScreen.element);
    });

    introScreen.onClick = () => showScreen(greetingScreen.element);
    greetingScreen.onClick = () => showScreen(rulesScreen.element);
    rulesScreen.onInput = (inputElement, nextScreenButtonElement) => {
      nextScreenButtonElement.disabled = inputElement.value.length > 0 ? false : true;
    };

    rulesScreen.onSubmit = (evt) => {
      evt.preventDefault();
      startGame();
    };
  }
};

export default backButtonHandler;
