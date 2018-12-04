import showScreen from './show-screen.js';
import IntroScreenView from './game/intro-screen-view.js';
import GreetingScreenView from './game/greeting-screen-view.js';
import RulesScreenView from './game/rules-screen-view.js';
import startGame from './game/start-game.js';

const introScreen = new IntroScreenView();
const greetingScreen = new GreetingScreenView();
const rulesScreen = new RulesScreenView();

introScreen.onClick = () => {
  showScreen(greetingScreen.element);
};

greetingScreen.onClick = () => {
  showScreen(rulesScreen.element);
};

rulesScreen.onInput = (inputElement, nextScreenButtonElement) => {
  nextScreenButtonElement.disabled = inputElement.value.length > 0 ? false : true;
};

rulesScreen.onSubmit = (evt) => {
  evt.preventDefault();
  startGame();
};

showScreen(introScreen.element);
