export const initState = {
  question: 0,
  lifes: 3,
  time: 0
};

export const gameQuestions = [
  {
    questionType: `1-img`,
    questionText: `Угадай, фото или рисунок?`,
    answer: {
      image: `http://placehold.it/705x455`,
      value: `photo`
    }
  },
  {
    questionType: `2-img`,
    questionText: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: `http://placehold.it/468x458`,
        value: `photo`
      },
      {
        image: `http://placehold.it/468x458`,
        value: `photo`
      }
    ]
  },
  {
    questionType: `3-img`,
    questionText: `Найдите рисунок среди изображений`,
    answers: [
      {
        image: `http://placehold.it/304x455`,
        value: `photo`
      },
      {
        image: `http://placehold.it/304x455`,
        value: `paint`
      },
      {
        image: `http://placehold.it/304x455`,
        value: `photo`
      }
    ]
  }
];
