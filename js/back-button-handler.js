import IntroScreenView from './game/intro-screen-view.js';
import showScreen from './show-screen.js';

const introScreen = new IntroScreenView();

const backButtonHandler = () => {
  const backButtonElemet = document.querySelector(`.back`);

  if (backButtonElemet) {
    backButtonElemet.addEventListener(`click`, () => {
      showScreen(introScreen.element);
    });
  }
};

export default backButtonHandler;
