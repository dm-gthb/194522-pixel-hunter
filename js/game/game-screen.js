const gameTemplate = (currentQuestion) => {
  let questionsContent;
  let gameType = currentQuestion.questionType;

  switch (gameType) {
    case `2-img`:
      questionsContent = `<form class="game__content">
      ${currentQuestion.answers.map((answer, i) =>
    `<div class="game__option">
    <img src="${answer.image}" alt="Option ${i + 1}" width="468" height="458">
    <label class="game__answer game__answer--photo">
      <input class="visually-hidden" name="question${i + 1}" type="radio" value="photo">
      <span>Фото</span>
    </label>
    <label class="game__answer game__answer--paint">
      <input class="visually-hidden" name="question${i + 1}" type="radio" value="paint">
      <span>Рисунок</span>
    </label>
  </div>`).join(``)}
  </form>`;
      break;

    case `1-img`:
      questionsContent = `<form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${currentQuestion.answer.image}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        </form>`;
      break;
    case `3-img`:
      questionsContent = `<form class="game__content  game__content--triple">
    ${currentQuestion.answers.map((answer, i) =>
    `<div class="game__option" data-value="paint"><img src="${answer.image}" alt="Option ${i + 1}" width="304" height="455"></div>`).join(``)}
    </form>`;
      break;
  }

  return `<section class="game">
    <p class="game__task">${currentQuestion.questionText}</p>
    ${questionsContent}
    <ul class="stats">
      <li class="stats__result stats__result--wrong"></li>
      <li class="stats__result stats__result--slow"></li>
      <li class="stats__result stats__result--fast"></li>
      <li class="stats__result stats__result--correct"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </section>`;
};

export default gameTemplate;
