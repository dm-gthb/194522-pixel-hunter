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

export default changeLevel;
