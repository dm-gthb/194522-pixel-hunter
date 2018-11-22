import {assert} from 'chai';

const countPoints = (rightAnswersArray, lifes) => {
  const RIGHT_ANSWER_POINTS = 100;
  const REST_LIFE_POINTS = 50;
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

describe(`Check counting points`, () => {
  it(`should be answered at least on 10 questions`, () => {
    assert.equal(countPoints([`1`, `2`], 2), -1);
  });

  it(`should return 1150 points if all answers are right and there are 3 rest lifes`, () => {
    assert.equal(countPoints([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3), 1150);
  });

  it(`should not allow set non array value for answers parameter`, () => {
    assert.throws(() => countPoints(1, 3), /rightAnswersArray parameter should be an array/);
  });

  it(`should not allow set non number value for lifes parameter`, () => {
    assert.throws(() => countPoints([1, 2], [1, 2]), /lifes parameter should be a number/);
  });

  it(`should not allow set negative value for lifes parameter`, () => {
    assert.throws(() => countPoints([1, 2], -1), /lifes should not be negative value/);
  });
});
