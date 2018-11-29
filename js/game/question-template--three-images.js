import {gameQuestions} from '../data/game-data.js';
import gameHeaderTemplate from './header-template.js';
import currentResultsTemplate from './current-results-template.js';
import results from './results.js';

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
      ${currentResultsTemplate(results)}
    </section>`;
};

export default threeImageGameTemplate;
