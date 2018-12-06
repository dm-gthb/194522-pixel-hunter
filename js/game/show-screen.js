import backButtonHandler from './back-button-handler.js';

const screenContainerElement = document.querySelector(`#main`);

const showScreen = (screenContent) => {
  const formElement = screenContent.querySelector(`form`);
  screenContainerElement.innerHTML = ``;
  if (formElement) {
    formElement.reset();
  }
  screenContainerElement.appendChild(screenContent);
  backButtonHandler();
};

export default showScreen;
