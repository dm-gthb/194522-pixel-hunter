import {assert} from 'chai';
import timer from '../timer.js';

describe(`Check timer`, () => {
  it(`min value should be 0`, () => {
    assert.equal(timer(0), `time's up!`);
  });

  it(`should decrease by one`, () => {
    assert.equal(timer(3), 2);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => timer({}), /currentSeconds should be a number/);
  });
});
