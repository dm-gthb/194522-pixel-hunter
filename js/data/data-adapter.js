const PAINTING_ANSWER_TYPE = `paint`;

const preprocessAnswers = (answers) => answers.map((answer) => {
  if (answer.type === `painting`) {
    answer.type = PAINTING_ANSWER_TYPE;
  }

  return answer;
});

export const adaptServerData = (data) => {
  for (const question of data) {
    question.answers = preprocessAnswers(question.answers);
  }

  return data;
};
