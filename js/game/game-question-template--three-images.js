import {gameQuestions} from '../data/game-data.js';
import gameHeaderTemplate from './game-header-template.js';

const threeImageGameTemplate = (state) => {
  const question = gameQuestions[state.question];

  const questionContent = `<form class="game__content  game__content--triple">
    ${question.answers.map((answer, i) =>
    `<div class="game__option" data-value="paint"><img src="${answer.image}" alt="Option ${i + 1}" width="304" height="455"></div>`).join(``)}
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

export default threeImageGameTemplate;
