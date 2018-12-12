const URL = `https://es.dump.academy/pixel-hunter/questions`;
const STATUS_OK = 200;
const STATUS_MULTIPLE_CHOICE = 300;

const checkStatus = (response) => {
  if (response.status >= STATUS_OK && response.status < STATUS_MULTIPLE_CHOICE) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Loader {
  static loadData() {
    return fetch(URL).
      then(checkStatus).
      then((response) => response.json());
  }
}
