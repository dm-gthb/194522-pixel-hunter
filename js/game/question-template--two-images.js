import {gameQuestions} from '../data/game-data.js';
import gameHeaderTemplate from './header-template.js';
import currentResultsTemplate from './current-results-template.js';
import results from './results.js';

const twoImageGameTemplate = (state) => {
  const question = gameQuestions[state.question];

  const questionContent = `<form class="game__content">
      ${question.answers.map((answer, i) =>
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

  return `${gameHeaderTemplate(state)}
    <section class="game">
      <p class="game__task">${question.questionText}</p>
      ${questionContent}
      ${currentResultsTemplate(results)}
    </section>`;
};

export default twoImageGameTemplate;
