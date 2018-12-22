const RIGHT_ANSWER_POINTS = 100;
const REST_LIFE_POINTS = 50;
const ONE_OUESTION_TIME = 30;
const FAST_ANSWER_POINTS = 50;
const SLOW_ANSWER_FINE = 50;

export const stillHaveLifes = (state) => state.lifes - 1 > 0;

export const reduceLifes = (state) => {
  if (typeof state.lifes !== `number`) {
    throw new Error(`lifes should be a number`);
  }

  const lifes = state.lifes - 1;
  const newState = Object.assign({}, state, {lifes});
  return newState;
};

export const changeQuestion = (state, question) => {
  if (question < 0) {
    throw new Error(`Question should not be negative value`);
  }

  if (typeof question !== `number`) {
    throw new Error(`Question should be of type number`);
  }

  const newState = Object.assign({}, state, {question});
  return newState;
};

export const renderElement = (template = ``, tagName = `div`) => {
  const wrapper = document.createElement(tagName);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

export const tick = (state) => {
  let time = 0;

  if (state.time >= 0) {
    time = state.time - 1;
  }

  const newState = Object.assign({}, state, {time});
  return newState;
};

export const restartTimer = (state) => {
  const newState = Object.assign({}, state, {
    time: ONE_OUESTION_TIME
  });
  return newState;
};

export const resize = (container, image) => {
  const initImgRatio = image.width / image.height;
  const calculatedHeight = container.width / initImgRatio;
  const calculatedWidth = container.height * initImgRatio;
  const imageIsWider = image.width > container.width;
  const imageVsContainerWidth = image.width - container.width;
  const imageVsContainerHeight = image.height - container.height;
  const imageIsHigher = image.height > container.height;
  const containerIsHigher = container.height > image.height;

  if (imageIsWider && (imageVsContainerWidth) > (imageVsContainerHeight)) {
    image.width = container.width;
    image.height = calculatedHeight;
  } else if (imageIsWider && (imageVsContainerWidth) < (imageVsContainerHeight)) {
    image.height = container.height;
    image.width = calculatedWidth;
  } else if (imageIsHigher) {
    image.height = container.height;
    image.width = calculatedWidth;
  } else if (containerIsHigher) {
    image.width = container.width;
    image.height = calculatedHeight;
  }

  return image;
};

export const countPoints = (answers, lifes) => {
  const restLifes = lifes * REST_LIFE_POINTS;
  const points = answers.reduce((accumulator, answer) => {
    if (answer === `wrong`) {
      return accumulator;
    }

    if (answer === `fast`) {
      accumulator.fastAnswers += FAST_ANSWER_POINTS;
    }

    if (answer === `slow`) {
      accumulator.slowAnswers += SLOW_ANSWER_FINE;
    }

    accumulator.rightAnswers += RIGHT_ANSWER_POINTS;
    return accumulator;

  }, {
    rightAnswers: 0,
    fastAnswers: 0,
    slowAnswers: 0,
    restLifes
  });

  points.total = points.restLifes + points.rightAnswers + points.fastAnswers - points.slowAnswers;
  return points;
};

export const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};
