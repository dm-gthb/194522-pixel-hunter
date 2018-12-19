import IntroScreen from './welcome/intro-screen.js';
import GreetingScreen from './welcome/greeting-screen.js';
import RulesScreen from './welcome/rules-screen.js';
import GameScreen from './game/game-screen.js';
import GameModel from './data/game-model.js';
import StatsScreen from './stats/stats-screen.js';
import ErrorScreen from './error/error-screen.js';
import Loader from './loader.js';
import SplashScreen from './splash/splash-screen.js';
import {loadImage} from './game/utils.js';

const main = document.querySelector(`#main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

let gameData;

export default class Router {
  static start() {
    const splash = new SplashScreen();
    changeView(splash.element);
    splash.start();
    Loader.loadData()
      .then((data) => {
        gameData = data;
        return data;
      })
      .then((data) => {
        return data.reduce((accumulator, {answers}) => {
          return [...accumulator, ...answers];
        }, []);
      })
      .then((answers) => answers.map(({image}) => loadImage(image.url)))
      .then((imagesPromises) => Promise.all(imagesPromises))
      .then(() => Router.showIntro())
      .catch(Router.showErrorPopup)
      .then(() => splash.stop());
  }

  static showIntro() {
    const intro = new IntroScreen();
    changeView(intro.element);
  }

  static showGreeting() {
    const greeting = new GreetingScreen();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesScreen();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(gameData, playerName));
    changeView(gameScreen.element);
    gameScreen.startGame();
  }

  static showStats(model) {
    const statistics = new StatsScreen(model);
    changeView(statistics.element);

    Loader.saveResults(model)
      .then(() => Loader.loadResults())
      .then((data) => statistics.showResultsHistory(data))
      .catch((error) => statistics.showResultsLoadingError(error));
  }

  static showErrorPopup(errorMessage) {
    const error = new ErrorScreen(errorMessage);
    changeView(error.element);
  }
}
