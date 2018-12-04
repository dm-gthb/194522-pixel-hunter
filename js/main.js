import showScreen from './game/show-screen.js';
import IntroScreenView from './game/views/intro-screen.js';
import GreetingScreenView from './game/views/greeting-screen.js';
import RulesScreenView from './game/views/rules-screen.js';
import startGame from './game/start-game.js';

const introScreen = new IntroScreenView();
const greetingScreen = new GreetingScreenView();
const rulesScreen = new RulesScreenView();

introScreen.onClick = () => showScreen(greetingScreen.element);
greetingScreen.onClick = () => showScreen(rulesScreen.element);
rulesScreen.onInput = (inputElement, nextScreenButtonElement) => {
  nextScreenButtonElement.disabled = inputElement.value.length > 0 ? false : true;
};

rulesScreen.onSubmit = (evt) => {
  evt.preventDefault();
  startGame();
};

showScreen(introScreen.element);
