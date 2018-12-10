import assert from 'assert';
import {adaptServerData} from '../data/data-adapter.js';

const serverData = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `https://k36.kn3.net/1619797DF.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      },
      {
        image: {
          url: `https://k42.kn3.net/D660F0768.jpg`,
          width: 468,
          height: 458
        },
        type: `painting`
      }
    ]
  }
];

const localData = [
  {
    type: `two-of-two`,
    question: `Угадайте для каждого изображения фото или рисунок?`,
    answers: [
      {
        image: {
          url: `https://k36.kn3.net/1619797DF.jpg`,
          width: 468,
          height: 458
        },
        type: `paint`
      },
      {
        image: {
          url: `https://k42.kn3.net/D660F0768.jpg`,
          width: 468,
          height: 458
        },
        type: `paint`
      }
    ]
  }
];

describe(`Adapt server data`, () => {
  it(`should have several format remote and local data`, () => {
    assert.deepEqual(adaptServerData(serverData), localData);
  });
});
