const resultsChartTemplate = (answers, questionsQuantity) => {
  return `<ul class="stats">
    ${answers.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
    ${new Array(questionsQuantity - answers.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>`;
};

export default resultsChartTemplate;
