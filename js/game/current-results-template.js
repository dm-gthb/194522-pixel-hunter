const currentResultsTemplate = (results) => {
  return `<ul class="stats">
    ${results.map((result) => {
    if (result > 0) {
      return `<li class="stats__result stats__result--correct"></li>`;
    } else {
      return `<li class="stats__result stats__result--wrong"></li>`;
    }
  }).join(``)}
    ${new Array(10 - results.length)
      .fill(`<li class="stats__result stats__result--unknown"></li>`)
      .join(``)}
  </ul>`;
};

export default currentResultsTemplate;
