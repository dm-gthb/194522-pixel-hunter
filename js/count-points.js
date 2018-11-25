const RIGHT_ANSWER_POINTS = 100;
const REST_LIFE_POINTS = 50;

const countPoints = (rightAnswersArray, lifes) => {
  const pointsByLifes = lifes * REST_LIFE_POINTS;
  const pointsByRightAnswers = rightAnswersArray.length * RIGHT_ANSWER_POINTS;

  if (!Array.isArray(rightAnswersArray)) {
    throw new Error(`rightAnswersArray parameter should be an array`);
  }

  if (typeof lifes !== `number`) {
    throw new Error(`lifes parameter should be a number`);
  }

  if (lifes < 0) {
    throw new Error(`lifes should not be negative value`);
  }

  return rightAnswersArray.length < 10 ? -1 : pointsByRightAnswers + pointsByLifes;
};

export default countPoints;
