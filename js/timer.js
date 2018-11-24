const timer = (currentSeconds) => {
  if (typeof currentSeconds !== `number`) {
    throw new Error(`currentSeconds should be a number`);
  }

  return currentSeconds > 0 ? currentSeconds - 1 : `time's up!`;
}

export default timer;
