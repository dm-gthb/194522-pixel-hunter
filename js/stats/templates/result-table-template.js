import resultsChartTemplate from '../../results-chart-template.js';
import {countPoints} from '../../game/utils.js';

const ERRORS_TO_FAIL = 4;

const resultTableTemplate = (answers, lifes, questionsQuantity, index=`1`) => {
  const rightAnswers = answers.filter((answer) => answer !== `wrong`);
  const isWin = rightAnswers.length > (questionsQuantity - ERRORS_TO_FAIL) ? true : false;
  const resultsChart = resultsChartTemplate(answers, questionsQuantity);

  return `<section class="result">
    ${isWin ? `<h2 class="result__title">Победа!</h2>` : ``}
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${resultsChart}
        </td>
        <td class="result__points">${isWin ? `× 100` : ``}</td>
        <td class="result__total">${isWin ? countPoints(answers, lifes).pointsByRightAnswers : `fail`}</td>
      </tr>

      ${lifes > 0 ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lifes} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${countPoints(answers, lifes).pointsByLifes}</td>
      </tr>` : ``}

      ${isWin && answers.indexOf(`fast`) >= 0 ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${answers.filter((answer) => answer === `fast`).length} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${countPoints(answers, lifes).pointsByFastAnswers}</td>
      </tr>` : ``}

      ${isWin && answers.indexOf(`slow`) >= 0 ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${answers.filter((answer) => answer === `slow`).length} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${countPoints(answers, lifes).fineBySlowAnswers}</td>
      </tr>` : ``}

      ${isWin ? `<tr>
        <td colspan="5" class="result__total  result__total--final">${countPoints(answers, lifes).total}</td>
      </tr>` : ``}
    </table>
  </section>`;
}

export default resultTableTemplate;
