import {assert} from 'chai';
import {changeQuestion} from '../game/utils.js';

const state = {
  question: 0,
  lifes: 2,
  time: 0
};

describe(`Check question changer`, () => {
  it(`should update question of the game`, () => {
    assert.equal(changeQuestion(state, 1).question, 1);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeQuestion(state, -1).question, /Question should not be negative value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeQuestion(state, []).question, /Question should be of type number/);
  });
});
