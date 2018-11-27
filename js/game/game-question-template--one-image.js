import {gameQuestions} from '../data/game-data.js';
import gameHeaderTemplate from './game-header-template.js';

const oneImageGameTemplate = (state) => {
  const question = gameQuestions[state.question];

  const questionContent = `<form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${question.answer.image}" alt="Option 1" width="705" height="455">
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

  return `${gameHeaderTemplate(state)}
    <section class="game">
      <p class="game__task">${question.questionText}</p>
      ${questionContent}
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

export default oneImageGameTemplate;
