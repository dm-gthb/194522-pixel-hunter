export const stillHaveLifes = (gameState) => gameState.lifes - 1 > 0;

export const reduceLifes = (gameState) => {
  if (typeof gameState.lifes !== `number`) {
    throw new Error(`lifes should be a number`);
  }

  const lifes = gameState.lifes - 1;
  const newGame = Object.assign({}, gameState, {lifes});
  return newGame;
};

export const changeQuestion = (game, question) => {
  if (question < 0) {
    throw new Error(`Question should not be negative value`);
  }

  if (typeof question !== `number`) {
    throw new Error(`Question should be of type number`);
  }

  const newGame = Object.assign({}, game, {question});
  return newGame;
};
