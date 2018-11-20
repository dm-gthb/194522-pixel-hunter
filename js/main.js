'use strict';

const RIGHT_ARROW_KEY = 39;
const LEFT_ARROW_KEY = 37;
const screensTemplatesArray = Array.from(document.querySelectorAll(`template`));
const screensQuantity = screensTemplatesArray.length;
const screenContainerElement = document.querySelector(`#main`);
const arrowsMarkup = `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
</div>`;
let currentScreen = 1;

const showScreen = (index) => {
  screenContainerElement.innerHTML = ``;
  let screenContent = screensTemplatesArray[index - 1].content.cloneNode(true);
  screenContainerElement.appendChild(screenContent);
};

const insertArrowsHandlers = () => {
  document.body.insertAdjacentHTML(`beforeEnd`, arrowsMarkup);
  const arrowsButtonsElements = document.querySelectorAll(`.arrows__btn`);

  arrowsButtonsElements.forEach((arrowButton) => {
    arrowButton.addEventListener(`click`, () => {
      if (arrowButton.textContent === `->`) {
        currentScreen = currentScreen < screensQuantity ? currentScreen + 1 : 1;
      } else {
        currentScreen = currentScreen > 1 ? currentScreen - 1 : screensQuantity;
      }

      showScreen(currentScreen);
    });
  });
};


showScreen(currentScreen);
insertArrowsHandlers();

document.addEventListener(`keydown`, (evt) => {
  let selectedKey = evt.keyCode;

  switch (selectedKey) {
    case RIGHT_ARROW_KEY:
      currentScreen = currentScreen < screensQuantity ? currentScreen + 1 : 1;
      break;
    case LEFT_ARROW_KEY:
      currentScreen = currentScreen > 1 ? currentScreen - 1 : screensQuantity;
      break;
  }

  showScreen(currentScreen);
});
