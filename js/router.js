import IntroScreen from './welcome/intro-screen.js';
import GreetingScreen from './welcome/greeting-screen.js';
import RulesScreen from './welcome/rules-screen.js';
import GameScreen from './game/game-screen.js';
import GameModel from './data/game-model.js';
import StatsScreen from './stats/stats-screen.js';

const main = document.querySelector(`#main`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

export default class Router {

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
    const gamePresenter = new GameScreen(new GameModel(playerName));
    changeView(gamePresenter.element);
    gamePresenter.startGame();
  }

  static showStats(isWin, model) {
    const statistics = new StatsScreen(isWin, model);
    changeView(statistics.element);
  }
}
