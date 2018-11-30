import {assert} from 'chai';
import {reduceLifes} from '../game/utils.js';

const state = {
  question: 0,
  lifes: 2,
  time: 0
};

describe(`Check lifes reducer`, () => {
  it(`should decrease by one`, () => {
    assert.equal(reduceLifes(state).lifes, 1);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => reduceLifes({}), /lifes should be a number/);
  });
});
