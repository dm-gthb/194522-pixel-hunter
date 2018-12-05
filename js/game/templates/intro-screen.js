import {renderElement} from '../utils.js';
import showScreen from '../show-screen.js';
import greetingScreen from './greeting-screen.js';

const introTemplate = `<section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`;

const introScreen = renderElement(introTemplate);
const nextScreenButtonElement = introScreen.querySelector(`.intro__asterisk`);

nextScreenButtonElement.addEventListener(`click`, () => showScreen(greetingScreen));

export default introScreen;
