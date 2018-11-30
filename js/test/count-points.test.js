import {assert} from 'chai';
import countPoints from '../count-points.js';

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
