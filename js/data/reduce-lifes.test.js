import {assert} from 'chai';

const reduceLifes = (currentQuantity) => {

  if (typeof currentQuantity !== `number`) {
    throw new Error(`currentQuantity should be a number`);
  }

  return currentQuantity <= 0 ? currentQuantity : currentQuantity - 1;
};

describe(`Check lifes reducer`, () => {
  it(`min value should be 0`, () => {
    assert.equal(reduceLifes(0), 0);
  });

  it(`should decrease by one`, () => {
    assert.equal(reduceLifes(3), 2);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => reduceLifes({}), /currentQuantity should be a number/);
  });
});
