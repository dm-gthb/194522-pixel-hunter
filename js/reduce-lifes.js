const reduceLifes = (currentLifesQuantity) => {

  if (typeof currentLifesQuantity !== `number`) {
    throw new Error(`currentLifesQuantity should be a number`);
  }

  return currentLifesQuantity <= 0 ? currentLifesQuantity : currentLifesQuantity - 1;
};

export default reduceLifes;
