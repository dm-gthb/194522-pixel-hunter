import {assert} from 'chai';
import reduceLifes from '../reduce-lifes.js';

describe(`Check lifes reducer`, () => {
  it(`min value should be 0`, () => {
    assert.equal(reduceLifes(0), 0);
  });

  it(`should decrease by one`, () => {
    assert.equal(reduceLifes(3), 2);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => reduceLifes({}), /currentLifesQuantity should be a number/);
  });
});
