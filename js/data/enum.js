export const INIT_GAME = Object.freeze({
  question: 0,
  lifes: 3,
  time: 30
});

export const QuestionType = {
  TINDER_LIKE: `tinder-like`,
  TWO_OF_TWO: `two-of-two`,
  ONE_OF_THREE: `one-of-three`
};

export const AnswerOption = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

export const ResultType = {
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`
};
