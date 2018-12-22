import IntroScreen from './welcome/intro-screen.js';
import GreetingScreen from './welcome/greeting-screen.js';
import RulesScreen from './welcome/rules-screen.js';
import GameScreen from './game/game-screen.js';
import GameModel from './data/game-model.js';
import StatsScreen from './stats/stats-screen.js';
import ErrorScreen from './error/error-screen.js';
import Loader from './loader.js';
import {loadImage} from './game/utils.js';

const ONE_SECOND = 1000;
const main = document.querySelector(`#main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

let gameData;

export default class Router {
  static start() {
    Router.load();
  }

  static async load() {
    const intro = new IntroScreen();
    changeView(intro.element);
    intro.startLoadingAnimation();
    try {
      gameData = await Loader.loadData();
      const answersData = gameData.reduce((accumulator, {answers}) => {
        return [...accumulator, ...answers];
      }, []);
      const imagesData = answersData.map(({image}) => loadImage(image.url));
      await Promise.all(imagesData);
      intro.changeBackground();
      setTimeout(() => {
        Router.showGreeting();
      }, ONE_SECOND);
    } catch (error) {
      Router.showErrorPopup(error);
    } finally {
      intro.stopLoadingAnimation();
    }
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

  static async showStats(model) {
    const statistics = new StatsScreen(model);
    changeView(statistics.element);

    try {
      await Loader.saveResults(model);
      const previousResults = await Loader.loadResults();
      statistics.showResultsHistory(previousResults);
    } catch (error) {
      statistics.showResultsLoadingError(error);
    }
  }

  static showErrorPopup(errorMessage) {
    const error = new ErrorScreen(errorMessage);
    changeView(error.element);
  }
}
