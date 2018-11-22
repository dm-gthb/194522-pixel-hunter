import {assert} from 'chai';

const INITIAL_GAME = {
  level: 0,
  lifes: 2,
  time: 0
};

const changeLevel = (game, level) => {
  if (level < 0) {
    throw new Error(`Level should not be negative value`);
  }

  if (typeof level !== `number`) {
    throw new Error(`Level should be of type number`);
  }

  const newGame = Object.assign({}, game, {level});
  return newGame;
};

describe(`Check level changer`, () => {
  it(`should update level of the game`, () => {
    assert.equal(changeLevel(INITIAL_GAME, 1).level, 1);
    assert.equal(changeLevel(INITIAL_GAME, 2).level, 2);
    assert.equal(changeLevel(INITIAL_GAME, 10).level, 10);
    assert.equal(changeLevel(INITIAL_GAME, 102).level, 102);
  });

  it(`should not allow set negative values`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, -1).level, /Level should not be negative value/);
  });

  it(`should not allow set non number value`, () => {
    assert.throws(() => changeLevel(INITIAL_GAME, []).level, /Level should be of type number/);
  });
});
