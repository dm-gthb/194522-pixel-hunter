import resultsChartTemplate from '../../results-chart-template.js';
import {countPoints} from '../../game/utils.js';

const ERRORS_TO_FAIL = 4;

const resultTableTemplate = (answers, lifes, questionsQuantity, index = `1`) => {
  const rightAnswers = answers.filter((answer) => answer !== `wrong`);
  const isWin = rightAnswers.length > (questionsQuantity - ERRORS_TO_FAIL);
  const resultsChart = resultsChartTemplate(answers, questionsQuantity);
  const points = countPoints(answers, lifes);

  return `<section class="result">
    ${isWin ? `<h2 class="result__title">Победа!</h2>` : ``}
    <table class="result__table">
      <tr>
        <td class="result__number">${index}.</td>
        <td colspan="2">
          ${resultsChart}
        </td>
        <td class="result__points">${isWin ? `× 100` : ``}</td>
        <td class="result__total">${isWin ? points.rightAnswers : `fail`}</td>
      </tr>

      ${lifes > 0 ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${lifes} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${points.restLifes}</td>
      </tr>` : ``}

      ${isWin && answers.indexOf(`fast`) >= 0 ? `<tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${answers.filter((answer) => answer === `fast`).length} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${points.fastAnswers}</td>
      </tr>` : ``}

      ${isWin && answers.indexOf(`slow`) >= 0 ? `<tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${answers.filter((answer) => answer === `slow`).length} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${points.slowAnswers}</td>
      </tr>` : ``}

      ${isWin ? `<tr>
        <td colspan="5" class="result__total  result__total--final">${points.total}</td>
      </tr>` : ``}
    </table>
  </section>`;
};

export default resultTableTemplate;
