import introScreen from './templates/intro-screen.js';
import showScreen from './show-screen.js';

const backButtonHandler = () => {
  const backButtonElemet = document.querySelector(`.back`);

  if (backButtonElemet) {
    backButtonElemet.addEventListener(`click`, () => {
      showScreen(introScreen);
    });
  }
};

export default backButtonHandler;
