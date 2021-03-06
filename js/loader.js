const URL = `https://es.dump.academy/pixel-hunter`;
const STATUS_OK = 200;
const STATUS_MULTIPLE_CHOICE = 300;
const DEFAULT_NAME = `DefaultName`;
const APP_ID = 30653981907824;

const checkStatus = (response) => {
  if (response.status >= STATUS_OK && response.status < STATUS_MULTIPLE_CHOICE) {
    return response;
  }

  throw new Error(`${response.status}: ${response.statusText}`);
};

export default class Loader {
  static loadData() {
    return fetch(`${URL}/questions`).
      then(checkStatus).
      then((response) => response.json());
  }

  static loadResults(name = DEFAULT_NAME) {
    return fetch(`${URL}/stats/${APP_ID}-${name}`).
      then(checkStatus).
      then((response) => response.json());
  }

  static saveResults(data, name = DEFAULT_NAME) {
    const exportData = {
      name,
      stats: data.answers,
      lives: data.state.lifes
    };

    const requestSettings = {
      body: JSON.stringify(exportData),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };

    return fetch(`${URL}/stats/${APP_ID}-${name}`, requestSettings).
      then(checkStatus);
  }
}
